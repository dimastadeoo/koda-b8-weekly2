define(function (require) {
    const $ = require('jquery')

    $(document).ready(function () {

        $('.to-pass').on('click', function () {
            const inputField = $(this).siblings('input');
            const icons = $(this).find('svg');

            if (inputField.attr('type') === 'password') {
                inputField.attr('type', 'text');
            } else {
                inputField.attr('type', 'password');
            }

            icons.toggleClass('hidden');
        });

        $('form').on('submit', function (e) {
            e.preventDefault();

            const inputEmail = $('input[name="email"]').val().trim();
            const inputPassword = $('input[name="pass"]').val();

            const userList = JSON.parse(localStorage.getItem('userData')) || [];
            const foundUser = userList.find(user => user.email === inputEmail);

            if (!foundUser) {
                alert('Email tidak terdaftar! Silahkan buat akun dulu.');
                return;
            }

            if (foundUser.password !== inputPassword) {
                alert('Kata sandi yang Anda masukkan salah!');
                return;
            }

            alert(`Login Berhasil Selamat Datang , ${foundUser.nama}!`);

            window.sessionStorage.setItem('isLoggedIn', 'true');
            window.sessionStorage.setItem('currentUser', JSON.stringify(foundUser));

            window.location.href = '/main/landing-page.html';
        });

    });

})
