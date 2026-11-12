// Set the date we're counting down to: November 26, 2026, 18:00:00 (6 PM)
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
}, 1000);

// --- الأوتو سكرول الثابت والناعم ---
let isAutoScrolling = false;

function startSmoothAutoScroll() {
    isAutoScrolling = true;
    const scrollSpeed = 0.5; // سرعة النزول

    function step() {
        if (!isAutoScrolling) return;

        window.scrollBy(0, scrollSpeed);

        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.clientHeight, document.documentElement.clientHeight
        );
        const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = scrollHeight - window.innerHeight;

        if (currentScroll >= maxScroll - 2) {
            isAutoScrolling = false;
            return;
        }

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// إيقاف النزول فوراً لو الضيف لمس الشاشة أو حرك الماوس
['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(event => {
    window.addEventListener(event, () => {
        isAutoScrolling = false;
    }, { passive: true });
});
function openInvitation() {
    const overlay = document.getElementById('envelopeOverlay');
    const video = document.getElementById('envelopeVideo');
    const song = document.getElementById('weddingSong');
    
    const promptBtn = document.querySelector('.envelope-center-prompt');
    if (promptBtn) promptBtn.style.display = 'none';
    
    if (song) {
        song.play().catch(error => console.log("Audio play error:", error));
    }
    
    if (video) {
        video.play().catch(error => console.log("Video play error:", error));
        
        video.onended = function() {
            window.scrollTo(0, 0); // يضمن إن الدعوة تبدأ من أول سطر فوق
            if (overlay) overlay.classList.add('hide-envelope');
            
            setTimeout(() => {
                startSmoothAutoScroll();
            }, 1000);
        };
    } else {
        window.scrollTo(0, 0);
        if (overlay) overlay.classList.add('hide-envelope');
        setTimeout(() => {
            startSmoothAutoScroll();
        }, 1000);
    }
}