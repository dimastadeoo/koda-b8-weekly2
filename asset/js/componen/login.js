define(function (require) {
    const $ = require('jquery');
    const modal = require('modalConfirmAlert');
    const togglePass = require('togglePassword')

    $(document).ready(function () {
        togglePass('.to-pass')
    
        $('#formLogin').on('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const valueForm = Object.fromEntries(formData.entries())

            if (!inputEmail || !inputPassword) {
                await modal.alert({
                    title: 'Data Belum Lengkap',
                    message: 'Email dan kata sandi wajib diisi.'
                });
                return;
            }

            const userList = JSON.parse(window.localStorage.getItem('userData')) || [];

            const foundUser = userList.find(function (user) {
                return user.email === inputEmail;
            });

            if (!foundUser) {
                await modal.alert({
                    title: 'Email Tidak Terdaftar',
                    message: 'Email tidak terdaftar! Silakan buat akun terlebih dahulu.'
                });
                return;
            }

            if (foundUser.password !== inputPassword) {
                await modal.alert({
                    title: 'Kata Sandi Salah',
                    message: 'Kata sandi yang Anda masukkan salah.'
                });
                return;
            }

            window.sessionStorage.setItem('isLoggedIn', 'true');
            window.sessionStorage.setItem('currentUser', JSON.stringify(foundUser));

            await modal.alert({
                title: 'Login Berhasil',
                message: `Selamat datang, ${foundUser.nama}!`
            });

            window.location.href = '/main/landing-page.html';
        });

    });
});