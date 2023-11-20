import { mqttSend } from './mqtt.js';
var int

function showAutPopup() {
    const popup = document.getElementById("aut-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);
    
    document.body.style.overflow = "hidden";
}

export function hideAutPopup() {
    const popup = document.getElementById("aut-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);
    
    document.body.style.overflow = "auto";
}
var flagAnimation = 0
function configurarFaixa() {
    var min = parseFloat(document.getElementById('min').value);
    var max = parseFloat(document.getElementById('max').value);
    
    if (![min, max].every(val => !isNaN(val) && val >= 0.0 && val <= 14.0)) {
        alert('Insira valores válidos, entre 0.0 e 14.0');
        return;
    }
    
    if (min >= max) {
        alert('O pH mínimo deve ser menor que o pH máximo.');
        return;
    }
    
    document.getElementById('min').value = min.toFixed(1)
    document.getElementById('max').value = max.toFixed(1)

    if(flagAnimation == 0)
    {
        document.getElementById('phMinAut').textContent = 0
        document.getElementById('phMaxAut').textContent = 0
        document.getElementById('setaMin').style.left = (0 / 14) * 100 + '%';
        document.getElementById('setaMax').style.left = (0 / 14) * 100 + '%';

        int = setInterval(function() {
            document.getElementById('phMinAut').textContent = min.toFixed(1)
            document.getElementById('phMaxAut').textContent = max.toFixed(1)
            document.getElementById('setaMin').style.left = (min.toFixed(1)/ 14) * 100 + '%';
            document.getElementById('setaMax').style.left = (max.toFixed(1) / 14) * 100 + '%';
        }, 1)

        flagAnimation = 1
    }

    else
    {        
        clearInterval(int)
        document.getElementById('phMinAut').textContent = min.toFixed(1)
        document.getElementById('phMaxAut').textContent = max.toFixed(1)
        document.getElementById('setaMin').style.left = (min.toFixed(1) / 14) * 100 + '%';
        document.getElementById('setaMax').style.left = (max.toFixed(1) / 14) * 100 + '%';
    }


    const payload = {msgType: 'modo', modo: "a", value: [parseFloat(min).toFixed(1), parseFloat(max).toFixed(1)]};
    mqttSend(JSON.stringify(payload))
}

function updatepHIndicator()
{
    setInterval(function() {
        var phatual = parseFloat(document.getElementById('mqttData').textContent)
        
        if(isNaN(phatual))
        {
            phatual = 0.0
        }
        
        document.getElementById('setaAtual').style.left = (phatual.toFixed(1) / 14) * 100 + '%';
        document.getElementById('phAtualAut').textContent = phatual .toFixed(1)

    }, 100);
}


document.getElementById("Btn-Aut").addEventListener("click", showAutPopup);
document.getElementById("Btn-Aut").addEventListener("click", updatepHIndicator());
document.getElementById("aut-popup-close").addEventListener("click", hideAutPopup);
document.getElementById("btnConfigAutFaixa").addEventListener("click", configurarFaixa);
