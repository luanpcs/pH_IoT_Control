import { sendId, getAllDevices, registerUser, login, savePH } from './requests.js';

function showAlertasPopup() {
    const popup = document.getElementById("alertas-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    document.body.style.overflow = "hidden";
}

export function hideAlertasPopup() {
    const popup = document.getElementById("alertas-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";

    const alertDataBody = document.getElementById("alertDataBody");

    while (alertDataBody.firstChild) {
       alertDataBody.removeChild(alertDataBody.firstChild);
    }
}

document.getElementById("alertas-popup-button").addEventListener("click", showAlertasPopup);
document.getElementById("alertas-popup-close").addEventListener("click", hideAlertasPopup);

const alertDataBody = document.getElementById("alertDataBody");
const addDataButton = document.getElementById("alertas-popup-button");

addDataButton.addEventListener("click", async function () {
    try {
        var data = await getAllDevices();
        data.forEach(function (device) {
            addDataToAlertTable(device);
        });

    } catch (error) {
        console.error("Erro ao obter os dados:", error);
    }
});

function addDataToAlertTable(data) {
    const newRow = document.createElement("tr");
    const alertCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const timeCell = document.createElement("td");
    const add = document.createElement("td");

    alertCell.classList.add("alertImg");
    descriptionCell.classList.add("decAlert");
    timeCell.classList.add("timeAlert");
    add.classList.add("timeAlert");

    const image = document.createElement("img");
    image.src = "../screens/assets/warning.png";
    alertCell.appendChild(image);

    descriptionCell.textContent = data.alert;
    timeCell.textContent = data.dec;
    add.textContent = "Sonda 1"

    newRow.appendChild(alertCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(add);

    alertDataBody.appendChild(newRow);

    newRow.classList.remove("invisible");
}