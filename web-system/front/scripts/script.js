window.onload = hidePopups;

function hidePopups()
{
    hideRegistrosPopup();
    hideAlertasPopup();
    gerarGrafico()  
}

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


function gerarGrafico() {
    var canvas = document.getElementById("meuGrafico");
    var ctx = canvas.getContext("2d");

    var data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
        datasets: [
            {
                label: "pH",
                data: [7.2, 10.4, 3.7, 9.1, 12.9, 6.3, 1.5, 11.0, 8.6, 2.8, 5.2, 13.3, 4.9, 0.3, 14.0, 7.7, 3.1],
                borderColor: '#2F3B76',
                backgroundColor: "transparent"
            }
        ]
    };

    var meuGrafico = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.4, // Valor que controla a suavidade da linha (ajuste conforme necessário)
                }
            },
            scales: {
                y: {
                    ticks: {
                        stepSize: 1, // Define o intervalo entre os rótulos no eixo Y
                        min: 0, // Valor mínimo no eixo Y
                        max: 14, // Valor máximo no eixo Y
                    }
                }
            }
        }
    });
}