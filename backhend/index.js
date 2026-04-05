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




               //--------pdf compress ------//


let compressedBlob = null; // store compressed file

async function compressPDF() {
    const fileInput = document.getElementById("fileInput");
    const level = document.getElementById("compressionLevel").value;

    if (!fileInput.files.length) {
        alert("Please select a file");
        return;
    }

    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdf = await PDFLib.PDFDocument.create();

    const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

    pages.forEach((page) => newPdf.addPage(page));

    // Compression logic (basic simulation)
    let useObjectStreams = true;

    if (level === "low") {
        useObjectStreams = false;
    } else if (level === "medium") {
        useObjectStreams = true;
    } else if (level === "high") {
        useObjectStreams = true;
    }

    const pdfBytes = await newPdf.save({
        useObjectStreams: useObjectStreams
    });

    // Save blob
    compressedBlob = new Blob([pdfBytes], { type: "application/pdf" });

    // Show download button
    document.getElementById("downloadBtn").style.display = "inline";
}

// Download button logic
document.getElementById("downloadBtn").addEventListener("click", function () {
    if (!compressedBlob) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = "compressed.pdf";
    link.click();
});

        const dropZone = document.getElementById("dropZone");
        const fileInput = document.getElementById("pdfFile");
        const card = document.getElementById("fileCard");
        const fileName = document.getElementById("fileName");
        const fileSize = document.getElementById("fileSize");
        const result = document.getElementById("result");
        const bar = document.getElementById("bar");
        const progressBox = document.getElementById("progressBox");
        const selectBtn = document.getElementById("selectBtn");
        const sizeBox = document.getElementById("sizeBox");

        /* CLICK UPLOAD */
        dropZone.addEventListener("click", () => fileInput.click());

        /* FILE SELECT */
        fileInput.addEventListener("change", handleFile);

        /* DRAG EVENTS */
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("drag");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("drag");
        });

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("drag");
            fileInput.files = e.dataTransfer.files;
            handleFile();
        });

        /* FILE VALIDATION */
        function handleFile() {
            let file = fileInput.files[0];
            if (!file) return;

            if (file.type !== "application/pdf") {
                showError("Only PDF allowed");
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                showError("Max file size 10MB");
                return;
            }

            card.classList.remove("hidden");
            fileName.innerText = file.name;
            fileSize.innerText = (file.size / 1024 / 1024).toFixed(2) + " MB";
            result.innerHTML = "";
        }

        /* ERROR */
        function showError(msg) {
            result.innerHTML = `<span class="error">${msg}</span>`;
            card.classList.add("hidden");
        }

        /* SIZE DROPDOWN */
        selectBtn.onclick = () => {
            sizeBox.classList.toggle("show");
        };

        document.querySelectorAll('input[name="size"]').forEach(r => {
            r.onchange = () => {
                selectBtn.innerText = r.value;
                sizeBox.classList.remove("show");
            };
        });

        /* COMPRESS SIMULATION */
        document.getElementById("compressBtn").onclick = () => {

            if (!fileInput.files[0]) {
                showError("Upload PDF first");
                return;
            }

            progressBox.classList.remove("hidden");
            bar.style.width = "0%";

            let p = 0;
            let interval = setInterval(() => {
                p += 5;
                bar.style.width = p + "%";

                if (p >= 100) {
                    clearInterval(interval);
                    result.innerHTML =
                        `<a class="download">Download Compressed PDF</a>`;
                }
            }, 120);

        };
