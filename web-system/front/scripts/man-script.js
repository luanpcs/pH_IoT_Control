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
}

function sendManDown()
{
    const payload = {msgType: 'modo', modo: "m", value: 0};
    mqttSend(JSON.stringify(payload))
}

document.getElementById("man-popup-close").addEventListener("click", hideManPopup);
document.getElementById("Btn-Man").addEventListener("click", showManPopup);
document.getElementById("btnConfigManUp").addEventListener("click", sendManUp);
document.getElementById("btnConfigManDown").addEventListener("click", sendManDown);