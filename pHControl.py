import paho.mqtt.client as mqtt
import threading
import time
import json

from pHMeassureModule import readSensorData
from globalVars import globalVars

gVars = globalVars()

def main():
    from MQTT_Module import mqtt_loop, MQTT_Pub
    from autControl import aut
    from pumpsControl import pumpsInit
    
    mqtt_thread = threading.Thread(target=mqtt_loop)
    mqtt_thread.start()
    time.sleep(2)
    MQTT_Pub("Raspberry listening...")
    pumpsInit()
    while 1:
        '''payload = {"msgType": "phValue", "value": float(readSensorData())}
        MQTT_Pub(json.dumps(payload))
        print("pH enviado ao sistema web")'''
        time.sleep(1.5)
        aut()
    
def onMessage(msg):
    from MQTT_Module import MQTT_Pub
    
    msgType = json.loads(msg)['msgType']

    print(msg)

    if msgType == 'modo':
        modo = json.loads(msg)['modo']
        value = json.loads(msg)['value']

        if modo == 'a':
            gVars.setModoAtual(modo)
            gVars.setValorAutMin(value[0])
            gVars.setValorAutMax(value[1])

        elif modo == 'm':
            gVars.setModoAtual(modo)
            gVars.setValorManualDir(value)
            
        else:
            print('Modo nao reconhecido')
            
        print("Modo atual:", gVars.getModoAtual())
        print("VManual:", gVars.getValorManualAlvo())
        print("VAut1", gVars.getValorAutMin())
        print("VAut2", gVars.getValorAutMax())

    elif msgType == "reqValue":
        payload = {"msgType": "phValue", "value": float(readSensorData())}
        MQTT_Pub(json.dumps(payload))
        print("pH enviado ao sistema web")
        
if __name__ == "__main__":
    main()