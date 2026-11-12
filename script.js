// Set the date we're counting down to: October 29, 2026, 18:00:00 (6 PM)
const weddingDate = new Date("November 26, 2026 18:00:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<div style='grid-column: span 4; font-size: 1.2rem; font-family: Cormorant Garamond, serif; color: #c5a059;'>The Big Day Has Arrived!</div>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}, 1000);function openInvitation() {
    const overlay = document.getElementById('envelopeOverlay');
    const video = document.getElementById('envelopeVideo');
    const song = document.getElementById('weddingSong');
    
    // إخفاء الزرار فور الضغط عليه
    document.querySelector('.envelope-center-prompt').style.display = 'none';
    
    // 1. تشغيل الأغنية الخلفية فوراً (مسموحة لأنها جاءت بعد تفاعل المستخدم مباشرة)
    song.play().catch(error => {
        console.log("Audio play error:", error);
    });
    
    // 2. تشغيل فيديو الزرف
    video.play().catch(error => {
        console.log("Video play error:", error);
    });
    
    // 3. أول ما فيديو الزرف يخلص، يختفي الغلاف وتظهر الدعوة وتظل الأغنية شغالـة
    video.onended = function() {
        overlay.classList.add('hide-envelope');
    };
}