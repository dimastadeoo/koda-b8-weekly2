function initQuantityCounter() {
    const qtyInput = document.getElementById('qty-input');
    const btnMinus = document.getElementById('qty-minus');
    const btnPlus = document.getElementById('qty-plus');

    if (!qtyInput || !btnMinus || !btnPlus) return;

    btnMinus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });

    btnPlus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val < 45) qtyInput.value = val + 1; // Maksimal sesuai kapasitas stok
    });
}

// Fungsi untuk mengatur interaksi pilihan variasi warna
function initColorVariants() {
    const colorBtns = document.querySelectorAll('.color-variant-btn');
    const selectedColorTxt = document.getElementById('selected-color');

    if (colorBtns.length === 0) return;

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset state semua tombol warna menjadi tidak aktif
            colorBtns.forEach(b => {
                b.className = "px-4 py-2 text-sm font-medium border border-gray-200 text-gray-700 hover:border-gray-400 rounded-xl transition-all color-variant-btn";
            });
            // Aktifkan style tombol yang diklik
            btn.className = "px-4 py-2 text-sm font-medium border-2 border-blue-600 text-blue-600 bg-blue-50/50 rounded-xl transition-all color-variant-btn";
            if (selectedColorTxt) selectedColorTxt.textContent = btn.textContent;
        });
    });
}

// Fungsi untuk mengatur sistem perpindahan tab informasi produk
function initTabsSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            // Atur tombol aktif
            tabBtns.forEach(b => {
                b.className = "tab-btn px-5 py-2.5 text-sm font-medium rounded-xl text-gray-500 hover:text-gray-800 transition-all cursor-pointer";
            });
            btn.className = "tab-btn px-5 py-2.5 text-sm font-semibold rounded-xl text-blue-600 bg-white shadow-sm transition-all cursor-pointer";

            // Atur konten aktif (Panel konten)
            tabPanes.forEach(pane => {
                if (pane.id === target) {
                    pane.classList.remove('hidden');
                    pane.classList.add('block');
                } else {
                    pane.classList.remove('block');
                    pane.classList.add('hidden');
                }
            });
        });
    });
}

// Fungsi mengambil data dari Local Storage dan melakukan validasi awal
function getProductFromStorage() {
    const productDataString = localStorage.getItem('selectedProduct');
    
    if (!productDataString) {
        alert('Produk tidak ditemukan!');
        window.location.href = 'index.html';
        return null;
    }
    
    try {
        return JSON.parse(productDataString);
    } catch (error) {
        console.error("Gagal melakukan parse data produk:", error);
        return null;
    }
}

// Fungsi khusus menangani render gambar utama dan daftar galeri thumbnail
function renderProductGallery(product, mainImg) {
    if (!mainImg) return;
    
    mainImg.src = product.image[0];

    const thumbnailContainer = document.querySelector('.thumbnail-gallery') || mainImg.parentElement.nextElementSibling;
    if (!thumbnailContainer || !product.image || product.image.length === 0) return;

    thumbnailContainer.innerHTML = ''; // Bersihkan dummy/placeholder HTML awal
    
    product.image.forEach((imgUrl, index) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = `w-20 h-20 bg-white rounded-xl overflow-hidden p-1 cursor-pointer transition-all ${index === 0 ? 'border-2 border-blue-600' : 'border border-gray-200 hover:border-gray-400'}`;
        thumbDiv.innerHTML = `<img src="${imgUrl}" alt="Thumbnail ${index + 1}" class="w-full h-full object-contain">`;

        // Event klik untuk mengganti tampilan gambar utama
        thumbDiv.addEventListener('click', () => {
            mainImg.src = imgUrl;
            thumbnailContainer.querySelectorAll('div').forEach(d => {
                d.className = 'w-20 h-20 bg-white border border-gray-200 hover:border-gray-400 rounded-xl overflow-hidden p-1 cursor-pointer transition-all';
            });
            thumbDiv.className = 'w-20 h-20 bg-white border-2 border-blue-600 rounded-xl overflow-hidden p-1 cursor-pointer transition-all';
        });
        
        thumbnailContainer.appendChild(thumbDiv);
    });
}

function renderProductDetails(product, mainImg) {
    // Kalkulasi nilai diskon
    const discountAmount = product.price * (product.badgeContent / 100);
    const finalPrice = product.price - discountAmount;

    // --- Render Teks & Informasi Komponen ---
    const activePageBreadcrumb = document.querySelector('.active-page') || document.querySelector('main section ul li:last-child a');
    if (activePageBreadcrumb) activePageBreadcrumb.textContent = product.cartNameContent;

    const badgeDiscount = document.querySelector('.badge-discount') || (mainImg ? mainImg.previousElementSibling : null);
    if (badgeDiscount) badgeDiscount.textContent = `-${product.badgeContent}%`;

    const productMeta = document.querySelector('.product-meta') || document.querySelector('.text-gray-400.uppercase');
    if (productMeta) productMeta.innerHTML = `${product.cartJenisContent} &bull; Kategori`;

    const productTitle = document.querySelector('.product-title') || document.querySelector('h1');
    if (productTitle) productTitle.textContent = product.cartNameContent;

    const rateTxt = document.querySelector('.rate') || document.querySelector('.font-bold.text-gray-800');
    if (rateTxt) rateTxt.textContent = product.rateContent;

    const reviewTxt = document.querySelector('.review') || document.querySelector('.text-gray-400');
    if (reviewTxt) reviewTxt.textContent = `(${product.reviewContent} Ulasan)`;

    // --- Render Harga Setelah Terhitung Diskon ---
    const mainPriceElement = document.querySelector('.main-price') || document.querySelector('.text-3xl.font-black.text-blue-600');
    if (mainPriceElement) mainPriceElement.textContent = `Rp ${finalPrice.toLocaleString('id-ID')}`;

    const strikePriceElement = document.querySelector('.strike-price') || document.querySelector('.line-through');
    if (strikePriceElement) strikePriceElement.textContent = `Rp ${product.price.toLocaleString('id-ID')}`;

    const badgeSaveElement = document.querySelector('.badge-save') || document.querySelector('.bg-red-100.text-red-700');
    if (badgeSaveElement) badgeSaveElement.textContent = `Hemat ${product.badgeContent}%`;

    const savingTextElement = document.querySelector('.saving-text') || document.querySelector('.text-green-600.mt-1');
    if (savingTextElement) savingTextElement.textContent = `Kamu hemat Rp ${discountAmount.toLocaleString('id-ID')}`;
}

const produkTerkait = document.getElementById('terkait-sale-item')

// funcion buat elemen dan memberikan kelas
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
        const varBaru = arrayObj.filter(item => arr.includes(item.id));
        return varBaru

    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }

}


async function main() {


    initQuantityCounter();
    initColorVariants();
    initTabsSystem();

    const product = getProductFromStorage();
    if (!product) return; 

    const mainImg = document.getElementById('main-product-image');

    renderProductGallery(product, mainImg);
    renderProductDetails(product, mainImg);

    const dataCartFlash = await imporData([1,2,3,4])

    dataCartFlash.forEach((dataCart) => {
        const createCart = itemCart(dataCart)
        produkTerkait.append(createCart)
        createCart.addEventListener('click', () => {
            window.localStorage.setItem('selectedProduct', JSON.stringify(dataCart));
            window.location.href = 'detail-page.html';
        });
    })

}

// Daftarkan fungsi Main agar dieksekusi saat struktur HTML selesai dimuat (DOM Ready)
document.addEventListener('DOMContentLoaded', main);