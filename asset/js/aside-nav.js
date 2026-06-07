document.addEventListener("DOMContentLoaded", function () {
    fetch('/component/aside.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('aside').innerHTML = data;

        // untuk menambahkan class active pada button ketika di tekan ke halamannya
        const currentPathname = window.location.pathname;
        const menuItem = document.querySelectorAll('.menu-item');
        

        menuItem.forEach(link => {
            const linkHref = link.getAttribute('href');

            if (currentPathname.endsWith(linkHref)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    fetch('/component/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-top').innerHTML = data;
        });
    
    
});