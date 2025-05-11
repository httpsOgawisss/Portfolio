// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only enable custom cursor on non-touch devices
    if (!('ontouchstart' in window)) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            // Add a slight delay to the cursor outline for a smooth effect
            setTimeout(() => {
                cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-icon, .skill-tag, input, textarea, .filter-btn, .dot');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursor.style.opacity = '0.5';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursor.style.opacity = '1';
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursor.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
        
        // Back to top button visibility
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter-text');
    const typewriterCursor = document.querySelector('.typewriter-cursor');
    
    if (typewriterText) {
        const words = ['Web Developer', 'Software Engineer', 'UI/UX Designer', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentWord = words[wordIndex];
            const speed = isDeleting ? 30 : 100;
            
            if (!isDeleting && charIndex <= currentWord.length) {
                typewriterText.textContent = currentWord.substring(0, charIndex);
                charIndex++;
            }
            
            if (isDeleting && charIndex >= 0) {
                typewriterText.textContent = currentWord.substring(0, charIndex);
                charIndex--;
            }
            
            if (charIndex === currentWord.length + 1) {
                isEnd = true;
                isDeleting = true;
                setTimeout(function() {
                    type();
                }, 2000);
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            if (!isEnd) setTimeout(type, speed);
        }
        
        type();
    }
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialTrack) {
        let currentIndex = 0;
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            updateSlider();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            updateSlider();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Auto slide
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            updateSlider();
        }, 5000);
        
        // Pause auto slide on hover
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                updateSlider();
            }, 5000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a stat number, animate the counter
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Add animation class to elements
                entry.target.classList.add('animate');
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const formStatus = document.querySelector('.form-status');
            
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill in all fields';
                formStatus.style.color = '#ff4d4d';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address';
                formStatus.style.color = '#ff4d4d';
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.style.color = 'var(--primary-color)';
                contactForm.reset();
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        if (typeof particlesJS !== 'undefined' && particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#00ff88"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00ff88",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 3
                        }
                    }
                },
                retina_detect: true
            });
        } else {
            console.error('particlesJS is not defined. Make sure the particles.js library is included.');
        }
    }
});
