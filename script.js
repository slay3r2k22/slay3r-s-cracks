// Smooth scrolling effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    document.body.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

function toggleNav() {
    const navbar = document.getElementById("navbar");
    if (navbar.style.display === "flex") {
        navbar.style.display = "none";
    } else {
        navbar.style.display = "flex";
    }
}
