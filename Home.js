        // Product Data
        const products = [
            {id: 1, name: "Ankara Maxi Dress", fabric: "Ankara", price: 45000, image: "https://images.unsplash.com/photo-1583391733981-0f6a462d8e95?w=600"},
            {id: 2, name: "Aso Oke Agbada", fabric: "Aso Oke", price: 85000, image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600"},
            {id: 3, name: "Adire Kaftan", fabric: "Adire", price: 55000, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600"},
            {id: 4, name: "Ankara Jumpsuit", fabric: "Ankara", price: 50000, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"},
            {id: 5, name: "Aso Oke Wrapper Set", fabric: "Aso Oke", price: 75000, image: "https://images.unsplash.com/photo-1583391733981-0f6a462d8e95?w=600"},
            {id: 6, name: "Adire Shirt", fabric: "Adire", price: 35000, image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600"}
        ];

        // Testimonials Data
        const testimonials = [
            {name: "Chioma A.", location: "Lagos", rating: 5, text: "Outstanding quality and authentic designs. Inibae Collections perfectly captures the essence of African elegance!"},
            {name: "Tunde O.", location: "Abuja", rating: 5, text: "Perfect blend of tradition and modernity. I wore their Aso Oke to my wedding and received countless compliments."},
            {name: "Maya S.", location: "London", rating: 5, text: "Exceeded all my expectations! The craftsmanship is impeccable and the fabrics are absolutely stunning."}
        ];

        // Cart System
        let cart = [];

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existing = cart.find(item => item.id === productId);
            
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }
            
            updateCartCount();
            showNotification(`${product.name} added to cart!`);
        }

        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = count;
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }

        // Render Products
        function renderProducts() {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="absolute top-4 left-4 bg-deep-green text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        ${product.fabric}
                    </div>
                    <div class="p-4 sm:p-6">
                        <h3 class="text-lg sm:text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-xl sm:text-2xl font-bold text-rust mb-4">₦${product.price.toLocaleString()}</p>
                        <button onclick="addToCart(${product.id})" class="btn-primary w-full">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }

        // Render Testimonials
        function renderTestimonials() {
            const grid = document.getElementById('testimonialsGrid');
            grid.innerHTML = testimonials.map(t => `
                <div class="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                    <div class="text-gold text-xl sm:text-2xl mb-3 sm:mb-4">${'⭐'.repeat(t.rating)}</div>
                    <p class="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">"${t.text}"</p>
                    <p class="font-bold text-sm sm:text-base">- ${t.name}, ${t.location}</p>
                </div>
            `).join('');
        }

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Mobile Menu
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            renderTestimonials();
            
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
            
            // Mobile Menu
            document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
            document.getElementById('closeMobileMenu').addEventListener('click', toggleMobileMenu);
            
            // Close mobile menu on link click
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    toggleMobileMenu();
                });
            });
            
            // Nav Scroll Effect
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const nav = document.getElementById('mainNav');
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    nav.classList.add('nav-scrolled');
                } else {
                    nav.classList.remove('nav-scrolled');
                }
                
                lastScroll = currentScroll;
            });
            
            // Form Submission
            document.getElementById('contactForm').addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Thank you! We will respond within 24 hours.');
                e.target.reset();            
            document.getElementById('newsletterForm').addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Successfully subscribed to our newsletter!');
                e.target.reset();
            });
            
            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offset = 80; // Account for fixed nav
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });