import { novoAlerta, getAlertas, registerUser, login, savePH } from './requests.js';

function showRegistrosPopup() {
    const popup = document.getElementById("registros-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    document.body.style.overflow = "hidden";

    const regDataBody = document.getElementById("regDataBody");

    while (regDataBody.firstChild) {
       regDataBody.removeChild(regDataBody.firstChild);
    }
}

export function hideRegistrosPopup() {
    const popup = document.getElementById("registros-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";
}

const alertDataBody = document.getElementById("regDataBody");
const addDataButton = document.getElementById("registros-popup-button");

addDataButton.addEventListener("click", async function () {
    try {
        var data = await getAlertas();
        data.forEach(function (device) {
            addDataToRegTable(device);
        });

    } catch (error) {
        console.error("Erro ao obter os dados:", error);
    }
});

function addDataToRegTable(data) {
    const newRow = document.createElement("tr");
    const reg = document.createElement("td");
    const timeCell = document.createElement("td");
    const add = document.createElement("td");
        
    reg.classList.add("regLine");
    timeCell.classList.add("regLine");
    add.classList.add("regLine");
    
    reg.textContent = data.alert;
    timeCell.textContent = data.dec;
    add.textContent = "Sonda 1"

    newRow.appendChild(reg);
    newRow.appendChild(timeCell);
    newRow.appendChild(add);


    alertDataBody.appendChild(newRow);

    newRow.classList.remove("invisible");
}

document.getElementById("registros-popup-button").addEventListener("click", showRegistrosPopup);
document.getElementById("registros-popup-close").addEventListener("click", hideRegistrosPopup);