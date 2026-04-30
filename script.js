// script.js

// Konstanta Harga
const HARGA_PER_TIKET = 250000;

// Logika Halaman Login
function handleLogin(event) {
    event.preventDefault();
    const role = document.getElementById('role').value;
    
    if (role === 'admin') {
        window.location.href = 'dashboard-admin.html';
    } else {
        window.location.href = 'dashboard-user.html';
    }
}

// Logika Halaman Dashboard User (Pemesanan)
function calculateTotal() {
    const seatsInput = document.getElementById('seats');
    if (!seatsInput) return; // Skip jika bukan di halaman user

    let seats = parseInt(seatsInput.value) || 0;
    if (seats < 0) {
        seats = 0;
        seatsInput.value = 0;
    }

    const total = seats * HARGA_PER_TIKET;
    document.getElementById('totalPrice').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function processBooking(event) {
    event.preventDefault();
    const asal = document.getElementById('asal').value;
    const tujuan = document.getElementById('tujuan').value;
    const jadwal = document.getElementById('jadwal').value;
    const seats = document.getElementById('seats').value;
    
    if(asal === tujuan) {
        alert("Kota asal dan tujuan tidak boleh sama!");
        return;
    }

    const total = seats * HARGA_PER_TIKET;

    // Simpan data ke LocalStorage sesuai desain Tech Stack di blueprint
    const bookingData = { asal, tujuan, jadwal, seats, total };
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    window.location.href = 'payment.html';
}

// Logika Halaman Payment
function loadPaymentDetails() {
    const paymentDetailsDiv = document.getElementById('payment-details');
    if (!paymentDetailsDiv) return; // Skip jika bukan di halaman payment

    const bookingData = JSON.parse(localStorage.getItem('currentBooking'));
    
    if (!bookingData) {
        paymentDetailsDiv.innerHTML = '<p class="text-red-500">Tidak ada pesanan ditemukan. Silakan pesan tiket terlebih dahulu.</p>';
        return;
    }

    document.getElementById('pay-asal-tujuan').innerText = `${bookingData.asal} ➔ ${bookingData.tujuan}`;
    document.getElementById('pay-jadwal').innerText = bookingData.jadwal;
    document.getElementById('pay-seats').innerText = `${bookingData.seats} Kursi`;
    document.getElementById('pay-total').innerText = 'Rp ' + bookingData.total.toLocaleString('id-ID');
}

// Logika Preview Upload Bukti Bayar
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
        const output = document.getElementById('image-preview');
        output.src = reader.result;
        output.classList.remove('hidden');
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Jalankan fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadPaymentDetails();
});