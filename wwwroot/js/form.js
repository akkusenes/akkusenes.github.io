var element = document.getElementById('phone');
var maskOptions = {
    mask: '+{90} (000) 000 00 00'
};
var mask = IMask(element, maskOptions);

var submitButton = $('#submitButton')
var form = $('#contactForm');

var errorMessage = $('#submitErrorMessage');
var succesMessage = $('#submitSuccessMessage');
var tokenField = $('input[name="ReCaptchaToken"]');



grecaptcha.ready(function () {

    form.on('submit', function (e) {
        e.preventDefault();
        if (form.hasClass('loading')) {
            return;
        }

        succesMessage.addClass('d-none');
        errorMessage.addClass('d-none');
        form.addClass('loading');
        submitButton.addClass('disable');


        grecaptcha.execute('6LeQPIomAAAAAL5oj7w-VT8W6uIHgkavhUNA5bvD', { action: 'submit' }).then(function (token) {
            tokenField.val(token);

            $.post('/form-gonder',
                form.serialize(),
                function (r) {
                    if (r.success) {
                        form.removeClass('loading');
                        submitButton.removeClass('disable');
                        form[0].reset();

                        errorMessage.removeClass('d-none');

                    } else {
                        succesMessage.removeClass('d-none');
                    }
                }
            );

        });


    });
});