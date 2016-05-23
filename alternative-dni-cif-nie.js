//Altenativo DNI-CIF-NIE
//Mediante un Select, se elige la opciòn DNI-CIF-NIE
//Accedemos al valor y luego se ejecutan los métodos

	$.validator.addMethod("valIdent", function(value, element){
    var  tipo_documento = $("#docid").val();
    var validate;
    switch (tipo_documento){
      case 'DNI':
       validate = validaNIF(value);
       if(validate == true){
        return true;
       }
       else{
        return false;
       }
      break;
      case 'NIE':
        validate = validaNIE(value);
       if(validate == true){
        return true;
       }
       else{
        return false;
       }  
      break;
      case 'CIF':
        validate = validaCIF(value);
       if(validate == true){
        return true;
       }
       else{
        return false;
       }
      break;
    }
  });

function validaNIF ( nif ) {           
                nif = nif.toUpperCase();
                var exp = new RegExp ( "^(\\d+)\-?([A-Z])$" );
                var res = exp.exec ( nif );
                if ( res == null || res.index != 0 )
                {
                    return false;
                }
                var numero = parseInt ( res[1] , 10 );
                var letra = res[2];
                return 'TRWAGMYFPDXBNJZSQVHLCKET'.charAt ( numero % 23 ) == letra;
            }

function validaNIE(value){

              var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
              //var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
              var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
              var str = value.toString().toUpperCase();

              if (!nieRexp.test(str)){ 
                return false;
              }

              var nie = str
                  .replace(/^[X]/, '0')
                  .replace(/^[Y]/, '1')
                  .replace(/^[Z]/, '2');

              var letter = str.substr(-1);
              var charIndex = parseInt(nie.substr(0, 8)) % 23;

              if (validChars.charAt(charIndex) === letter) return true;

              return false;
            }

function validaCIF ( cif ){
                cif = cif.toUpperCase();
                cif = cif.replace(/\-/g, ''); // Permitimos guiones

                if ( !/^[A-Za-z0-9]{9}$/.test ( cif ) ) // Son 9 dígitos?
                {
                    return false;
                }
                if ( !/^[ABCDEFGHJKLMNPRQSUVW]/.test ( cif ) )
                {
                    return false;
                }

                var v1 = new Array ( 0 , 2 , 4 , 6 , 8 , 1 , 3 , 5 , 7 , 9 );
                var temp = 0;

                for( i = 2; i <= 6; i += 2 )
                {
                    temp = temp + v1 [ parseInt ( cif.substr ( i-1 , 1 ) ) ];
                    temp = temp + parseInt ( cif.substr ( i , 1 ) );
                };

                temp = temp + v1 [ parseInt ( cif.substr ( 7 , 1 ) ) ];
                temp = ( 10 - ( temp % 10 ) );

                if( temp == 10 )
                {
                    if ( cif.charAt ( cif.length - 1 ) == 'J' || cif.charAt ( cif.length - 1 ) == '0' )
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    if ( cif.charAt ( cif.length - 1 ) ==  temp || cif.charAt ( cif.length - 1 ) == String.fromCharCode ( 64 + temp ) )
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                return false;
            }


