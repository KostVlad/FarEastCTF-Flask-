$(document).ready(function() {
	$('#registrForm').on('submit', function(event) {
		$.ajax({
			data : {
				username : $('#signup-username').val(),
                email : $('#signup-email').val(),
                //telegram : $('#signup-telegram').val(),
                password : $('#signup-password').val(),
                recaptcha : grecaptcha.getResponse()
			},
			type : 'POST',
			url : '/register'
		})
		.done(function(data) {
			if (data.error1) {  //Поле пользователе пусто
                console.log("error1") 
				$('#cd-error-message-username-signup').text(data.error1).addClass('is-visible');
				//$('#successAlert').hide();
                setTimeout(function() { $('#cd-error-message-username-signup').removeClass('is-visible'); }, 3500);
			}
            else if (data.error2) { //Пользователь с таким логином уже зарегистрирован
                $('#cd-error-message-username-signup').text(data.error2).addClass('is-visible');
                grecaptcha.reset();
                setTimeout(function() { $('#cd-error-message-username-signup').removeClass('is-visible'); }, 3500);
            }
            else if (data.error3) { //Такой emial уже зарегистрирован
                $('#cd-error-message-email-signup').text(data.error3).addClass('is-visible');
                grecaptcha.reset();
                setTimeout(function() { $('#cd-error-message-email-signup').removeClass('is-visible'); }, 3500);
            }
            else if (data.error4) { //Не понятная ошибка регистрации, попробуйте зарегистрироваться еще раз позже
                alert("Не понятная ошибка регистрации, попробуйте зарегистрироваться еще раз позже")
            }
            else if (data.error5) { //Нам кажется что вы бот
                $('#cd-error-message-captcha-signup').text(data.error5).addClass('is-visible');
                //grecaptcha.reset();
                setTimeout(function() { $('#cd-error-message-captcha-signup').removeClass('is-visible'); }, 3500);
            }
            else if (data.error6) { //Метод не POST, наебываешь систему?
                alert("Метод не POST, наебываешь систему?")
            }
			else if (data.success) {
                alert( 'Успешная регистрация!');
                grecaptcha.reset();
                //location.href = '';

			}//end if data.success

		});
		
        event.preventDefault();
	});//end-register-function

/*****************************Authorization function**************************/
    
    $('#authorizationForm').on('submit', function(event) {
		$.ajax({
			data : {
                email : $('#signin-email').val(),
                //telegram : $('#signin-telegram').val(),
                password : $('#signin-password').val()
			},
			type : 'POST',
			url : '/login'
		})
		.done(function(data) {
			if (data.error1) {  //Поле email пусто
				$('#cd-error-message-email-signin').text(data.error1).addClass('is-visible');
				//$('#successAlert').hide();
                setTimeout(function() { $('#cd-error-message-email-signin').removeClass('is-visible'); }, 3500);
			}
            else if (data.error2) { //Не верный email или пароль
                $('#cd-error-message-password-signin').text(data.error2).addClass('is-visible');
                setTimeout(function() { $('#cd-error-message-password-signin').removeClass('is-visible'); }, 3500);
            }
            else if (data.error3) { //Не верный метод
                alert("Не верный метод")
            }
			else if (data.success) {
                location.href = '';// Возвращает на начальную страницу

			}//end if data.success

		});
		
        event.preventDefault();
	});//end-authorization-function
    
});