define(function (require) {
    const $ = require('jquery');
    const modal = require('modalConfirmAlert')
    const togglePass = require('togglePassword')

    $(document).ready(function () {

        togglePass('.to-pass');
        togglePass('.to-confPass');

        $('#formReg').on('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const valueForm = Object.fromEntries(formData.entries())

            if (valueForm.pass.length < 6) {
                await modal.alert({
                    title: 'Kata Sandi Terlalu Pendek',
                    message: 'Kata sandi minimal harus 6 karakter!'
                });
                return;
            }

            if (valueForm.pass !== valueForm.confirmPass) {
                await modal.alert({
                    title: 'Konfirmasi Sandi Tidak Sesuai',
                    message: 'Kata sandi dan konfirmasi sandi berbeda.'
                });
                return;
            }

            const userList = JSON.parse(window.localStorage.getItem('userData')) || [];

            const emailExists = userList.some(user => user.email === valueForm.email);

            if (emailExists) {
                await modal.alert({
                    title: 'Email Sudah Terdaftar',
                    message: 'Email ini sudah terdaftar! Silakan gunakan email lain.'
                });
                return;
            }

            const isConfirmed = await modal.confirm({
                title: 'Konfirmasi Pendaftaran',
                message: 'Apakah kamu yakin ingin mendaftarkan akun ini?',
                okText: 'Daftar',
                cancelText: 'Batal'
            });

            if (!isConfirmed) {
                return;
            }

            const userData = {
                nama: valueForm.name,
                email: valueForm.email,
                password: valueForm.pass
            };

            userList.push(userData);

            window.localStorage.setItem('userData', JSON.stringify(userList));

            await modal.alert({
                title: 'Pendaftaran Berhasil',
                message: 'Akun kamu sudah berhasil terdaftar.'
            });
            window.location.href = 'login.html';
        });

    });
});