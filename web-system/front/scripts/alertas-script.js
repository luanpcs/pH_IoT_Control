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

    const dataBody = document.getElementById("dataBody");

    while (dataBody.firstChild) {
       dataBody.removeChild(dataBody.firstChild);
    }
}

document.getElementById("alertas-popup-button").addEventListener("click", showAlertasPopup);
document.getElementById("alertas-popup-close").addEventListener("click", hideAlertasPopup);



const dataBody = document.getElementById("dataBody");
const addDataButton = document.getElementById("alertas-popup-button");

addDataButton.addEventListener("click", async function () {
    try {
        var data = await getAllDevices();
        data.forEach(function (device) {
            addDataToTable(device);
        });

    } catch (error) {
        console.error("Erro ao obter os dados:", error);
    }
});

function addDataToTable(data) {
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

    dataBody.appendChild(newRow);

    newRow.classList.remove("invisible");
}