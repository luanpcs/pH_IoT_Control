import { novoAlerta, novoRegistro } from './requests.js';
import { hideAlertasPopup } from './alertas-script.js';
import { hideRegistrosPopup } from './registros-script.js';
import { hidePreReportPopup, hideReportPopup } from './report-script.js';
import { mqttInit } from './mqtt.js';
import { hideAutPopup } from './aut-script.js';
import { hideManPopup } from './man-script.js';

export function hidePopups() {
    var setaAtualAut = document.getElementById('setaAtual');
    var setaAtualMan = document.getElementById('setaAtualMan');
    var textoAutAtual = document.getElementsByClassName('texto3');
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 1400) {
        setaAtualAut.style.marginTop = '2vh';
        setaAtualMan.style.marginTop = '2vh';
    }
    else {
        setaAtualAut.style.bottom = '4.8vh';
        setaAtualMan.style.bottom = '0vh';

        for (var i = 0; i < textoAutAtual.length; i++) {
            textoAutAtual[i].style.marginTop = '-1vh';
        }
    }

    hideRegistrosPopup();
    hideAlertasPopup();
    hideAutPopup()
    hideManPopup()
    hideReportPopup()
    hidePreReportPopup()
    gerarGrafico()
    mqttInit()
    
    // novoRegistro("Acidificante adicionado")
    // novoRegistro("Alcanilizante adicionado")
    // novoRegistro("Modo automático ativado")
    // novoRegistro("Modo manual ativado")

    // novoAlerta("pH inferior a 6.8")
    // novoAlerta("pH superior a 7.5")
    // novoAlerta("pH inferior a 6.1")
    // novoAlerta("pH superior a 9.7")

}

window.onload = hidePopups

