var canvas = document.getElementById("meuGrafico");
var ctx = canvas.getContext("2d");

var data = {
    labels: [],
    datasets: [
        {
            label: "pH",
            data: [],
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
                tension: 0.2, 
            }
        },
        scales: {
            y: {
                min: 0, 
                max: 15, 
                ticks: {
                    stepSize: 0.1,
                }
            }
        }
    }
});


function gerarGrafico(novoRotulo, novoDado) {
    data.labels.push(novoRotulo);
    data.datasets[0].data.push(novoDado);

    meuGrafico.update();
}
