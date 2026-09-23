document.addEventListener('DOMContentLoaded', function () {
    /* ============================================================
       Navbar: toggle menu di mobile + tutup otomatis setelah klik
       ============================================================ */
    var toggleBtn = document.querySelector('.navbar-toggle');
    var menu = document.querySelector('.navbar-menu');

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', function () {
            menu.classList.toggle('open');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
            });
        });
    }

    /* ============================================================
       Gallery: tampilkan foto per halaman (6 foto / halaman)
       dengan tombol panah kiri/kanan
       ============================================================ */
    var galleryGrid = document.querySelector('[data-gallery-grid]');

    if (galleryGrid) {
        var items = Array.prototype.slice.call(galleryGrid.querySelectorAll('.gallery-item'));
        var pageSize = 6;
        var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        var currentPage = 0;

        var prevBtn = document.querySelector('[data-gallery-prev]');
        var nextBtn = document.querySelector('[data-gallery-next]');
        var dotsWrap = document.querySelector('[data-gallery-dots]');

        function renderDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
            for (var i = 0; i < totalPages; i++) {
                var dot = document.createElement('span');
                if (i === currentPage) dot.classList.add('active');
                (function (pageIndex) {
                    dot.addEventListener('click', function () {
                        currentPage = pageIndex;
                        showPage();
                    });
                })(i);
                dotsWrap.appendChild(dot);
            }
        }

        function showPage() {
            items.forEach(function (item, index) {
                var page = Math.floor(index / pageSize);
                item.style.display = (page === currentPage) ? '' : 'none';
            });
            renderDots();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentPage = (currentPage - 1 + totalPages) % totalPages;
                showPage();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentPage = (currentPage + 1) % totalPages;
                showPage();
            });
        }

        if (items.length > 0) {
            showPage();
        }
    }
});
