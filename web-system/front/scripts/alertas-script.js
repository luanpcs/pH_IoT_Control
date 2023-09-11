function showAlertasPopup() {
    const popup = document.getElementById("alertas-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    document.body.style.overflow = "hidden";
}

function hideAlertasPopup() {
    const popup = document.getElementById("alertas-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";
}

document.getElementById("alertas-popup-button").addEventListener("click", showAlertasPopup);
document.getElementById("alertas-popup-close").addEventListener("click", hideAlertasPopup);