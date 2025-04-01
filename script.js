document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Roadmap timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineInView() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            // Add a delay based on the index
            if (isInView) {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 200);
            }
        });
    }
    
    // Initial check
    checkTimelineInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimelineInView);

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth scroll and active link handling
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

    // Add smooth scroll behavior
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active link on scroll
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
            if (currentSection === '' && link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);

    // Initialize dot grid
    const canvas = document.getElementById('dotGrid');
    const ctx = canvas.getContext('2d');
    let frame = 0;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function drawDotGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const dotSize = 1;
        const spacing = 25;
        const offset = spacing / 2;
        
        ctx.fillStyle = 'rgba(109, 247, 194, 0.3)';

        for (let x = offset; x < canvas.width; x += spacing) {
            for (let y = offset; y < canvas.height; y += spacing) {
                ctx.beginPath();
                ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function animateDots() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const dotSize = 1;
        const spacing = 25;
        const offset = spacing / 2;
        
        for (let x = offset; x < canvas.width; x += spacing) {
            for (let y = offset; y < canvas.height; y += spacing) {
                const wave = Math.sin(frame / 50 + (x + y) / 50) * 1.5;
                
                ctx.fillStyle = `rgba(109, 247, 194, ${0.2 + Math.abs(wave) * 0.15})`;
                ctx.beginPath();
                ctx.arc(x, y + wave, dotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        requestAnimationFrame(animateDots);
    }

    // Initialize and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateDots();
});