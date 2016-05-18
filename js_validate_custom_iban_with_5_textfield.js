//CDN Jquery Validate
<script src="https://cdn.jsdelivr.net/jquery.validation/1.15.0/jquery.validate.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.validation/1.15.0/additional-methods.min.js"></script>
//Importante, crear primero un input field en el form
<input type=hidden name=foo value="" id="hidden_iban">

//Creamos el evento focusout en el último campo del formulario, este guardará dentro del input hidden creado anteriormente
$("#iban5").focusout(function(){
    var iban = "";
    iban = $("#iban1").val();
    iban = iban + $("#iban2").val();
    iban = iban + $("#iban3").val();
    iban = iban + $("#iban4").val();
    iban = iban + $("#iban5").val();
    iban = iban.toUpperCase();
    $("#hidden_iban").val(iban);

//Método de Validación de Iban, para plugin jquery Validate
  $.validator.addMethod("ibanCheck", function(value, element){

    iban = $("#hidden_iban").val();
      //Si el Iban en distinto a 24 dígitos, cancelamos validadción
    if(iban.length != 24){
      return false;
    }
    var country_code = iban.substring(0,4);
    var letter_1 = iban.substring(0,1);
    var letter_2 = iban.substring(1,2);
    var num1 = getnumIBAN(letter_1);
    var num2 = getnumIBAN(letter_2);
    //Sustituimos las primeras letras por número
    ibanaux = String(num1) + String(num2) + iban.substring(2);
    // Se mueve los 6 primeros caracteres al final de la cadena.
    ibanaux = ibanaux.substring(6) + ibanaux.substring(0,6);
    //Calculamos el resto con el métido modulo97
    resto = modulo97(ibanaux);
      if (resto == 1){
        return true;
    }else{
        return false;
    }
  });

//Funciones auxiliares a la validación

function modulo97(iban) {
    var parts = Math.ceil(iban.length/7);
    var remainer = "";

    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
    }

    return remainer;
}

function getnumIBAN(letra) {
    ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letras.search(letra) + 10;
}



