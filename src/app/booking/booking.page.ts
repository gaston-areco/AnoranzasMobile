import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var jsPDF: any;
declare var Email: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor() { }

  ngOnInit() {
    (function ($) {
      $(document).ready(function(){

        $("#user").val(localStorage.getItem("user"));
        $("#email").val(localStorage.getItem("email"));

        $('#roomType').change(function () {
            if( $('#roomType').val() === 'Triple')
            {
                $('#room1').css("background-image", "url('assets/img/habitaciones/triple/galeria-salvador-crt-1.jpg')");
                $('#room2').css("background-image", "url('assets/img/habitaciones/triple/galeria-salvador-crt-2.jpg')");
                $('#room3').css("background-image", "url('assets/img/habitaciones/triple/galeria-salvador-crt-3.jpg')");
                $('#room4').css("background-image", "url('assets/img/habitaciones/triple/galeria-salvador-crt-4.jpg')");
                $('#room5').css("background-image", "url('assets/img/habitaciones/triple/galeria-salvador-crt-5.jpg')");
                $('#room6').css("background-image", "url('assets/img/habitaciones/triple/galeria-salvador-crt-6.jpg')");
            }
            else
            {
                $('#room1').css("background-image","url('assets/img/habitaciones/doble/galeria-rooms-crt-1.jpg')");
                $('#room2').css("background-image","url('assets/img/habitaciones/doble/galeria-rooms-crt-2.jpg')");
                $('#room3').css("background-image","url('assets/img/habitaciones/doble/galeria-rooms-crt-3.jpg')");
                $('#room4').css("background-image","url('assets/img/habitaciones/doble/galeria-rooms-crt-4.jpg')");
                $('#room5').css("background-image","url('assets/img/habitaciones/doble/galeria-rooms-crt-5.jpg')");
                $('#room6').css("background-image","url('assets/img/habitaciones/doble/galeria-rooms-crt-6.jpg')");
            }
        });

        $("#user").keyup(function(){
          if(this.checkValidity()){
            $("#userError").hide();
            $("#user").removeClass("is-invalid");
          } else {
            $("#userError").show();
            $("#user").addClass("is-invalid");
          }
        });

        $("#email").keyup(function(){
          if(this.checkValidity()){
            $("#emailError").hide();
            $("#email").removeClass("is-invalid");
          } else {
            $("#emailError").show();
            $("#email").addClass("is-invalid");
          }
        });

        $("#cardNumber").keyup(function(){
          if(this.checkValidity()){
            $("#cardNumberError").hide();
            $("#cardNumber").removeClass("is-invalid");
          } else {
            $("#cardNumberError").show();
            $("#cardNumber").addClass("is-invalid");
          }
        });

        $("#cardOwner").keyup(function(){
          if(this.checkValidity()){
            $("#cardOwnerError").hide();
            $("#cardOwner").removeClass("is-invalid");
          } else {
            $("#cardOwnerError").show();
            $("#cardOwner").addClass("is-invalid");
          }
        });

        $("#cardDate").keyup(function(){
          if(this.checkValidity()){
            $("#cardDateError").hide();
            $("#cardDate").removeClass("is-invalid");
          } else {
            $("#cardDateError").show();
            $("#cardDate").addClass("is-invalid");
          }
        });

        var today = new Date();
        var dd = today.getDate().toString();
        var mm = (today.getMonth()+1).toString();
        var yyyy = today.getFullYear();
        var t = "";
        if(dd<"10"){
          dd =  '0' + dd;
        };
        if(mm<"10"){
          mm ='0'+mm;
        };

        t = yyyy+'-'+mm+'-'+dd;
        console.log(t);
        console.log(dd);
        $("#arriveDate").attr("min", t);

        $("#arriveDate").blur(function(){
          $("#departureDate").attr("min", $("#arriveDate").val());
        });

        $("form div input").keyup(function(){
          if($("#user")[0].checkValidity() && $("#email")[0].checkValidity()
             && $("#cardNumber")[0].checkValidity() && $("#cardOwner")[0].checkValidity()
             && $("#cardDate")[0].checkValidity() && $("#user").val() != ""
             && $("#email").val() != "" && $("#cardNumber").val() != ""
             && $("#cardOwner").val() != "" && $("#cardDate").val() != ""
             && $("#arriveDate").val() != "dd/mm/aaaa" && $("#cardDate").val() != "dd/mm/aaaa"){
            $("#payNow").prop('disabled', false);
          } else {
            $("#payNow").prop('disabled', true);
          }
        });

        $("form div input").change(function(){
          if($("#user")[0].checkValidity() && $("#email")[0].checkValidity()
             &&  $("#user").val() != "" && $("#email").val() != ""
             && $("#arriveDate").val() != "" && $("#departureDate").val() != ""){
            $("#payLater").prop('disabled', false);
          } else {
            $("#payLater").prop('disabled', true);
          }
        });

        $("#payNow").click(function (e) {

           var url = $("#bookingForm").attr("action");
           var arriveDate = $("#arriveDate").val();
           var departureDate = $("#departureDate").val();
           var roomType = $("#roomType").val();
           var cardNumber = $("#cardNumber").val();
           var cardOwner = $("#cardOwner").val();
           var cardDate = $("#cardDate").val();
           var email = $("#email").val();

           $.ajax({
              url: url,
              type: 'POST',
              data: {arriveDate: arriveDate, departureDate: departureDate, roomType: roomType,
                     cardNumber: cardNumber, cardOwner: cardOwner, cardDate: cardDate,
                     user:localStorage.getItem("user"), password:localStorage.getItem("password")},
              success: function (response) {
                 if(response) {
                    $("#bookingForm")[0].reset();
                    alert("Reserva realizada correctamente");
                    var doc = new jsPDF();

                    doc.setFontSize(22);
                    doc.text('Añoranzas Chaqueñas', 10, 10);

                    doc.setFontSize(16);
                    doc.setFontType('bold');
                    doc.text('Fecha de Reserva', 10, 30);

                    var now = new Date();
                    doc.setFontType('normal');
                    doc.text(now.toLocaleString(), 10, 40);

                    doc.setFontType('bold');
                    doc.text('Dia arribo', 10, 60);

                    doc.setFontType('normal');
                    doc.text(arriveDate, 10, 70);

                    doc.setFontType('bold');
                    doc.text('Dia salida', 10, 90);

                    doc.setFontType('normal');
                    doc.text(departureDate, 10, 100);

                    doc.setFontType('bold');
                    doc.text('Cliente', 10, 120);

                    doc.setFontType('normal');
                    doc.text(localStorage.getItem("user"), 10, 130);

                    doc.setFontType('normal');
                    doc.text('Tipo de Habitación: ' + roomType, 120, 150);

                    doc.setFontType('normal');
                    doc.text('Método: Tarjeta de Crédito', 120, 160);

                    doc.setFontType('normal');
                    doc.text('Condición: Pagado', 120, 170);

                    doc.setFontType('normal');
                    doc.text('Total: $5200', 120, 180);

                    doc.save('factura.pdf');
                    var pdfBase64 = doc.output('datauristring');

                    Email.send({
                      Host : "smtp.elasticemail.com",
                      Username : "gaston.areco.was.taken@gmail.com",
                      Password : "7462d695-80d4-466e-b97e-db369ccad2d5",
                      To : email,
                      From : "gaston.areco.was.taken@gmail.com",
                      Subject : "Reserva - Añoranzas Chaqueñas",
                      Body : "Factura de la Reserva",
                    	Attachments : [
                    	{
                    		name : "factura.pdf",
                    		data : pdfBase64
                    	}]
                    }).then(
                    message => console.log(message)
                    );
                 }
                 else
                 {
                    alert("Ocurrio un error intente nuevamente");
                 }
              }
           });

           e.preventDefault();

         });

         $("#payLater").click(function (e) {
           e.preventDefault();
           $("#bookingForm")[0].reset();
           alert("Reserva pendiente de pago realizada correctamente");
         });

      });
    })(jQuery);
  }

}
