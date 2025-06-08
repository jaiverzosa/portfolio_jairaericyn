const containers = document.querySelectorAll('.container_projectCards');

function checkCardsInAllContainers() {
    containers.forEach(function(container) {
        const cards = container.querySelectorAll('.card');
        const containerCenter = container.scrollLeft + (container.offsetWidth / 2);

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const cardLeft = card.offsetLeft;
            const cardCenter = cardLeft + (card.offsetWidth / 2);

            if (Math.abs(containerCenter - cardCenter) < card.offsetWidth / 2) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1.3)';
            } else {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(1)';
            }
        }
    });
}

function scrollCardToCenter(card, container) {
    const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
    const containerCenter = container.offsetWidth / 2;
    const scrollTo = cardCenter - containerCenter;

    container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
    });
}

containers.forEach(function(container) {
    const cards = container.querySelectorAll('.card');

    // Update on scroll
    container.addEventListener('scroll', function() {
        checkCardsInAllContainers();
    });

    // Scroll to center on click
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            scrollCardToCenter(card, container);
        });
    });

    // Mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', function(e) {
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', function() {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', function() {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
});

window.addEventListener('load', function() {
    checkCardsInAllContainers();
});

