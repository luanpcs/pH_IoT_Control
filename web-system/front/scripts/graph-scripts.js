
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