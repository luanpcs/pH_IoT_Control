import { novoAlerta, getAlertas, getRegistros } from './requests.js';

export function showReportPopup() {
    setTimeout(async () => {
        hidePreReportPopup()

        const popup = document.getElementById("report-popup");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.opacity = 1;
        }, 10);
        
        var alertsData = await getAlertas();
        var regsData = await getRegistros();
        addDataToAlertTable(alertsData, regsData);


        document.body.style.overflow = "hidden";

        const table = document.getElementById('reportDataTable');
        const container = table.cloneNode(true);

        container.style.marginTop = '0mm';
        html2pdf(container, {
            margin: 1,
            filename: 'Relatorio.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        });
    }, 3500);
}

export function hideReportPopup() {
    const popup = document.getElementById("report-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";

    const reportDataBody = document.getElementById("reportDataBody");

    while (reportDataBody.firstChild) {
        reportDataBody.removeChild(reportDataBody.firstChild);
    }
}

export function showPreReportPopup() {
    const popup = document.getElementById("pre-report-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    document.body.style.overflow = "hidden";
}

export function hidePreReportPopup() {
    const popup = document.getElementById("pre-report-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";
}

document.getElementById("report-popup-button").addEventListener("click", showPreReportPopup);
document.getElementById("pre-report-popup-close").addEventListener("click", hidePreReportPopup);

document.getElementById("export-btn").addEventListener("click", showReportPopup);
document.getElementById("report-popup-close").addEventListener("click", hideReportPopup);

const reportDataBody = document.getElementById("reportDataBody");
function addDataToAlertTable(alertsData, regsData) {
    const pickedDate = getData()

    var alertCount = 0;
    var regCount = 0;

    const table = document.createElement("table");
    table.classList.add("reportTable");

    const headerRow1 = document.createElement("tr");

    const alertTitleHeader = document.createElement("th");
    alertTitleHeader.textContent = "Alertas";
    alertTitleHeader.setAttribute("colspan", "3");
    alertTitleHeader.classList.add("header-report-table")
    headerRow1.appendChild(alertTitleHeader);

    headerRow1.appendChild(document.createElement("th"));

    const regTitleHeader = document.createElement("th");
    regTitleHeader.textContent = "Registros";
    regTitleHeader.setAttribute("colspan", "3");
    regTitleHeader.classList.add("header-report-table")
    headerRow1.appendChild(regTitleHeader);

    table.appendChild(headerRow1);

    let tam1 = alertsData.length;
    let tam2 = regsData.length;
    let tamanhoMaximo = Math.max(tam1, tam2);
    for (let i = 0; i < tamanhoMaximo; i++) {
        const newRow = document.createElement("tr");

        const alertCell = document.createElement("td");
        const alertTimeCell = document.createElement("td");
        const alertSondaCell = document.createElement("td");

        const regLogCell = document.createElement("td");
        const regTimeCell = document.createElement("td");
        const regSondaCell = document.createElement("td");

        alertCell.classList.add("reportLine");
        alertTimeCell.classList.add("reportLine");
        alertSondaCell.classList.add("reportLine");

        regLogCell.classList.add("reportLine");
        regTimeCell.classList.add("reportLine");
        regSondaCell.classList.add("reportLine");

        if (i < tam1) {
            var alertDate = alertsData[i].timestamp.substring(0, 10).trim();
            if (alertDate === pickedDate || pickedDate == "") {
                alertCount = alertCount + 1
                alertCell.textContent = alertsData[i].alert;
                alertTimeCell.textContent = alertsData[i].timestamp;
                alertSondaCell.textContent = "Sonda 1";
            }
        }

        if (i < tam2) {
            var regDate = regsData[i].timestamp.substring(0, 10).trim();
            if (regDate === pickedDate || pickedDate == "") {
                regCount = regCount + 1
                regLogCell.textContent = regsData[i].log;
                regTimeCell.textContent = regsData[i].timestamp;
                regSondaCell.textContent = "Sonda 1";
            }
        }

        newRow.appendChild(alertTimeCell);
        newRow.appendChild(alertCell);
        newRow.appendChild(alertSondaCell);

        const space = document.createElement("th");
        newRow.appendChild(space);

        newRow.appendChild(regTimeCell);
        newRow.appendChild(regLogCell);
        newRow.appendChild(regSondaCell);

        table.appendChild(newRow);

        newRow.classList.remove("invisible");
    }

    if (alertCount == 0 || regCount == 0) {
        const newRow = document.createElement("tr");

        if (alertCount == 0) {
            const alertCell = document.createElement("td");
            const alertTimeCell = document.createElement("td");
            const alertSondaCell = document.createElement("td");

            alertCell.classList.add("reportLine");
            alertTimeCell.classList.add("reportLine");
            alertSondaCell.classList.add("reportLine");

            alertCell.textContent = "Sem alertas";
            alertTimeCell.textContent = "                          ";
            alertSondaCell.textContent = "                          ";

            newRow.appendChild(alertTimeCell);
            newRow.appendChild(alertCell);
            newRow.appendChild(alertSondaCell);
        }

        const space = document.createElement("th");
        newRow.appendChild(space);

        if (regCount == 0) {
            const regLogCell = document.createElement("td");
            const regTimeCell = document.createElement("td");
            const regSondaCell = document.createElement("td");

            regLogCell.classList.add("reportLine");
            regTimeCell.classList.add("reportLine");
            regSondaCell.classList.add("reportLine");

            regLogCell.textContent = "Sem registros";
            regTimeCell.textContent = "                          ";
            regSondaCell.textContent = "                          ";

            newRow.appendChild(regTimeCell);
            newRow.appendChild(regLogCell);
            newRow.appendChild(regSondaCell);
        }

        table.appendChild(newRow);
    }

    reportDataBody.appendChild(table);
}

export function getData() {
    var selectedDate = document.getElementById('datepicker').value;
    var formattedDate = formatarData(selectedDate);

    if (typeof selectedDate === 'undefined' || selectedDate === '') {
        formattedDate = "";
    }

    return formattedDate
}

function formatarData(data) {
    var partes = data.split('-');
    var ano = partes[0].substring(2);
    var mes = partes[1];
    var dia = partes[2];

    return dia + '/' + mes + '/' + ano;
}

const btn = document.querySelector(".export");
btn.addEventListener("click", () => {
    btn.classList.add("active");

    setTimeout(() => {
        btn.classList.remove("active");
    }, 3000);
});
