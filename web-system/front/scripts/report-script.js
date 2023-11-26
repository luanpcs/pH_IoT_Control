import { getAlertas, getRegistros, getPH } from './requests.js';

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
        var phData = await getPH()

        addDataToAlertTable(alertsData, regsData);
        gerarGraph(phData)

        document.body.style.overflow = "hidden";

        setTimeout(async () => {
            const table = document.getElementById('pdf');
            const container = table.cloneNode(true);

            container.style.marginTop = '0mm';
            html2pdf(container, {
                margin: 1,
                filename: 'Relatorio.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
            });
        }, 2000);
    }, 5000);
}

export function hideReportPopup() {
    const popup = document.getElementById("report-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);

    document.body.style.overflow = "auto";

    const reportDataBody = document.getElementById("reportDataBody");

    if (reportDataBody != null) {

        while (reportDataBody.firstChild) {
            reportDataBody.removeChild(reportDataBody.firstChild);
        }
    }

    Plotly.purge('reportGraph');
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

function addDataToAlertTable(alertsData, regsData) {
    const reportDataBody = document.getElementById("reportDataBody");
    const pickedDate = getData()

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
            if (pickedDate == "" || alertDate === pickedDate) {
                alertCell.textContent = alertsData[i].alert;
                alertTimeCell.textContent = alertsData[i].timestamp;
                alertSondaCell.textContent = "Sonda 1";
                alertSize++
            }
        }

        if (i < tam2) {
            var regDate = regsData[i].timestamp.substring(0, 10).trim();
            if (pickedDate == "" || regDate === pickedDate) {
                regLogCell.textContent = regsData[i].log;
                regTimeCell.textContent = regsData[i].timestamp;
                regSondaCell.textContent = "Sonda 1";
                regSize++
            }
        }

        if (alertSize > 0 || regSize > 0) {

            newRow.appendChild(alertTimeCell);
            newRow.appendChild(alertCell);
            newRow.appendChild(alertSondaCell);

            const space = document.createElement("td");
            newRow.appendChild(space);

            newRow.appendChild(regTimeCell);
            newRow.appendChild(regLogCell);
            newRow.appendChild(regSondaCell);

            table.appendChild(newRow);

            newRow.classList.remove("invisible");
        }
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

function gerarGraph(data) {
    setTimeout(() => {
        var yData = []
        var xData = []
        var plotedDatas = 0

        const dataSize = data.length
        const pickedDate = getData()

        for (let i = 0; i < dataSize; i++) {

            var dataDate = data[i].timestamp.substring(0, 10).trim();
            if (dataDate === pickedDate || pickedDate == "") {
                yData.push(data[i].value)
                xData.push(data[i].timestamp)
                plotedDatas++
            }
        }

        const tickStart = xData[0];
        const tickEnd = xData[dataSize - 1];
        const tickPositions = [tickStart, tickEnd];
        const tickLabels = [tickStart, tickEnd];

        var layout = {
            title: "pH x Tempo",
            font: {
                size: 20,
                family: "Alata",
                color: "#2F3B76"
            },
            yaxis: {
                title: "pH",
                titlefont: {
                    size: 30,
                    family: "Alata",
                    color: "#2F3B76"
                },
                tickfont: {
                    size: 15,
                    family: "Alata",
                    color: "#2F3B76"
                },
                range: [0, 14],
                autorange: false,
                dtick: 1,
            },
            xaxis: {
                title: "Tempo",
                tickvals: tickPositions,
                ticktext: tickLabels,
                titlefont: {
                    size: 30,
                    family: "Alata",
                    color: "#2F3B76"
                },
                tickfont: {
                    size: 16,
                    family: "Alata",
                    color: "#2F3B76"
                },
                showgrid: false,
            },
            displayModeBar: false,
        };

        var dados = [{
            type: 'scatter',
            mode: 'lines',
            fill: 'tozeroy',
            fillcolor: '#E6EFFF',
            displayModeBar: false,
            x: xData,
            y: yData
        }];

        if (plotedDatas != 0) {
            Plotly.newPlot('reportGraph', dados, layout);
        }
    }, 500);
}