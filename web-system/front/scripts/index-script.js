import { sendId, getAllDevices, registerUser, login, savePH } from './requests.js';
import { mqttInit } from './mqtt.js';
export function hidePopups() {
    hideRegistrosPopup();
    hideAlertasPopup();
    gerarGrafico()
    mqttInit()
}

window.onload = hidePopups

