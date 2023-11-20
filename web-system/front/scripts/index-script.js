import { sendId, getAllDevices, registerUser, login, savePH } from './requests.js';
import { mqttInit } from './mqtt.js';
import { hideAutPopup } from './aut-script.js';

export function hidePopups() {

    var setaAtualElement = document.getElementById('setaAtual');
    var textoAutAtual = document.getElementsByClassName('texto3');

    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    if (screenWidth > 1400) 
    {
        setaAtualElement.style.marginTop = '2vh';
    } 
    else 
    {
        setaAtualElement.style.bottom = '4.8vh';

        for (var i = 0; i < textoAutAtual.length; i++) {
            textoAutAtual[i].style.marginTop = '-1vh'; 
        }
    }

    hideRegistrosPopup();
    hideAlertasPopup();
    hideAutPopup()
    gerarGrafico()
    mqttInit()
}

window.onload = hidePopups

