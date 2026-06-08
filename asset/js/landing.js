const katContainer = document.getElementById('kategori')
const flashSaleCont = document.getElementById('flash-sale-item')

const dataKat = [{
    name: "Elektronik",
    qty: `7 Produk`,
    image: "/asset/img/landing-section.png",
    url: '#'
},
{
    name: "Fashion",
    qty: `5 Produk`,
    image: "/asset/img/Fashion.png",
    url: '#'
},

{
    name: "Rumah & Produk",
    qty: `3 Produk`,
    image: "/asset/img/Rumah & Dapur.png",
    url: '#'
},
{
    name: "Kecantikan",
    qty: `2 Produk`,
    image: "/asset/img/Kecantikan.png",
    url: '#'
},
{
    name: "Olahraga",
    qty: `3 Produk`,
    image: "/asset/img/Olahraga.png",
    url: '#'
},
{
    name: "Buku & Alat Tulis",
    qty: `2 Produk`,
    image: "/asset/img/Buku & Alat Tulis.png",
    url: '#'
}]

// funcion buat elemen dan memberikan kelas
function makeElemen(nameElemen, nameClass){
    const divElemen = document.createElement(nameElemen)
    divElemen.classList.add(nameClass)
    return divElemen
}
// function div Kategori
function katContent(name, qty, img, url){
    const divItemShop = makeElemen('div', 'item-shop')
    
    const anchorItemLink = makeElemen('a', 'item-link')
    anchorItemLink.href = url

    const imgItemKat = makeElemen('img', 'img-item-kat')
    imgItemKat.src = img
    imgItemKat.alt = name

    const divTitleKat = makeElemen('div', 'title-item-kat')
    divTitleKat.innerText = name

    const divTextKat = makeElemen('div', 'text-item-kat')
    divTextKat.innerText = qty

    anchorItemLink.append(imgItemKat)
    anchorItemLink.append(divTitleKat)
    anchorItemLink.append(divTextKat)
    divItemShop.append(anchorItemLink)

    return divItemShop
}

function itemCart(url, badgeContent, cartJenisContent, cartNameContent, rateContent, reviewContent, price){
    const divContainer = makeElemen('div', 'item-flash-container')

    const anchorCartItem = makeElemen('a', '')
    anchorCartItem.href = url

    const classItem = ['img-item-flash', 'link-bg-item-1']
    const imgItemCart = makeElemen('div', ...classItem)

    const titleItemCart = makeElemen('div', 'title-item-flash')

    const badgeSpan = makeElemen('span', 'badge-flash')
    if (typeof badgeContent === 'number'){
        badgeSpan.innerText = `${badgeContent} %`
    }else{
        badgeSpan.innerText = badgeContent
    }

    const whislistSpan = makeElemen('span', "wishlist-flash")

    const buttonWhislist = makeElemen('button', 'btn-whislist-item')
    buttonWhislist.type = 'button'

    buttonWhislist.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                                    </svg>`

    const divCartJenis = makeElemen('div', 'flash-jenis')
    divCartJenis.innerText = cartJenisContent

    const divCartName = makeElemen('div', 'flash-name-item')
    divCartJenis.innerText = cartNameContent

    const divRareStars = makeElemen('div', 'flash-rate-item')

    const spanStars = makeElemen('span', 'stars')
    spanStars.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 120 24" fill="gold" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star">
                                        <defs>
                                            <path id="star" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </defs>
                                        <use href="#star" x="0" />
                                        <use href="#star" x="24" />
                                        <use href="#star" x="48" />
                                        <use href="#star" x="72" />
                                        <use href="#star" x="96" />
                                    </svg>`
    
    const spanRate = makeElemen('span', 'rate')
    spanRate.innerText = rateContent

    const spanReview = makeElemen('span', 'rate')
    spanReview.innerText = reviewContent

    const divPriceCart = makeElemen('div', 'flash-price-item')

    const span

}

const btnWhislist = document.querySelectorAll('.btn-whislist-item');

btnWhislist.forEach((tombol) => {
    tombol.addEventListener('click', function(event) {
        event.stopPropagation(); 
        event.preventDefault(); 
        this.classList.toggle('active');
    });
});

async function main() {
    dataKat.forEach((data) =>{
        const createKat =  katContent(data.name, data.qty, data.image, data.url)
        katContainer.append(createKat)
    })
    
}
main()