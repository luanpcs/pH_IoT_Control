import { sendId, getAllDevices, registerUser, login, savePH } from './requests.js';
import { mqttInit } from './mqtt.js';
export function hidePopups() {
    hideRegistrosPopup();
    hideAlertasPopup();
    gerarGrafico()
    mqttInit()
    savePH()
    setInterval(sendId, 1000); // 1000 milissegundos = 1 segundo

    /* 
    login("user", "password")
    registerUser("user", "password"); 
    */
}

window.onload = hidePopups

