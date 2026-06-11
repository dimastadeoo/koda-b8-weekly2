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

    const clasButtonWhislist = 'btn-whislist-item absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center shadow-sm cursor-pointer z-10 transition-all duration-300 group'
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

        if (!arr || !Array.isArray(arr) || arr.length === 0) {
            return arrayObj;
        }

        const arrayObj = await response.json();
        const varBaru = arrayObj.filter(item => arr.includes(item.id));
        return varBaru

    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }

}

function toggleWishlist(){
    const btnWhislist = document.querySelectorAll('.btn-whislist-item');

    btnWhislist.forEach((tombol) => {
        tombol.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            this.classList.toggle('active');
        });
    });
}


//FUNGSI AMBIL DATA (KONSEP HELPER UNTUK LOCAL STORAGE)

function ambilDataKeranjang() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) return [];

    const semuaIsiKeranjang = JSON.parse(localStorage.getItem("cartItems")) || [];

    return semuaIsiKeranjang.filter(item => item.userEmail === currentUser.email);
}

function simpanDataCheckout(data) {
    localStorage.setItem("checkoutItems", JSON.stringify(data));
}

function hapusDataKeranjang() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) return;
    const semuaIsiKeranjang = JSON.parse(localStorage.getItem("cartItems")) || [];
    const keranjangUserLain = semuaIsiKeranjang.filter(item => item.userEmail !== currentUser.email);

    localStorage.setItem("cartItems", JSON.stringify(keranjangUserLain));
}

// FUNGSI FORMAT MATA UANG (RUPIAH)

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

//FUNGSI UNTUK MENGHITUNG & UPDATE RINGKASAN PESANAN 

function hitungDanRenderRingkasan(daftarItem) {
    const totalLabel = document.getElementById("total-price");
    const subtotalLabel = document.getElementById("sub-total-price");
    const qtyArr = document.getElementById('qty-produk-cart')


    // Hitung total harga: harga * kuantitas
    const totalHarga = daftarItem.reduce((total, item) => total + (item.price * item.quantity), 0);
    const hargaTersusun = formatRupiah(totalHarga);

    const qty = daftarItem.length

    // Suntikkan teks ke elemen Ringkasan Pesanan di kanan
    qtyArr.innerText = `Subtotal (${qty} item)`
    subtotalLabel.innerText = hargaTersusun;
    totalLabel.innerText = hargaTersusun;
}


//FUNGSI UTAMA UNTUK MENAMPILKAN BARANG (MENGGUNAKAN CREATEELEMENT)

function renderHalamanKeranjang() {
    const containerProduk = document.getElementById("product-list-container");
    const btnCheckout = document.getElementById("btn-checkout");
    
    let cartItems = ambilDataKeranjang();

    // Pastikan kontainer bersih sebelum diisi
    containerProduk.innerHTML = "";

    // Jika keranjang kosong
    if (cartItems.length === 0) {
        const emptyCard = document.createElement("div");
        emptyCard.className = "bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center w-full";
        
        const emptyText = document.createElement("p");
        emptyText.className = "text-slate-500 font-medium";
        emptyText.textContent = "Keranjang belanjaanmu kosong nih. Yuk belanja dulu!";
        
        emptyCard.appendChild(emptyText);
        containerProduk.appendChild(emptyCard);

        if (btnCheckout) btnCheckout.disabled = true;
        hitungDanRenderRingkasan([]);
        return;
    }

    // Lakukan looping data untuk membuat element secara dinamis
    cartItems.forEach((item) => {
        // Membuat Card Utama (Wrapper)
        const card = document.createElement("div");
        card.className = "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center relative w-full";
        card.setAttribute("data-id", item.id);

        // Membuat Foto Produk
        const img = document.createElement("img");
        img.className = "w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-amber-100 flex-shrink-0";
        img.src = item.image;
        img.alt = item.name;

        // Membuat Wrapper Detail Produk (Tengah)
        const detailsWrapper = document.createElement("div");
        detailsWrapper.className = "flex-1 space-y-1";

        const title = document.createElement("h3");
        title.className = "text-base font-semibold sm:text-lg pr-8";
        title.textContent = item.name;

        const variant = document.createElement("p");
        variant.className = "text-xs text-slate-400 font-medium";
        variant.textContent = item.variant;

        // --- Bagian Kontrol Kuantitas ---
        const qtyWrapper = document.createElement("div");
        qtyWrapper.className = "flex items-center gap-3 pt-2";

        const qtyControl = document.createElement("div");
        qtyControl.className = "flex items-center border border-slate-200 rounded-full px-2 py-1 bg-slate-50";

        const btnMinus = document.createElement("button");
        btnMinus.className = "w-7 h-7 flex items-center justify-center font-bold text-slate-500 hover:text-slate-800 transition-colors";
        btnMinus.textContent = "-";

        const qtyNum = document.createElement("span");
        qtyNum.className = "w-8 text-center text-sm font-semibold";
        qtyNum.textContent = item.quantity;

        const btnPlus = document.createElement("button");
        btnPlus.className = "w-7 h-7 flex items-center justify-center font-bold text-slate-500 hover:text-slate-800 transition-colors";
        btnPlus.textContent = "+";

        qtyControl.appendChild(btnMinus);
        qtyControl.appendChild(qtyNum);
        qtyControl.appendChild(btnPlus);
        qtyWrapper.appendChild(qtyControl);

        // Gabungkan elemen tengah ke dalam detail wrapper
        detailsWrapper.appendChild(title);
        detailsWrapper.appendChild(variant);
        detailsWrapper.appendChild(qtyWrapper);


        // Membuat Wrapper Aksi & Harga (Kanan)
        const actionWrapper = document.createElement("div");
        actionWrapper.className = "w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end sm:self-stretch gap-4 pt-4 sm:pt-0 border-t sm:border-none border-slate-100";

        // Tombol Hapus SVG Lucide Trash
        const btnDelete = document.createElement("button");
        btnDelete.className = "sm:absolute sm:top-5 sm:right-5 p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-all";
        
        // Membentuk SVG
        const svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
        btnDelete.innerHTML = svgHTML;

        const price = document.createElement("p");
        price.className = "text-lg font-bold text-blue-600 sm:mt-auto";
        price.textContent = formatRupiah(item.price);

        // Gabungkan elemen kanan ke dalam action wrapper
        actionWrapper.appendChild(btnDelete);
        actionWrapper.appendChild(price);


        // MERAKIT SEMUA KE CARD UTAMA
        card.appendChild(img);
        card.appendChild(detailsWrapper);
        card.appendChild(actionWrapper);

        //MASUKKAN CARD KE DALAM CONTAINER UTAMA DI SCREEN HTML
        containerProduk.appendChild(card);
    });

    // Jalankan kalkulasi harga total di kanan layar
    hitungDanRenderRingkasan(cartItems);
}

// ========================================================
// 5. FUNGSI AKSI PROSES CHECKOUT
// ========================================================
function eksekusiCheckout() {
    const konfirmasi = confirm("Yakin Proses Pesanan");

    if (konfirmasi === false){
        return
    }
    let daftarBelanjaan = ambilDataKeranjang();

    // Validasi pastikan ada barang sebelum checkout
    if (daftarBelanjaan.length === 0) {
        alert("Gagal: Tidak ada produk di dalam keranjang untuk di-checkout!");
        return;
    }

    // Pindahkan data ke Local Storage baru
    simpanDataCheckout(daftarBelanjaan);

    // Kosongkan keranjang belanja utama
    hapusDataKeranjang();

    alert("Checkout Berhasil! Pesanan Anda sedang diproses.");

    location.href = '/checkout/step-1.html'
}



async function main() {
    const loveItem = document.getElementById('love-sale-item')
    const dataCartlove = await imporData([1,2,3,4])
    dataCartlove.forEach((dataCart) => {
        const createCart = itemCart(dataCart)
        loveItem.append(createCart)
        createCart.addEventListener('click', () => {
            window.localStorage.setItem('selectedProduct', JSON.stringify(dataCart));
            window.location.href = 'detail-page.html';
        });
    })

    toggleWishlist()

        // Jalankan fungsi tampilkan barang utama
    renderHalamanKeranjang();

    // Pasang fungsi klik pada tombol checkout
    const btnCheckout = document.getElementById("btn-checkout");
    if (btnCheckout) {
        btnCheckout.addEventListener("click", eksekusiCheckout);
    }
    
}

main()