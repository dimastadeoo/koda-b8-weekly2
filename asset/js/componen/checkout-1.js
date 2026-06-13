define(function (require) {
    const $ = require('jquery')
    const headerFooter = require('headerFooter')

    // FUNGSI HELPER AMBIL DATA & FORMATTING
    function ambilDataCheckout() {
        // Ambil user yang sedang login dari sessionStorage
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

        // Validasi awal: Apakah user sudah login?
        if (!isLoggedIn || !currentUser) {
            alert("Silakan login terlebih dahulu untuk melanjutkan checkout.");
            window.location.href = "/auth/login.html"; // Sesuaikan dengan path login kamu
            return [];
        }

        const semuaItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

        // FILTER LOGIC: Hanya ambil item yang memiliki userEmail sama dengan email user yang sedang login
        return semuaItems.filter(item => item.userEmail === currentUser.email);
    }

    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(angka);
    }

    // FUNGSI UTAMA RENDER PRODUK DI RINGKASAN PESANAN
    function renderRingkasanBelanja() {
        const summaryCard = document.querySelector(".summary-card");
        const containerTotalHarga = document.querySelector(".container-total-harga");

        let checkoutItems = ambilDataCheckout();

        // Jika checkoutItems kosong (atau user belum login sehingga return []), hentikan eksekusi
        if (checkoutItems.length === 0) {
            alert("Data checkout tidak ditemukan atau kosong. Silakan kembali ke keranjang.");
            window.location.href = "/main/cart.html";
            return;
        }

        // Hapus semua elemen mini-product bawaan HTML statis terlebih dahulu
        const oldMiniProducts = document.querySelectorAll(".product-mini");
        oldMiniProducts.forEach(el => el.remove());

        let totalHarga = 0;

        // Lakukan looping data dari localStorage menggunakan createElement
        checkoutItems.forEach((item) => {
            totalHarga += (item.price * item.quantity);

            // Buat komponen wrapper .product-mini
            const productMini = document.createElement("div");
            productMini.className = "product-mini";
            productMini.style.display = "flex";
            productMini.style.gap = "12px";
            productMini.style.marginBottom = "16px";
            productMini.style.alignItems = "center";

            // Foto mini produk
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.className = "w-12 h-12 object-cover rounded-md bg-slate-100";
            img.style.width = "48px";
            img.style.height = "48px";

            // Info teks produk
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
            variant.textContent = item.variant || "-"; // Jaga-jaga jika variant kosong

            infoDiv.appendChild(title);
            infoDiv.appendChild(variant);

            // Kuantitas produk (X1, X2, dll)
            const qtySpan = document.createElement("span");
            qtySpan.className = "product-mini-qty";
            qtySpan.style.fontSize = "14px";
            qtySpan.style.color = "#64748b";
            qtySpan.textContent = `×${item.quantity}`;

            // Rakit bagian produk mini
            productMini.appendChild(img);
            productMini.appendChild(infoDiv);
            productMini.appendChild(qtySpan);

            // Sisipkan produk mini tepat sebelum bagian total harga di dalam card
            if (summaryCard && containerTotalHarga) {
                summaryCard.insertBefore(productMini, containerTotalHarga);
            }
        });

        // Update nominal teks subtotal & total harga di UI HTML
        const subtotalLabel = document.querySelector(".summary-line:nth-child(1) span:last-child");
        const totalLabel = document.querySelector(".summary-line.total span:last-child");

        if (subtotalLabel) subtotalLabel.textContent = formatRupiah(totalHarga);
        if (totalLabel) totalLabel.textContent = formatRupiah(totalHarga);
    }

    // FUNGSI ketika klik checkout
    function handleFormSubmit(event) {
        event.preventDefault();

        const konfirmasi = confirm("Apakah data alamat Anda sudah benar dan ingin lanjut ke pembayaran?");
        if (!konfirmasi) return;

        // Ambil data produk yang dibeli (sudah otomatis terfilter berdasarkan email user)
        let produkDibelanja = ambilDataCheckout();
        if (produkDibelanja.length === 0) return;

        // Ambil data user aktif untuk pencatatan order
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Kumpulkan semua data inputan dari form DOM
        const shippingMethod = document.querySelector('input[name="shipping"]:checked');
        if (!shippingMethod) {
            alert("Silakan pilih metode pengiriman terlebih dahulu.");
            return;
        }

        const dataForm = {
            fullName: document.getElementById("fullName").value,
            noHp: document.getElementById("noHp").value,
            email: document.getElementById("email").value,
            alamatLengkap: document.getElementById("alamat").value,
            kota: document.getElementById("city").value,
            provinsi: document.getElementById("provinsi").value,
            kodePos: document.getElementById("kodePos").value,
            catatan: document.getElementById("note").value || "-",
            metodePengiriman: shippingMethod.value,
            waktuOrder: new Date().toISOString()
        };

        // Gabungkan data customer, info akun, dan daftar produk belanjaan
        const orderFinalData = {
            userAccount: {
                nama: currentUser.nama,
                email: currentUser.email
            },
            customerShipping: dataForm,
            items: produkDibelanja,
            totalPembayaran: produkDibelanja.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        };

        // Simpan ke localStorage baru untuk tahap konfirmasi final / invoice nanti
        localStorage.setItem("orderConfirmation", JSON.stringify(orderFinalData));

        alert("Data pengiriman berhasil disimpan! Mengalihkan Anda ke halaman pembayaran...");

        // Mengalihkan ke step-2 (Menu Pembayaran)
        window.location.href = "step-2.html";
    }

    // Fungsi untuk mengubah class active pada pilihan shipping
    function toggleShipping() {
        const semuaRadioShipping = document.querySelectorAll('input[name="shipping"]');

        semuaRadioShipping.forEach((radio) => {
            radio.addEventListener("change", function () {
                semuaRadioShipping.forEach((r) => {
                    const labelContainer = r.closest(".shipping-item");
                    if (labelContainer) {
                        labelContainer.classList.remove("active");
                    }
                });
                if (this.checked) {
                    const labelTerpilih = this.closest(".shipping-item");
                    if (labelTerpilih) {
                        labelTerpilih.classList.add("active");
                    }
                }
            });
        });
    }

    // Alias fungsi utama agar terbaca rapi
    function renderHalamanCheckout() {
        renderRingkasanBelanja();
        toggleShipping();

        // Pasang event listener submit pada form alamat di kiri
        const formCheckout = document.querySelector(".checkout-left");
        if (formCheckout) {
            formCheckout.addEventListener("submit", handleFormSubmit);
        }
    }

    // INISIALISASI SAAT HALAMAN SELESAI DIMUAT
    function checkoutOne() {
        renderHalamanCheckout();
    }

    checkoutOne()

})