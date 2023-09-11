function showRegistrosPopup() {
    const popup = document.getElementById("registros-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    document.body.style.overflow = "hidden";
}

function hideRegistrosPopup() {
    const popup = document.getElementById("registros-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";
}

document.getElementById("registros-popup-button").addEventListener("click", showRegistrosPopup);
document.getElementById("registros-popup-close").addEventListener("click", hideRegistrosPopup);