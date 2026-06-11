
//FUNGSI HELPER
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

//PROSES UTAMA SAAT HALAMAN SELESAI DIMUAT
document.addEventListener("DOMContentLoaded", function () {
    // A. Validasi Sesi Pengguna aktif
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!isLoggedIn || !currentUser) {
        alert("Sesi Anda tidak valid.");
        window.location.href = "/main/login.html";
        return;
    }

    // B. Ambil data transaksi yang baru saja diselesaikan di Step 3
    const orderFinal = JSON.parse(localStorage.getItem("orderFinal"));
    if (!orderFinal) {
        alert("Tidak ada transaksi aktif yang ditemukan.");
        window.location.href = "/main/landing-page.html";
        return;
    }

    // C. Tampilkan Data Secara Dinamis ke HTML
    const elOrderId = document.getElementById("success-order-id");
    const elTotalPrice = document.getElementById("success-total-price");
    const elShippingMethod = document.getElementById("success-shipping-method");
    const elShippingEst = document.getElementById("success-shipping-estimation");
    const elShippingAddress = document.getElementById("success-shipping-address");

    if (elOrderId) elOrderId.textContent = orderFinal.idTransaksi;
    if (elTotalPrice) elTotalPrice.textContent = formatRupiah(orderFinal.totalPembayaran);
    
    if (elShippingMethod) elShippingMethod.textContent = orderFinal.customerShipping.metodePengiriman;
    if (elShippingEst) {
        // Simulasikan estimasi tanggal berdasarkan waktu selesai transaksi + 3 hari
        const tglEstimasi = new Date(orderFinal.waktuSelesai);
        tglEstimasi.setDate(tglEstimasi.getDate() + 3);
        const opsi = { day: 'numeric', month: 'long', year: 'numeric' };
        elShippingEst.textContent = `Estimasi tiba: ${tglEstimasi.toLocaleDateString('id-ID', opsi)}`;
    }
    
    if (elShippingAddress) {
        const c = orderFinal.customerShipping;
        elShippingAddress.textContent = `${c.alamatLengkap}, ${c.kota}, ${c.provinsi} ${c.kodePos}`;
    }

    // D. SIMPAN KE RIWAYAT PESANAN (Histori Pesanan Berdasarkan User)
    // Menggunakan key khusus 'orderHistory' agar aman dari proses pembersihan checkout
    let riwayatSemuaUser = JSON.parse(localStorage.getItem("orderHistory")) || [];
    
    // Masukkan email pemilik ke dalam objek data transaksi sebelum disimpan ke riwayat global
    orderFinal.userEmail = currentUser.email; 
    
    // Masukkan data baru ke antrean riwayat
    riwayatSemuaUser.push(orderFinal);
    localStorage.setItem("orderHistory", JSON.stringify(riwayatSemuaUser));

    // E. BERSIHKAN DATA PROSES CHECKOUT
    localStorage.removeItem("orderConfirmation");
    localStorage.removeItem("orderFinal");

    // F. BERSIHKAN KERANJANG (checkoutItems) KHAS USER INI SAJA
    const semuaIsiKeranjang = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    
    // Filter & Sisakan item milik user LAIN (Menghapus item milik currentUser)
    const keranjangUserLain = semuaIsiKeranjang.filter(item => item.userEmail !== currentUser.email);
    
    // Update kembali database keranjang global dengan isi yang sudah difilter bersih
    localStorage.setItem("checkoutItems", JSON.stringify(keranjangUserLain));

    // G. EVENT LISTENER BUTTON LINKING (OPSIONAL)
    const btnLacak = document.querySelector(".btn-lacak-pesanan");
    const btnRiwayat = document.querySelector(".btn-lihat-riwayat");

    if (btnLacak) {
        btnLacak.addEventListener("click", function () {
            alert(`Resi otomatis sedang disiapkan oleh kurir. ID Pesanan Anda: ${orderFinal.idTransaksi}`);
        });
    }

    if (btnRiwayat) {
        btnRiwayat.addEventListener("click", function () {
            // Arahkan ke halaman riwayat pesanan profil user kamu
            window.location.href = "/profile/my-order.html";
        });
    }
});