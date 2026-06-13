define(function (require) {
    const $ = require('jquery')
    const headerFooter = require('headerFooter')

    //FUNGSI HELPER & VALIDASI
    function ambilDataOrderConfirmation() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        if (!isLoggedIn || !currentUser) {
            alert("Sesi Anda telah berakhir. Silakan login kembali.");
            window.location.href = "/auth/login.html";
            return null;
        }

        const orderData = JSON.parse(localStorage.getItem("orderConfirmation"));
        if (!orderData) {
            alert("Data pesanan tidak ditemukan. Kembali ke data pengiriman.");
            window.location.href = "step-1.html";
            return null;
        }

        return orderData;
    }

    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(angka);
    }


    //FUNGSI Reload data pesanan
    function renderRingkasanPembayaran() {
        const orderData = ambilDataOrderConfirmation();
        if (!orderData) return;

        const summaryCard = document.querySelector(".summary-card");
        const containerTotalHarga = document.querySelector(".container-total-harga");

        if (!summaryCard || !containerTotalHarga) return;

        // Bersihkan produk lama bawaan HTML statis
        const oldMiniProducts = document.querySelectorAll(".product-mini");
        oldMiniProducts.forEach(el => el.remove());

        orderData.items.forEach((item) => {
            const productMini = document.createElement("div");
            productMini.className = "product-mini";
            productMini.style.display = "flex";
            productMini.style.gap = "12px";
            productMini.style.marginBottom = "16px";
            productMini.style.alignItems = "center";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.style.width = "48px";
            img.style.height = "48px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "6px";

            const infoDiv = document.createElement("div");
            infoDiv.className = "product-mini-info";
            infoDiv.style.flex = "1";

            const title = document.createElement("h4");
            title.style.margin = "0";
            title.style.fontSize = "14px";
            title.style.fontWeight = "500";
            title.textContent = item.name;

            const variant = document.createElement("p");
            variant.style.margin = "0";
            variant.style.fontSize = "12px";
            variant.style.color = "#94a3b8";
            variant.textContent = item.variant || "-";

            infoDiv.appendChild(title);
            infoDiv.appendChild(variant);

            const qtySpan = document.createElement("span");
            qtySpan.style.fontSize = "14px";
            qtySpan.style.color = "#64748b";
            qtySpan.textContent = `×${item.quantity}`;

            productMini.appendChild(img);
            productMini.appendChild(infoDiv);
            productMini.appendChild(qtySpan);

            summaryCard.insertBefore(productMini, containerTotalHarga);
        });

        const subtotalLabel = document.querySelector(".summary-line:nth-child(1) span:last-child");
        const totalLabel = document.querySelector(".summary-line.total .total-price");

        if (subtotalLabel) subtotalLabel.textContent = formatRupiah(orderData.totalPembayaran);
        if (totalLabel) totalLabel.textContent = formatRupiah(orderData.totalPembayaran);
    }


    //Interaksi pilih metode pembayaran
    function initTogglePayment() {
        const semuaRadioPayment = document.querySelectorAll('input[name="payment"]');

        semuaRadioPayment.forEach((radio) => {
            // Ambil teks dari tag <p> di dalam label untuk dijadikan value radio secara dinamis
            const labelContainer = radio.closest(".payment-item");
            if (labelContainer) {
                const paymentText = labelContainer.querySelector("p").textContent.trim();
                radio.value = paymentText;
            }

            // Jalankan event listener ketika user mengubah pilihan radio
            radio.addEventListener("change", function () {
                semuaRadioPayment.forEach((r) => {
                    const container = r.closest(".payment-item");
                    if (container) {
                        container.classList.remove("active"); // Hapus semua kelas active
                    }
                });

                if (this.checked) {
                    const containerTerpilih = this.closest(".payment-item");
                    if (containerTerpilih) {
                        containerTerpilih.classList.add("active"); // Tambahkan ke yang terpilih saja
                    }
                }
            });
        });
    }

    //tombol submit dan tombol back
    function handleFormSubmit(event) {
        // Mencegah halaman reload otomatis khas form HTML
        event.preventDefault();

        const orderData = ambilDataOrderConfirmation();
        if (!orderData) return;

        // Ambil data pembayaran langsung menggunakan FormData (lebih ringkas dan modern)
        const formData = new FormData(event.target);
        const paymentTerpilih = formData.get("payment");

        if (!paymentTerpilih) {
            alert("Silakan pilih salah satu metode pembayaran.");
            return;
        }

        const konfirmasi = confirm(`Anda memilih metode: ${paymentTerpilih}.\nLanjutkan ke proses penyelesaian pesanan?`);
        if (!konfirmasi) return;

        // Satukan data metode pembayaran ke objek utama
        orderData.metodePembayaranTerpilih = paymentTerpilih;
        orderData.statusPembayaran = "Success";

        // Simpan hasil final ke localStorage baru
        localStorage.setItem("orderFinal", JSON.stringify(orderData));

        alert("Pembayaran berhasil divalidasi! Mengalihkan Anda ke halaman Konfirmasi Akhir...");
        window.location.href = "step-3.html";
    }

    function handleBackButton() {
        window.location.href = "step-1.html";
    }

    //INISIALISASI SELESAI DIMUAT
    function checkoutTwo() {
        renderRingkasanPembayaran();
        initTogglePayment();

        // Pasang handler submit langsung pada form .checkout-left
        const formCheckout = document.querySelector(".checkout-left");
        if (formCheckout) {
            formCheckout.addEventListener("submit", handleFormSubmit);
        }

        // Tombol kembali tetap menggunakan click listener karena type="button"
        const btnBack = document.querySelector(".btn-back-checkout");
        if (btnBack) {
            btnBack.addEventListener("click", handleBackButton);
        }
    }

    checkoutTwo()

})