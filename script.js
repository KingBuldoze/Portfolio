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

// --- Enhanced Dynamic Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('section > div, .glass-panel, .relative.pl-10');

revealElements.forEach((sec, index) => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(60px) scale(0.98)';
    
    // Create staggered transition effect
    sec.style.transition = `opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`;
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        } else {
            // Revert the animation state when the element leaves the viewport
            // This ensures the animation happens every time you scroll past it
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(60px) scale(0.98)';
        }
    });
}, { 
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px' 
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Hero Interactive Image 3D Effect ---
const heroImgCard = document.getElementById('hero-interactive-image');

if (heroImgCard) {
    heroImgCard.addEventListener('mousemove', (e) => {
        const rect = heroImgCard.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        heroImgCard.style.transition = 'none';
        heroImgCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        const img = heroImgCard.querySelector('img');
        if (img) {
            img.style.transition = 'none';
            img.style.transform = `translateZ(60px)`;
        }
    });

    heroImgCard.addEventListener('mouseleave', () => {
        heroImgCard.style.transition = 'transform 0.5s ease-out';
        heroImgCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        
        const img = heroImgCard.querySelector('img');
        if (img) {
            img.style.transition = 'transform 0.5s ease-out';
            img.style.transform = `translateZ(40px)`;
        }
    });
}
