async function display(componen, id) {
    const respon = await fetch(componen)
    document.getElementById(id).innerHTML = await respon.text()
}

async function main() {

    const header = await display('/component/header.html', 'header')
    const footer = await display('/component/footer.html', 'footer')
    
    //humberger navbar
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const arrowIcon = document.getElementById('arrow-icon');

    menuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('hidden');

        arrowIcon.classList.toggle('rotate-180');
    });
}

main()