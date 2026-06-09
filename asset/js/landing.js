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

const dataCartFlash = [{
    url: '#',
    badgeContent: 31,
    cartJenisContent: 'SoundWave',
    cartNameContent: 'Headphone Wireless Premium',
    rateContent: 4.8,
    reviewContent: 512,
    price: 650000,
    image: 'link-bg-item-1'

},
{
    url: '#',
    badgeContent: 31,
    cartJenisContent: 'SoundWave',
    cartNameContent: 'Headphone Wireless Premium',
    rateContent: 4.8,
    reviewContent: 512,
    price: 650000,
    image: 'link-bg-item-1'

},
{
    url: '#',
    badgeContent: 31,
    cartJenisContent: 'SoundWave',
    cartNameContent: 'Headphone Wireless Premium',
    rateContent: 4.8,
    reviewContent: 512,
    price: 650000,
    image: 'link-bg-item-1'

},
{
    url: '#',
    badgeContent: 31,
    cartJenisContent: 'SoundWave',
    cartNameContent: 'Headphone Wireless Premium',
    rateContent: 4.8,
    reviewContent: 512,
    price: 650000,
    image: 'link-bg-item-1'

}
]

// funcion buat elemen dan memberikan kelas
function makeElemen(nameElemen, nameClass) {
    const divElemen = document.createElement(nameElemen)

    if (nameClass !== "") {
        divElemen.className = nameClass
    }
    return divElemen
}
// function div Kategori
function katContent(dataKat) {
    const clasItemShop = 'bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group'
    const divItemShop = makeElemen('div', clasItemShop)

    const clasAnchItemLink = 'no-underline w-full flex flex-col items-center'
    const anchorItemLink = makeElemen('a', clasAnchItemLink)
    anchorItemLink.href = dataKat.url

    const clasDivImgCenter = 'w-24 h-20 flex items-center justify-center overflow-hidden mb-4'
    const divImgCenter = makeElemen('div', clasDivImgCenter)

    const clasImgItemKat = 'max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105 duration-300' 
    const imgItemKat = makeElemen('img', clasImgItemKat)
    imgItemKat.src = dataKat.image
    imgItemKat.alt = dataKat.name

    const clasDivTitleKat = 'text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors'
    const divTitleKat = makeElemen('div', clasDivTitleKat)
    divTitleKat.innerText = dataKat.name

    const clasTextKat = 'text-xs text-gray-400'
    const divTextKat = makeElemen('div', 'text-item-kat')
    divTextKat.innerText = dataKat.qty

    divImgCenter.append(imgItemKat)
    anchorItemLink.append(divImgCenter)
    anchorItemLink.append(divTitleKat)
    anchorItemLink.append(divTextKat)
    divItemShop.append(anchorItemLink)

    return divItemShop
}

function itemCart(dataCart) {
    const divContainer = makeElemen('div', 'item-flash-container')

    const anchorCartItem = makeElemen('a', '')
    anchorCartItem.href = dataCart.url

    const classItem = 'img-item-flash ' + dataCart.image
    const divBadgeWhis = makeElemen('div', classItem)

    const divItemCart = makeElemen('div', 'title-item-flash')

    const badgeSpan = makeElemen('span', 'badge-flash')


    const whislistSpan = makeElemen('span', "wishlist-flash")

    const buttonWhislist = makeElemen('button', 'btn-whislist-item')
    buttonWhislist.type = 'button'

    buttonWhislist.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                                    </svg>`

    const divCartJenis = makeElemen('div', 'flash-jenis')
    divCartJenis.innerText = dataCart.cartJenisContent

    const divCartName = makeElemen('div', 'flash-name-item')
    divCartJenis.innerText = dataCart.cartNameContent

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
    spanRate.innerText = dataCart.rateContent

    const spanReview = makeElemen('span', 'rate')
    spanReview.innerText = `(${dataCart.reviewContent})`

    const divPriceCart = makeElemen('div', 'flash-price-item')

    let spanDisPrice = ""
    let spanRegPrice = ""

    if (typeof dataCart.badgeContent === 'number') {
        badgeSpan.innerText = `-${dataCart.badgeContent} %`
        spanDisPrice = makeElemen('span', 'discount-price')
        spanDisPrice.innerText = `Rp ${(dataCart.price * (1 - dataCart.badgeContent / 100)).toLocaleString()}`

        spanRegPrice = makeElemen('span', 'regular-price')
        spanRegPrice.innerText = `Rp ${dataCart.price.toLocaleString()}`
    } else {
        badgeSpan.innerText = dataCart.badgeContent
        spanDisPrice.innerText = `Rp ${dataCart.price.toLocaleString()}`
    }

    divPriceCart.append(spanDisPrice)
    divPriceCart.append(spanRegPrice)
    divRareStars.append(spanStars)
    divRareStars.append(spanRate)
    divRareStars.append(spanReview)
    divItemCart.append(divCartJenis)
    divItemCart.append(divCartName)
    divItemCart.append(divRareStars)
    divItemCart.append(divPriceCart)
    whislistSpan.append(buttonWhislist)
    divBadgeWhis.append(badgeSpan)
    divBadgeWhis.append(whislistSpan)
    anchorCartItem.append(divBadgeWhis)
    anchorCartItem.append(divItemCart)
    divContainer.append(anchorCartItem)
    return divContainer

}

async function main() {
    dataKat.forEach((data) => {
        const createKat = katContent(data)
        katContainer.append(createKat)
    })

    dataCartFlash.forEach((dataCart) => {
        const createCart = itemCart(dataCart)
        flashSaleCont.append(createCart)
    })

    const btnWhislist = document.querySelectorAll('.btn-whislist-item');

    btnWhislist.forEach((tombol) => {
        tombol.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            this.classList.toggle('active');
        });
    });

}
main()