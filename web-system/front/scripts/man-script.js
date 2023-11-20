import { mqttSend } from './mqtt.js';

function showManPopup() {
    const popup = document.getElementById("man-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);
    
    document.body.style.overflow = "hidden";
    updatepHIndicator()
}

export function hideManPopup() {
    const popup = document.getElementById("man-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 10);
    
    document.body.style.overflow = "auto";
}

function updatepHIndicator()
{
    setInterval(function() {
        var phatual = parseFloat(document.getElementById('mqttData').textContent)
        
        if(isNaN(phatual))
        {
            phatual = 0.0
        }
        
        document.getElementById('setaAtualMan').style.left = (phatual.toFixed(1) / 14) * 100 + '%';
        document.getElementById('phAtualMan').textContent = phatual .toFixed(1)
    }, 100);
}

function sendManUp()
{
    const payload = {msgType: 'modo', modo: "m", value: 1};
    mqttSend(JSON.stringify(payload))
    contagemUp()
}

function sendManDown()
{
    const payload = {msgType: 'modo', modo: "m", value: 0};
    mqttSend(JSON.stringify(payload))
    contagemDown()
}

function contagemUp() {
    var btn = document.getElementById('btnConfigManUp');
    var btn2 = document.getElementById('btnConfigManDown');

    var bar = document.createElement('div');
    bar.className = 'barUp';

    var textLayer = document.createElement('div');
    textLayer.className = 'textBarra';
    textLayer.innerHTML = 'Aumentar pH'; 

    btn.textContent = ''
    btn.appendChild(bar);
    btn.appendChild(textLayer);

    btn.disabled = true;
    btn2.disabled = true;

    var segundos = 5;
    var intervalo = setInterval(function () {
        var progresso = ((5 - segundos) / 5) * 100;
        bar.style.width = progresso + '%';
        
        if (segundos < 0) {
            clearInterval(intervalo);
            btn.removeChild(bar);
            btn.removeChild(textLayer);
            btn.textContent = 'Aumentar pH'
            btn.disabled = false; 
            btn2.disabled = false;
        }
        segundos--;
    }, 1000);
}

function contagemDown() {
    var btn = document.getElementById('btnConfigManDown');
    var btn2 = document.getElementById('btnConfigManUp');

    var bar = document.createElement('div');
    bar.className = 'barDown';

    var textLayer = document.createElement('div');
    textLayer.className = 'textBarra';
    textLayer.innerHTML = 'Diminuir pH'; 

    btn.textContent = ''
    btn.appendChild(bar);
    btn.appendChild(textLayer);

    btn.disabled = true;
    btn2.disabled = true;

    var segundos = 5;
    var intervalo = setInterval(function () {
        var progresso = ((5 - segundos) / 5) * 100;
        bar.style.width = progresso + '%';
        
        if (segundos < 0) {
            clearInterval(intervalo);
            btn.removeChild(bar);
            btn.removeChild(textLayer);
            btn.textContent = 'Diminuir pH'
            btn.disabled = false; 
            btn2.disabled = false;
        }
        segundos--;
    }, 1000);
}


document.getElementById("man-popup-close").addEventListener("click", hideManPopup);
document.getElementById("Btn-Man").addEventListener("click", showManPopup);
document.getElementById("btnConfigManUp").addEventListener("click", sendManUp);
document.getElementById("btnConfigManDown").addEventListener("click", sendManDown);