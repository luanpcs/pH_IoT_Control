var xValues = [];
var yValues = [];

const initData = [{
    x: [""],
    y: ["0"],
    mode: "lines+markers",
    line: { shape: 'spline' },
    marker: {
        size: 7,
        color: '#2F3B76',
        symbol: 'circle'
    }
}];

const layout = {
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
        dtick: 1
    },
    xaxis: {
        title: "Tempo",
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
    }
};

Plotly.newPlot("graficoPH", initData, layout, { displayModeBar: false });

function addGraphData(newLabel, newData) {
    maxShowData = 30

    yValues.push(newData);
    xValues.push(newLabel);

    if (yValues.length >= maxShowData) {
        yValues.shift();
        xValues.shift();
    }

    const newDatas = {
        x: [xValues],
        y: [yValues],
    };
    
    const tickStart = xValues[0];
    const tickEnd = xValues[xValues.length - 1];
    const tickPositions = [tickStart, tickEnd];
    const tickLabels = [tickStart, tickEnd];
    
    const layoutnewDatas = {
        xaxis: {
            displayModeBar: false,
            tickvals: tickPositions,
            ticktext: tickLabels,
            title: "Tempo",
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
        },
    };

    Plotly.update("graficoPH", newDatas, layoutnewDatas);
}


window.addEventListener('resize', function () {
    Plotly.purge("graficoPH");
    graficoPH = Plotly.newPlot("graficoPH", initData, layout);
});
