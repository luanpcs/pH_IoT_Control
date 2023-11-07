#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

import paho.mqtt.client as mqtt
import threading
import time

from pHMeassureModule import readSensorData
from globalVars import globalVars

gVars = globalVars()

def main():
    from MQTT_Module import mqtt_loop, MQTT_Pub
    mqtt_thread = threading.Thread(target=mqtt_loop)
    mqtt_thread.start()
    time.sleep(2)
    MQTT_Pub("Raspberry listening...")
    
def onMessage(msg):
    import json
    from MQTT_Module import MQTT_Pub
    
    msgType = json.loads(msg)['msgType']
    value = json.loads(msg)['value']
    
    if msgType == 'modo':
        if value == 'a':
            gVars.setModoAtual(value)
            
        elif value == 'm':
            gVars.setModoAtual(value)
            
        else:
            print('Modo nao reconhecido')
            
        print("Modo atual:", gVars.getModoAtual())
        
            
    elif msgType == "aValue":
        if modoAtual == 'a':
            gVars.setValorAutMin(value[0])
            gVars.setValorAutMax(value[1])

            # controlAut(valorAutMin, valorAutMax)

            print("Valores alvos [AUT]:", gVars.getValorAutMin(), "e", gVars.setValorAutMax())

    elif msgType == 'mValue':
        if modoAtual == 'm':
            valorManualAlvo = value

            print("Valor alvo [MAN]:", valorManualAlvo)
        
    elif msgType == "reqValue":
        payload = {"msgType": "phValue", "value": int(readSensorData())}
        MQTT_Pub(json.dumps(payload))
        print("pH enviado ao sistema web")
        
if __name__ == "__main__":
    main()