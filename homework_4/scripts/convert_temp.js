"use strict";

window.addEventListener("DOMContentLoaded", domLoaded);

let lastEdited = null;

function domLoaded() {
    const cIn = document.getElementById("C_in");
    const fIn = document.getElementById("F_in");
    const btn = document.getElementById("convertButton");

    cIn.addEventListener("input", function () {
        lastEdited = "C";
        if (cIn.value.trim() !== "") fIn.value = "";
        maybeDefaultIcon();
    });

    fIn.addEventListener("input", function () {
        lastEdited = "F";
        if (fIn.value.trim() !== "") cIn.value = "";
        maybeDefaultIcon();
    });

    btn.addEventListener("click", function () {
        const cStr = cIn.value.trim();
        const fStr = fIn.value.trim();

        if (cStr === "" && fStr === "") {
            setMessage("Enter a temperature to convert.");
            setIcon("C-F.png");
            return;
        }

        const cVal = cStr === "" ? null : parseFloat(cStr);
        const fVal = fStr === "" ? null : parseFloat(fStr);

        if ((cVal !== null && Number.isNaN(cVal)) || (fVal !== null && Number.isNaN(fVal))) {
            setMessage("Please enter a valid number.");
            return;
        }

        let usedF;

        if (fVal !== null && cVal === null) {
            // F → C
            const c = convertFtoC(fVal);
            cIn.value = fmt(c);
            usedF = fVal;
            setMessage("");
        } else if (cVal !== null && fVal === null) {
            // C → F
            const f = convertCtoF(cVal);
            fIn.value = fmt(f);
            usedF = f;
            setMessage("");
        } else {
            if (lastEdited === "C") {
                const f = convertCtoF(cVal);
                fIn.value = fmt(f);
                usedF = f;
            } else {
                const c = convertFtoC(fVal);
                cIn.value = fmt(c);
                usedF = fVal;
            }
            setMessage("");
        }

        setIcon(pickIconForF(usedF));
    });
}

function convertCtoF(C) {
    return C * (9 / 5) + 32;
}

function convertFtoC(F) {
    return (F - 32) * (5 / 9);
}

// --- icon logic (based on Fahrenheit) ---
function pickIconForF(F) {
    if (F === null || F === undefined) return "C-F.png";
    if (F >= 200 || F <= -200) return "dead.png";
    if (F <= 32 && F > -200) return "cold.png";
    if (F >= 90 && F < 200) return "hot.png";
    return "cool.png";
}

function maybeDefaultIcon() {
    const cEmpty = document.getElementById("C_in").value.trim() === "";
    const fEmpty = document.getElementById("F_in").value.trim() === "";
    if (cEmpty && fEmpty) setIcon("C-F.png");
}

// --- helpers ---
function setIcon(fileName) {
    const img = document.getElementById("weatherIcon");
    if (img) img.src = "images/" + fileName; // matches your HTML folder
}

function setMessage(text) {
    const msg = document.getElementById("message");
    if (msg) msg.textContent = text;
}

function fmt(n) {
    // up to 2 decimals; strip trailing zeros
    const s = n.toFixed(2);
    return s.replace(/\.?0+$/, "");
}
