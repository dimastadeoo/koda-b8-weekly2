define(function (require) {
    const $ = require('jquery')
    $(document).ready(function () {

        function handleTogglePassword(triggerClass) {
            $(triggerClass).on('click', function () {
                const inputField = $(this).siblings('input');
                const icons = $(this).find('svg');

                if (inputField.attr('type') === 'password') {
                    inputField.attr('type', 'text');
                } else {
                    inputField.attr('type', 'password');
                }

                icons.toggleClass('hidden');
            });
        }

        handleTogglePassword('.to-pass');
        handleTogglePassword('.to-confPass');

        $('form').on('submit', function (e) {
            e.preventDefault();

            const nama = $('input[name="name"]').val().trim();
            const email = $('input[name="email"]').val().trim();
            const pass = $('input[name*="pass"]').val();
            const confirmPass = $('input[name*="confirmPass"]').val();

            if (pass.length < 6) {
                alert('Kata sandi minimal harus 6 karakter!');
                return;
            }

            if (pass !== confirmPass) {
                alert('Kata sandi dan konfirmasi sandi berbeda');
                return;
            }

            const userList = JSON.parse(window.localStorage.getItem('userData')) || [];

            const emailExists = userList.some(user => user.email === email);
            if (emailExists) {
                alert('Email ini sudah terdaftar! Silakan gunakan email lain.');
                return;
            }

            const userData = {
                nama: nama,
                email: email,
                password: pass
            };

            userList.push(userData);

            window.localStorage.setItem('userData', JSON.stringify(userList));
            alert('Pendaftaran berhasil! Akun kamu sudah terdaftar.');
            window.location.href = 'login.html';
        });

    });

})
