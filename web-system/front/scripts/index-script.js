import { sendId, getAllDevices, registerUser, login, savePH, getConfigurations  } from './requests.js';
import {hideConfiguracoesPopup, saveNewConfigurations, updateConfigInfos } from './configuracoes-script.js';
import { mqttInit } from './mqtt.js';
export function hidePopups() {
    hideRegistrosPopup();
    hideAlertasPopup();
    hideConfiguracoesPopup();
    gerarGrafico()
    mqttInit()
    savePH()

    getConfigurations()
    .then(configurations => {
        updateConfigInfos(configurations);
    })
    .catch(error => console.error("Erro ao obter configurações:", error));

    //setInterval(sendId, 1000); // 1000 milissegundos = 1 segundo

    /* 
    login("user", "password")
    registerUser("user", "password"); 
    */
}

window.onload = hidePopups
window.saveNewConfigurations = saveNewConfigurations;
