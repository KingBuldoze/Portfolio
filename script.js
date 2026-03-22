// --- 3D Interactive Mouse Tilt Effect ---
const tiltCards = document.querySelectorAll('.glass-panel, .aspect-video');

tiltCards.forEach(card => {
    card.style.transition = 'transform 0.1s ease-out';
    card.style.transformStyle = 'preserve-3d';
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const children = card.querySelectorAll('h3, img, p, button, .material-symbols-outlined');
        children.forEach(child => {
            child.style.transition = 'transform 0.1s ease-out';
            if(child.tagName.toLowerCase() === 'img') {
                child.style.transform = 'translateZ(30px) scale(0.95)';
            } else {
                child.style.transform = 'translateZ(50px)';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        const children = card.querySelectorAll('h3, img, p, button, .material-symbols-outlined');
        children.forEach(child => {
            if(child.tagName.toLowerCase() === 'img') {
                child.style.transform = 'translateZ(0px) scale(1)';
            } else {
                child.style.transform = 'translateZ(0px)';
            }
        });
    });
});

// --- Scroll Reveal Animations ---
const sections = document.querySelectorAll('section > div');
sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(50px)';
    sec.style.transition = 'all 0.8s ease-out';
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(el => revealObserver.observe(el));
