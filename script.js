/**
 * =========================================================================
 * PORTOFOLIO WEBSITE — SCRIPT.JS
 * Author: Dimas Nur Faiz (Siswa TJKT)
 * Deskripsi: Logika interaktif untuk website portofolio personal.
 *            Semua kode menggunakan vanilla JavaScript (ES6+).
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    // 1. DATA PROYEK
    // Array objek yang menyimpan semua informasi portofolio.
    // Untuk menambah proyek baru, cukup tambahkan objek baru di array ini.
    // =====================================================================
    const projects = [
        {
            id: 1,
            title: 'Portofolio Siswa (Soft Cyan Theme)',
            category: 'portfolio',
            description: 'Bukti hasil pembuatan website portofolio personal bernuansa Soft Cyan lengkap dengan kartu profil bio, ikon hobi, dan bubble icons keahlian interaktif.',
            image: 'assets/img/project-dimas.jpg',
            tags: ['HTML', 'CSS', 'JavaScript', 'Soft Theme', 'TJKT'],
            demoLink: '#',
            detailLink: '#'
        },
        {
            id: 2,
            title: 'Company Profile Glassmorphism 3D',
            category: 'umkm',
            description: 'Desain company profile modern bernuansa Glassmorphism dengan kartu kaca transparan (frosted glass), 3D spheres, dan tata letak mewah.',
            image: 'assets/img/project-glass.jpg',
            tags: ['HTML', 'CSS', 'Glassmorphism', '3D UI', 'Responsive'],
            demoLink: '#',
            detailLink: '#'
        },
        {
            id: 3,
            title: 'Landing Page 3D Claymorphic',
            category: 'landing',
            description: 'Landing page promosi produk/UMKM bergaya 3D Claymorphism pastel yang ramah, bersih, dan interaktif untuk menarik minat calon pembeli.',
            image: 'assets/img/project-clay.jpg',
            tags: ['HTML', 'CSS', 'Claymorphism 3D', 'Landing Page'],
            demoLink: '#',
            detailLink: '#'
        }
    ];

    // =====================================================================
    // 2. RENDER PROJECTS
    // Fungsi untuk merender kartu proyek ke dalam grid.
    // Menerima parameter filter ('semua', 'landing', 'portfolio', 'umkm').
    // =====================================================================
    const projectGrid = document.getElementById('project-grid');

    const renderProjects = (filter = 'semua') => {
        if (!projectGrid) return;

        // Kosongkan grid
        projectGrid.innerHTML = '';

        // Filter proyek berdasarkan kategori
        const filtered = filter === 'semua'
            ? projects
            : projects.filter(p => p.category === filter);

        // Generate HTML untuk setiap proyek
        filtered.forEach((project, index) => {
            const tagsHTML = project.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');

            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-category', project.category);
            card.style.opacity = '0';

            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <button class="overlay-btn view-image-btn" data-id="${project.id}">🔍 Zoom</button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;

            // Event listener klik untuk membuka modal lightbox gambar jernih
            card.addEventListener('click', () => {
                openImageModal(project);
            });

            projectGrid.appendChild(card);

            // Animasi staggered: setiap kartu muncul bertahap
            setTimeout(() => {
                card.classList.add('fade-in');
                card.style.opacity = '1';
            }, index * 120);
        });
    };

    // Modal Lightbox Logic
    const imageModal = document.getElementById('image-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    const openImageModal = (project) => {
        if (!imageModal || !modalImg) return;
        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        if (!imageModal) return;
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose?.addEventListener('click', closeImageModal);
    modalOverlay?.addEventListener('click', closeImageModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeImageModal();
    });

    // Render semua proyek saat halaman pertama kali dimuat
    renderProjects('semua');

    // =====================================================================
    // 3. FILTER BUTTONS
    // Event listener untuk tombol filter kategori proyek.
    // =====================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Hapus status active dari semua tombol
            filterBtns.forEach(b => b.classList.remove('active'));
            // Tambah status active ke tombol yang diklik
            e.currentTarget.classList.add('active');

            // Ambil nilai filter dan render ulang proyek
            const filterValue = e.currentTarget.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });

    // =====================================================================
    // 4. NAVBAR SCROLL EFFECT
    // Navbar berubah saat user scroll ke bawah.
    // Tombol back-to-top muncul saat scroll melewati 500px.
    // =====================================================================
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Efek navbar solid saat scroll
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Tampilkan tombol back-to-top
        if (scrollY > 500) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Klik tombol back-to-top untuk scroll ke atas
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =====================================================================
    // 5. MOBILE MENU TOGGLE
    // Hamburger menu untuk tampilan mobile.
    // =====================================================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Tutup menu saat salah satu link diklik
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // =====================================================================
    // 6. SMOOTH SCROLL
    // Perpindahan halaman yang mulus saat klik anchor link.
    // =====================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = navbar?.offsetHeight || 0;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================================
    // 7. INTERSECTION OBSERVER — Scroll Animations
    // Elemen dengan class .animate-on-scroll akan muncul dengan animasi
    // saat terlihat di viewport.
    // =====================================================================
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // =====================================================================
    // 7b. SKILL PROGRESS BAR ANIMATION
    // Progress bar akan terisi saat section Skills terlihat di viewport.
    // =====================================================================
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                if (level) {
                    // Delay kecil agar transisi CSS terlihat
                    setTimeout(() => {
                        entry.target.style.width = level;
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-progress-fill').forEach(el => {
        skillObserver.observe(el);
    });

    // =====================================================================
    // 8. STATS COUNTER ANIMATION
    // Angka statistik dihitung dari 0 ke target menggunakan
    // requestAnimationFrame untuk performa yang smooth.
    // =====================================================================
    const animateCounter = (element, target, duration = 2000) => {
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing: ease-out untuk counter yang melambat di akhir
            const easeOut = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(easeOut * target);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target; // Pastikan mencapai target exact
            }
        };

        window.requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => {
        statObserver.observe(el);
    });

    // =====================================================================
    // 9. CONTACT FORM → WHATSAPP
    // Form tidak dikirim ke server. Saat submit, pesan otomatis
    // di-generate dan user diarahkan ke WhatsApp (wa.me).
    // =====================================================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ambil nilai dari setiap field
            const nama = document.getElementById('contact-name').value.trim();
            const layanan = document.getElementById('contact-service').value;
            const pesan = document.getElementById('contact-message').value.trim();

            // Validasi: semua field harus terisi
            if (!nama || !layanan || !pesan) {
                alert('Mohon lengkapi semua field sebelum mengirim.');
                return;
            }

            // Susun pesan WhatsApp
            const waNumber = '6288294009109';
            const message = encodeURIComponent(
                `Halo, saya ${nama}.\n\n` +
                `Saya tertarik dengan layanan: ${layanan}.\n\n` +
                `Detail kebutuhan:\n${pesan}\n\n` +
                `— Pesan ini dikirim melalui website portofolio.`
            );

            const waUrl = `https://wa.me/${waNumber}?text=${message}`;

            // Buka WhatsApp di tab baru
            window.open(waUrl, '_blank');

            // Reset form setelah pengiriman
            contactForm.reset();
        });
    }

    // =====================================================================
    // 10. ACTIVE NAV LINK HIGHLIGHT
    // Menandai link navigasi yang aktif berdasarkan posisi scroll.
    // =====================================================================
    const sections = document.querySelectorAll('.section, .hero');

    const highlightNavOnScroll = () => {
        const scrollY = window.scrollY;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    // =====================================================================
    // 11. TYPING EFFECT
    // Efek mengetik otomatis yang berganti-ganti kata di hero section.
    // =====================================================================
    const typingElement = document.querySelector('.typing-text');

    if (typingElement) {
        const phrases = ['Web Developer', 'UI Designer', 'Siswa TJKT', 'Freelancer'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Menghapus karakter satu per satu
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Mengetik karakter satu per satu
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = 100; // Kecepatan mengetik (ms)

            if (isDeleting) {
                speed = 50; // Menghapus lebih cepat
            }

            // Selesai mengetik → jeda sebelum menghapus
            if (!isDeleting && charIndex === currentPhrase.length) {
                speed = 2000;
                isDeleting = true;
            }
            // Selesai menghapus → pindah ke kata berikutnya
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        };

        // Mulai efek mengetik setelah delay awal
        setTimeout(typeEffect, 800);
    }

    // =====================================================================
    // 12. PARALLAX PARTICLES (bonus)
    // Efek parallax ringan pada partikel saat mouse bergerak.
    // =====================================================================
    const particlesContainer = document.querySelector('.particles');

    if (particlesContainer && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const particles = particlesContainer.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            particles.forEach((particle, i) => {
                const speed = (i + 1) * 15;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

}); // END DOMContentLoaded
