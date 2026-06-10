const katContainer = document.getElementById('kategori')
const flashSaleCont = document.getElementById('flash-sale-item')
const newSaleCont = document.getElementById('new-sale-item')
const superSaleCont = document.getElementById('super-sale-item')

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
    image: '/asset/img/item-1.png'

},
{
    url: '#',
    badgeContent: 16,
    cartJenisContent: 'PhoneX',
    cartNameContent: 'Smartphone 5G Ultra',
    rateContent: 4.6,
    reviewContent: 890,
    price: 5000000,
    image: '/asset/img/item-2.png'

},
{
    url: '#',
    badgeContent: 20,
    cartJenisContent: 'WristTech',
    cartNameContent: 'Smartwatch Series 5',
    rateContent: 4.4,
    reviewContent: 324,
    price: 3500000,
    image: '/asset/img/item-3.png'

},
{
    url: '#',
    badgeContent: 27,
    cartJenisContent: 'SportPro',
    cartNameContent: 'Sneakers Sport Runfast',
    rateContent: 4.6,
    reviewContent: 445,
    price: 750000,
    image: '/asset/img/item-4.png'

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
    const clasDivCont = 'bg-white border border-gray-100 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group'
    const divContainer = makeElemen('div', clasDivCont)


    const anchorCartItem = makeElemen('a', 'no-underline block')
    anchorCartItem.href = dataCart.url

    const classItem = `relative w-full aspect-square rounded-xl bg-cover bg-center bg-no-repeat transition-transform group-hover:scale-[1.02] duration-300 bg-[url('${dataCart.image}')]`
    const divBadgeWhis = makeElemen('div', classItem)

    const clasDivItemCart = 'p-3 space-y-1'
    const divItemCart = makeElemen('div', clasDivItemCart)

    const clasBadgeSpan = 'absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full'
    const badgeSpan = makeElemen('span', clasBadgeSpan)

    const clasButtonWhislist = 'btn-whislist-item absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center shadow-sm cursor-pointer z-10 transition-all duration-300'
    const buttonWhislist = makeElemen('button', clasButtonWhislist)
    buttonWhislist.type = 'button'

    buttonWhislist.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="text-red-800 transition-colors duration-300 group-[.active]:fill-red-500">
                                    <path
                                        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />`

    const clasDivCartJenis = 'text-xs text-gray-400 font-medium tracking-wide uppercase'
    const divCartJenis = makeElemen('div', clasDivCartJenis)
    divCartJenis.innerText = dataCart.cartJenisContent

    const clasDivCartName = 'text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors'
    const divCartName = makeElemen('div', clasDivCartName)
    divCartJenis.innerText = dataCart.cartNameContent

    const clasDivRareStars = 'flex items-center gap-1 text-xs py-0.5'
    const divRareStars = makeElemen('div', clasDivRareStars)

    const clasSpanStars = 'flex items-center gap-0.5'
    const spanStars = makeElemen('span', clasSpanStars)
    spanStars.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3.5 h-3.5 text-amber-400">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3.5 h-3.5 text-amber-400">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3.5 h-3.5 text-amber-400">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3.5 h-3.5 text-amber-400">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3.5 h-3.5 text-amber-400">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>`

    const clasSpanRate ='font-bold text-gray-800 ml-1'
    const spanRate = makeElemen('span', clasSpanRate)
    spanRate.innerText = dataCart.rateContent

    const clasSpanReview = 'text-gray-400'
    const spanReview = makeElemen('span', 'rate')
    spanReview.innerText = `(${dataCart.reviewContent})`

    const clasDivPriceCart = 'pt-1 flex items-baseline justify-between'
    const divPriceCart = makeElemen('div', 'flash-price-item')

    let spanDisPrice = ""
    let spanRegPrice = ""
    const clasSpanDisPrice = 'pt-1 flex items-baseline justify-between'
    spanDisPrice = makeElemen('span', clasSpanDisPrice)

    if (typeof dataCart.badgeContent === 'number') {
        badgeSpan.innerText = `-${dataCart.badgeContent} %`
        badgeSpan.classList.add('bg-[#DC2626]')

        spanDisPrice.innerText = `Rp ${(dataCart.price * (1 - dataCart.badgeContent / 100)).toLocaleString()}`

        const clasSpanRegPrice = 'text-xs text-gray-400 line-through'
        spanRegPrice = makeElemen('span', clasSpanRegPrice)
        spanRegPrice.innerText = `Rp ${dataCart.price.toLocaleString()}`
    } else {
        badgeSpan.innerText = dataCart.badgeContent
        badgeSpan.classList.add('bg-[#1A73E8]')

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
    divBadgeWhis.append(buttonWhislist)
    divBadgeWhis.append(badgeSpan)
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

    dataCartFlash.forEach((dataCart) => {
        const createCart = itemCart(dataCart)
        newSaleCont.append(createCart)
    })

    dataCartFlash.forEach((dataCart) => {
        const createCart = itemCart(dataCart)
        superSaleCont.append(createCart)
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