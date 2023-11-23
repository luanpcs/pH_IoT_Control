import { novoRegistro, getRegistros } from './requests.js';

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
    document.getElementById('loadingGifRegistros').style.display = 'block';

    setTimeout(async function () {
        try {
            var data = await getRegistros();
            data.forEach(function (device) {
                addDataToRegTable(device);
            });

            document.getElementById('loadingGifRegistros').style.display = 'none';

        } catch (error) {
            console.error("Erro ao obter os dados:", error);

            document.getElementById('loadingGifRegistros').style.display = 'none';
        }
    }, 2000);
});

function addDataToRegTable(data) {
    const newRow = document.createElement("tr");
    const img = document.createElement("td");
    const reg = document.createElement("td");
    const timeCell = document.createElement("td");
    const add = document.createElement("td");

    img.classList.add("regImg")
    reg.classList.add("regLine");
    timeCell.classList.add("regLine");
    add.classList.add("regLine");
    
    const image = document.createElement("img");
    image.src = "../screens/assets/log.png";
    img.appendChild(image);
    
    reg.textContent = data.log;
    timeCell.textContent = data.timestamp;
    add.textContent = "Sonda 1"
    
    newRow.appendChild(img);
    newRow.appendChild(timeCell);
    newRow.appendChild(reg);
    newRow.appendChild(add);

    alertDataBody.appendChild(newRow);

    newRow.classList.remove("invisible");
}

document.getElementById("registros-popup-button").addEventListener("click", showRegistrosPopup);
document.getElementById("registros-popup-close").addEventListener("click", hideRegistrosPopup);