define(function (require) {
    const $ = require('jquery')
    const headerFooter = require('headerFooter')

    //FUNGSI HELPER & VALIDASI DATA
    function ambilDataOrderFinal() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        if (!isLoggedIn || !currentUser) {
            alert("Sesi Anda telah berakhir. Silakan login kembali.");
            window.location.href = "/auth/login.html";
            return null;
        }

        // Ambil data kumulatif dari step 2
        const finalData = JSON.parse(localStorage.getItem("orderFinal"));
        if (!finalData) {
            alert("Data konfirmasi pesanan tidak ditemukan. Kembali ke menu utama.");
            window.location.href = "/main/cart.html";
            return null;
        }

        return finalData;
    }

    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(angka);
    }

    //FUNGSI tampilan data penerima
    function renderDetailKonfirmasi() {
        const data = ambilDataOrderFinal();
        if (!data) return;

        //Render Alamat & Penerima
        const elNamePhone = document.getElementById("confirm-customer-name-phone");
        const elAddress = document.getElementById("confirm-address-detail");

        if (elNamePhone) {
            elNamePhone.textContent = `${data.customerShipping.fullName} · ${data.customerShipping.noHp}`;
        }
        if (elAddress) {
            const c = data.customerShipping;
            elAddress.textContent = `${c.alamatLengkap}, ${c.kota}, ${c.provinsi} ${c.kodePos} (Catatan: ${c.catatan})`;
        }

        //Render Kurir & Metode Pembayaran
        const elShipping = document.getElementById("confirm-shipping-method");
        const elPayment = document.getElementById("confirm-payment-method");

        if (elShipping) elShipping.textContent = `Pengiriman: ${data.customerShipping.metodePengiriman}`;
        if (elPayment) elPayment.textContent = `Metode Pembayaran: ${data.metodePembayaranTerpilih}`;

        //Render List Produk di Sisi Kiri
        const productContainer = document.getElementById("confirm-products-container");
        if (productContainer) {
            // Hapus elemen dummy statis lama kecuali tag h5
            const oldItems = productContainer.querySelectorAll(".product-confirm");
            oldItems.forEach(el => el.remove());

            data.items.forEach(item => {
                const divConfirm = document.createElement("div");
                divConfirm.className = "flex product-confirm";
                divConfirm.style.display = "flex";
                divConfirm.style.alignItems = "center";
                divConfirm.style.gap = "12px";
                divConfirm.style.marginBottom = "12px";

                divConfirm.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:48px; height:48px; object-fit:cover; border-radius:6px;">
                <div class="product-confirm-info" style="flex:1;">
                    <h4 style="margin:0; font-size:14px; font-weight:500;">${item.name}</h4>
                    <p style="margin:0; font-size:12px; color:#64748b;">Variant: ${item.variant || "-"} (x${item.quantity})</p>
                </div>
                <span class="product-mini-qty total-price font-14" style="font-weight:500;">${formatRupiah(item.price * item.quantity)}</span>
            `;
                productContainer.appendChild(divConfirm);
            });
        }

        //Update Teks Tombol Utama "Bayar Rp XXX Sekarang"
        const btnPaymentText = document.querySelector(".btn-payment");
        if (btnPaymentText) {
            btnPaymentText.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Bayar ${formatRupiah(data.totalPembayaran)} Sekarang
        `;
        }
    }

    //FUNGSI Ringkasan pesanan
    function renderRingkasanPesananKanan() {
        const data = ambilDataOrderFinal();
        if (!data) return;

        const summaryCard = document.querySelector(".summary-card");
        const containerTotalHarga = document.querySelector(".container-total-harga");
        if (!summaryCard || !containerTotalHarga) return;

        // Bersihkan placeholder statis
        const oldMiniProducts = document.querySelectorAll(".summary-card .product-mini");
        oldMiniProducts.forEach(el => el.remove());

        data.items.forEach((item) => {
            const productMini = document.createElement("div");
            productMini.className = "product-mini";
            productMini.style.display = "flex";
            productMini.style.gap = "12px";
            productMini.style.marginBottom = "16px";
            productMini.style.alignItems = "center";

            productMini.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:48px; height:48px; object-fit:cover; border-radius:6px;">
            <div class="product-mini-info" style="flex:1;">
                <h4 style="margin:0; font-size:14px; font-weight:500;">${item.name}</h4>
                <p style="margin:0; font-size:12px; color:#94a3b8;">${item.variant || "-"}</p>
            </div>
            <span style="font-size:14px; color:#64748b;">×${item.quantity}</span>
        `;
            summaryCard.insertBefore(productMini, containerTotalHarga);
        });

        const subtotalLabel = document.querySelector(".summary-line:nth-child(1) span:last-child");
        const totalLabel = document.querySelector(".summary-line.total .total-price");

        if (subtotalLabel) subtotalLabel.textContent = formatRupiah(data.totalPembayaran);
        if (totalLabel) totalLabel.textContent = formatRupiah(data.totalPembayaran);
    }

    //ACTION tombol submit dan back
    function handleFinalPay() {
        const data = ambilDataOrderFinal();
        if (!data) return;

        const konfirmasi = confirm("Konfirmasi akhir: Apakah Anda yakin ingin memproses pembayaran ini sekarang?");
        if (!konfirmasi) return;

        // Tambahkan id transaksi unik dan penanda waktu sukses
        data.idTransaksi = "TRX-" + Math.floor(100000 + Math.random() * 900000);
        data.waktuSelesai = new Date().toISOString();

        // Timpa key 'orderFinal' dengan data yang sudah terbit ID Transaksinya
        localStorage.setItem("orderFinal", JSON.stringify(data));

        alert("Transaksi Berhasil! Pesanan Anda sedang diproses.");


        window.location.href = "success.html";
    }

    function handleBackButton() {
        window.location.href = "step-2.html";
    }

    //INISIALISASI UTAMA
    function checkoutThree() {
        renderDetailKonfirmasi();
        renderRingkasanPesananKanan();

        // Handler Tombol Bayar Sekarang
        const btnPay = document.querySelector(".btn-payment");
        if (btnPay) {
            btnPay.addEventListener("click", handleFinalPay);
        }

        // Handler Tombol Kembali ke Step 2
        const btnBack = document.querySelector(".btn-back-checkout");
        if (btnBack) {
            btnBack.addEventListener("click", handleBackButton);
        }
    }

    checkoutThree()

})