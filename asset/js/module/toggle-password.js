define(function (require) {
    const $ = require('jquery');

    function togglePassword(selector) {
        $(selector).on('click', function () {
            const button = $(this);
            const inputField = button.siblings('input');
            const icons = button.find('svg');

            const isPassword = inputField.attr('type') === 'password';

            inputField.attr('type', isPassword ? 'text' : 'password');
            icons.toggleClass('hidden');

            button.attr('aria-pressed', String(isPassword));

            if (isPassword) {
                button.attr('aria-label', 'Sembunyikan kata sandi');
            } else {
                button.attr('aria-label', 'Tampilkan kata sandi');
            }
        });
    }

    return togglePassword;
});