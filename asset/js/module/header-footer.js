async function display(componen, id) {
    const respon = await fetch(componen)
    document.getElementById(id).innerHTML = await respon.text()
}

function humbergerMenu() {
    //humberger navbar
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const arrowIcon = document.getElementById('arrow-icon');

    menuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('hidden');
        arrowIcon.classList.toggle('rotate-180');
    });
}

function profile() {
    // icon profile
    const profileBtn = document.getElementById('profile-btn');
    const accountModal = document.getElementById('account-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const viewAccountBtn = document.getElementById('view-account-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    const cartBtn = document.getElementById('cart-btn');

    //modal porfile
    const profileNameNav = document.getElementById('profile-name-nav');
    const modalUserName = document.getElementById('modal-user-name');
    const modalUserEmail = document.getElementById('modal-user-email');

    function loadUserData() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const currentUserData = sessionStorage.getItem('currentUser');

        if (isLoggedIn === 'true' && currentUserData) {
            const user = JSON.parse(currentUserData);
            profileNameNav.textContent = user.nama.split(' ')[0];
            modalUserName.textContent = user.nama;
            modalUserEmail.textContent = user.email;
            closeModalBtn.classList.remove('hidden')

            viewAccountBtn.addEventListener('click', () => {
                window.location.href = '/profile/edit-profile.html';
            });
        } else {
            setDefaultGuest();
        }
    }

    function setDefaultGuest() {
        profileNameNav.textContent = "Masuk";
        modalUserName.textContent = "Belum Login";
        modalUserEmail.textContent = "Silakan masuk ke akun Anda";
        viewAccountBtn.innerText = 'Silahkan Login'
        closeModalBtn.classList.add('hidden')
        viewAccountBtn.addEventListener('click', () => {
            window.location.href = '/auth/login.html';
        });
    }

    loadUserData();

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accountModal.classList.toggle('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        const konfirmasi = confirm("Apakah Anda yakin ingin keluar dari akun?");
        if (!konfirmasi) return;

        sessionStorage.setItem("isLoggedIn", "false");
        sessionStorage.removeItem("currentUser");

        alert("Anda telah berhasil logout.");
        window.location.href = "/auth/login.html";
    });

    window.addEventListener('click', (e) => {
        if (!accountModal.contains(e.target) && e.target !== profileBtn) {
            accountModal.classList.add('hidden');
        }
    });

    wishlistBtn.addEventListener('click', () => {
        window.location.href = '/profile/wishlist.html';
    });

    cartBtn.addEventListener('click', () => {
        window.location.href = '/main/cart.html';
    });
}

async function headerFooter() {

    const header = await display('/component/header.html', 'header')
    const footer = await display('/component/footer.html', 'footer')

    humbergerMenu()

    profile()

}

headerFooter()

