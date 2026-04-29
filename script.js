document.addEventListener('DOMContentLoaded', () => {
    console.log('Website Tiket Bus Online Dimuat');
    
    // Logika sederhana untuk form submit agar transisi antar halaman terasa hidup
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah reload
            const actionName = form.getAttribute('data-action');
            const targetPage = form.getAttribute('action');
            
            if(actionName && targetPage) {
                alert(`Memproses ${actionName}... Berhasil!`);
                window.location.href = targetPage;
            }
        });
    });
});