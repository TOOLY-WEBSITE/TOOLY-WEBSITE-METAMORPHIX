// ---------- DARK MODE ----------
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("toolyTheme", "dark");
    } else {
        localStorage.setItem("toolyTheme", "light");
    }
}

// Load saved theme
function loadTheme() {
    const saved = localStorage.getItem("toolyTheme");
    if (saved === "dark") {
        document.body.classList.add("dark");
    }
}


// -------- USER NAME ----------
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


// ---------- SEARCH FILTER ----------
function filterTools() {
    const inputEl = document.getElementById("toolSearch");
    if (!inputEl) return;

    const value = inputEl.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if (value === "" || value === "tooly" || text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// ---------- CATEGORY FILTER ----------
function filterCategory(category) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cat = card.getAttribute("data-category") || "";

        if (category === "all" || cat.includes(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// ---------- YEAR AUTO UPDATE ----------
function setYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }
}

// ---------- INITIALIZE ----------
document.addEventListener("DOMContentLoaded", () => {
    showUserName();
    setYear();

    const input = document.getElementById("toolSearch");
    if (input) {
        input.addEventListener("input", filterTools);
    }
});




//--------pdf compress ------


async function compressPDF() {
    const fileInput = document.getElementById("fileInput");

    if (!fileInput.files.length) {
        alert("Please select a PDF file");
        return;
    }

    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();

    // Load existing PDF
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

    // Create new PDF (optimized)
    const newPdf = await PDFLib.PDFDocument.create();

    // Copy pages
    const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

    pages.forEach((page) => {
        newPdf.addPage(page);
    });

    // Save with compression options
    const pdfBytes = await newPdf.save({
        useObjectStreams: true   // helps reduce size
    });

    // Download compressed file
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "compressed.pdf";
    link.click();
}