"""
Image to PDF Converter - Flask Backend
Requirements: pip install flask pillow reportlab flask-cors
Run: python app.py
"""

import io
import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
from reportlab.lib.pagesizes import A4, letter, landscape
from reportlab.pdfgen import canvas

app = Flask(__name__)
CORS(app)  # Allow requests from your HTML frontend

# --- Config ---
MAX_IMAGES = 5
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp", "tiff"}

PAGE_SIZES = {
    "a4": A4,
    "letter": letter,
    "auto": None,  # determined per image
}

QUALITY_MAP = {
    "high (0.9)": 90,
    "medium (0.7)": 70,
    "low (0.5)": 50,
}

MARGIN_MAP = {
    "none": 0,
    "small": 10,
    "medium": 30,
    "large": 60,
}


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_page_size(page_size_str: str, orientation_str: str, img_w: int, img_h: int):
    """Return (page_w, page_h) in points based on settings and image dimensions."""
    key = page_size_str.lower()

    if key == "auto":
        # Match page to image aspect ratio at 96 dpi equivalent
        scale = 72 / 96  # reportlab uses 72 pts/inch
        page_w = img_w * scale
        page_h = img_h * scale
    else:
        page_w, page_h = PAGE_SIZES.get(key, A4)

    # Apply orientation
    orient = orientation_str.lower()
    if orient == "landscape" and page_w < page_h:
        page_w, page_h = page_h, page_w
    elif orient == "portrait" and page_w > page_h:
        page_w, page_h = page_h, page_w
    elif orient == "auto":
        # Match orientation to image shape
        if img_w > img_h and page_w < page_h:
            page_w, page_h = page_h, page_w
        elif img_h > img_w and page_w > page_h:
            page_w, page_h = page_h, page_w

    return page_w, page_h


@app.route("/convert", methods=["POST"])
def convert():
    files = request.files.getlist("images")

    if not files or all(f.filename == "" for f in files):
        return jsonify({"error": "No images uploaded."}), 400

    if len(files) > MAX_IMAGES:
        return jsonify({"error": f"Maximum {MAX_IMAGES} images allowed."}), 400

    # --- Read settings ---
    page_size_str  = request.form.get("pageSize",    "Auto")
    orientation    = request.form.get("orientation", "Auto")
    margin_str     = request.form.get("margin",      "Small").lower()
    quality_str    = request.form.get("quality",     "High (0.9)").lower()

    margin  = MARGIN_MAP.get(margin_str, 10)
    quality = QUALITY_MAP.get(quality_str, 90)

    # --- Build PDF in memory ---
    pdf_buffer = io.BytesIO()
    first_page = True
    c = None

    for file in files:
        if not allowed_file(file.filename):
            return jsonify({"error": f"Unsupported file type: {file.filename}"}), 400

        try:
            img = Image.open(file.stream).convert("RGB")
        except Exception as e:
            return jsonify({"error": f"Could not open image '{file.filename}': {e}"}), 400

        img_w, img_h = img.size
        page_w, page_h = get_page_size(page_size_str, orientation, img_w, img_h)

        if first_page:
            c = canvas.Canvas(pdf_buffer, pagesize=(page_w, page_h))
            first_page = False
        else:
            c.setPageSize((page_w, page_h))
            c.showPage()

        # Scale image to fit within the margins
        draw_w = page_w - 2 * margin
        draw_h = page_h - 2 * margin

        ratio = min(draw_w / img_w, draw_h / img_h)
        scaled_w = img_w * ratio
        scaled_h = img_h * ratio

        # Center the image on the page
        x = (page_w - scaled_w) / 2
        y = (page_h - scaled_h) / 2

        # Save image to temp buffer with quality setting
        img_buffer = io.BytesIO()
        img.save(img_buffer, format="JPEG", quality=quality)
        img_buffer.seek(0)

        c.drawImage(
            img_buffer,          # reportlab accepts file-like objects
            x, y,
            width=scaled_w,
            height=scaled_h,
            preserveAspectRatio=True,
        )

    if c is None:
        return jsonify({"error": "No valid images were processed."}), 400

    c.save()
    pdf_buffer.seek(0)

    return send_file(
        pdf_buffer,
        mimetype="application/pdf",
        as_attachment=True,
        download_name="converted.pdf",
    )


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
