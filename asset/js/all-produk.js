function makeElemen(nameElemen, nameClass) {
    const divElemen = document.createElement(nameElemen)

    if (nameClass !== "") {
        divElemen.className = nameClass
    }
    return divElemen
}

function itemCart(dataCart) {
    const clasButtonCont = 'bg-white border border-gray-100 rounded-2xl flex flex-col shadow-sm hover:shadow-md transition-all group cursor-pointer'
    const buttonContainer = makeElemen('div', clasButtonCont)
    buttonContainer.type = 'button'

    const classItem = `relative w-full aspect-square rounded-xl bg-cover bg-center bg-no-repeat transition-transform group-hover:scale-[1.02] duration-300 bg-[url('${dataCart.image[0]}')]`
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
    divCartName.innerText = dataCart.cartNameContent

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

    const clasSpanRate = 'font-bold text-gray-800 ml-1'
    const spanRate = makeElemen('span', clasSpanRate)
    spanRate.innerText = dataCart.rateContent

    const clasSpanReview = 'text-gray-400'
    const spanReview = makeElemen('span', 'rate')
    spanReview.innerText = `(${dataCart.reviewContent})`

    const clasDivPriceCart = 'pt-1 flex items-baseline gap-2'
    const divPriceCart = makeElemen('div', clasDivPriceCart)

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
    } else if (dataCart.badgeContent !== "") {
        badgeSpan.innerText = dataCart.badgeContent
        badgeSpan.classList.add('bg-[#1A73E8]')

        spanDisPrice.innerText = `Rp ${dataCart.price.toLocaleString()}`
    } else {
        badgeSpan.classList.add('hidden')
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
    buttonContainer.append(divBadgeWhis)
    buttonContainer.append(divItemCart)
    return buttonContainer

}

async function imporData(arr) {
    try {
        const response = await fetch('/asset/json/produk.json');

        if (!response.ok) {
            throw new Error(`Gagal load JSON: ${response.status}`);
        }

        const arrayObj = await response.json();

        if (!arr || !Array.isArray(arr) || arr.length === 0) {
            return arrayObj;
        }

        const varBaru = arrayObj.filter(item => arr.includes(item.id));
        return varBaru

    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }

}

const produk = document.getElementById('all-sale-item')

async function main(){
    const dataAll = await imporData()
    console.log(dataAll)

    dataAll.forEach((dataCart) => {
        const createCart = itemCart(dataCart)
        produk.append(createCart)
        createCart.addEventListener('click', () => {
            window.localStorage.setItem('selectedProduct', JSON.stringify(dataCart));
            window.location.href = 'detail-page.html';
        });
    })
}

main()