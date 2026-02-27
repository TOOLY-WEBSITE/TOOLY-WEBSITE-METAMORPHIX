function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("toolyTheme", "dark");
    } else {
        localStorage.setItem("toolyTheme", "light");
    }
}

(function loadTheme() {
    const saved = localStorage.getItem("toolyTheme");
    if (saved === "dark") document.body.classList.add("dark");
})();

function showUserName() {
    const user = localStorage.getItem("toolyUser") || "";
    const el = document.getElementById("userNameDisplay");

    if (!el) return;

    if (user.trim() !== "") {
        el.innerText = `Welcome back, ${user} 👋`;
    } else {
        el.innerText = "Explore tools and get work done faster ⚡";
    }
}

function updateNavbar() {
    // Optional placeholder (you can keep your own logic)
}

function filterTools() {
    const input = document.getElementById("toolSearch").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    });
}

function filterCategory(category) {
    const chips = document.querySelectorAll(".chip");
    chips.forEach((c) => c.classList.remove("active"));

    event.target.classList.add("active");

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const cat = card.getAttribute("data-category") || "";

        if (category === "all") {
            card.style.display = "block";
        } else {
            card.style.display = cat.includes(category) ? "block" : "none";
        }
    });

}

showUserName();
updateNavbar();

document.getElementById("year").innerText = new Date().getFullYear();