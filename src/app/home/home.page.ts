import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit(){
    (function ($) {
      $(document).ready(function(){

        $('.message a').click(function(e){
          e.preventDefault();
          $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        });

        $(".login-form").submit(function (e) {

          var url = $(this).attr("action");
          var user = $("#user").val();
          var password = $("#password").val();

          $.ajax({
             url: url,
             type: 'POST',
             data: {user: user, password: password},
             success: function (response) {
                if(response) {
                  localStorage.setItem("user", user);
                  localStorage.setItem("password", password);
                  window.location.href = "/booking";
                }
                else
                {
                   alert("Usuario o Constraeña incorrecto");
                }
             }
          });

          e.preventDefault();

       });

       $(".register-form").submit(function (e) {

          var url = $(this).attr("action");
          var newUser = $("#newUser").val();
          var newPassword = $("#newPassword").val();
          var newEmail = $("#newEmail").val();

          $.ajax({
             url: url,
             type: 'POST',
             data: {newUser: newUser, newPassword: newPassword, newEmail: newEmail},
             success: function (response) {
                if(response) {
                  localStorage.setItem("email", newEmail);
                  alert("Usuario creado correctamente");
                  window.location.href = "/home";
                }
                else
                {
                   alert("Ocurrio un error intente nuevamente");
                }
             }
          });

          e.preventDefault();

        });

        $("#user").keyup(function(){
          if(this.checkValidity()){
            $("#userError").hide();
          } else {
            $("#userError").show();
          }
        });

        $("#password").keyup(function(){
          if(this.checkValidity()){
            $("#passwordError").hide();
          } else {
            $("#passwordError").show();
          }
        });

        $("#newUser").keyup(function(){
          if(this.checkValidity()){
            $("#newUserError").hide();
          } else {
            $("#newUserError").show();
          }
        });

        $("#newPassword").keyup(function(){
          if(this.checkValidity()){
            $("#newPasswordError").hide();
          } else {
            $("#newPasswordError").show();
          }
        });

        $("#newEmail").keyup(function(){
          if(this.checkValidity()){
            $("#newEmailError").hide();
          } else {
            $("#newEmailError").show();
          }
        });

        $(".form input").keyup(function(){
          if($("#user")[0].checkValidity() && $("#password")[0].checkValidity()
             && $("#user").val() != "" && $("#password").val() != ""){
            $("#loginSubmit").prop('disabled', false);
          } else {
            $("#loginSubmit").prop('disabled', true);
          }
        });

        $(".form input").keyup(function(){
          if($("#newUser")[0].checkValidity() && $("#newPassword")[0].checkValidity() && $("#newEmail")[0].checkValidity()
             && $("#newUser").val() != "" && $("#newPassword").val() != "" && $("#newEmail").val() != ""){
            $("#registerSubmit").prop('disabled', false);
          } else {
            $("#registerSubmit").prop('disabled', true);
          }
        });

      });
    })(jQuery);
  }

}
