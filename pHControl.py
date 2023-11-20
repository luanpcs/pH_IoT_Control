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
    from manControl import manual
    from pumpsControl import pumpsInit
    
    pumpsInit()
    mqtt_thread = threading.Thread(target=mqtt_loop)
    sendPHValue = threading.Thread(target=sendpHValue)
    mqtt_thread.start()
    time.sleep(2)
    MQTT_Pub("Raspberry listening...")
    
    sendPHValue.start()
    while 1:
        aut()
        manual()

def sendpHValue():
    from MQTT_Module import MQTT_Pub
    while 1:
        time.sleep(2)
        while gVars.getSerialBusy() == True:
            time.sleep(0.1)
            
        if gVars.getSerialBusy() == False:
            gVars.setSerialBusy(True)
            payload = {"msgType": "phValue", "value": readSensorData()}
            MQTT_Pub(json.dumps(payload))
            gVars.setSerialBusy(False)

    
def onMessage(msg):
    from MQTT_Module import MQTT_Pub
    
    msgType = json.loads(msg)['msgType']

    if msgType == 'modo':
        modo = json.loads(msg)['modo']
        value = json.loads(msg)['value']
        
        gVars.setModoAtual(modo)
        
        if modo == 'a':
            print("Modo automatico [", value[0], ",", value[1], "]" )
            gVars.setValorAutMin(value[0])
            gVars.setValorAutMax(value[1])

        elif modo == 'm':
            print("Modo manual: ", value)
            gVars.setValorManualDir(value)
            
        else:
            print('Modo nao reconhecido')
            
        '''print("Modo atual:", gVars.getModoAtual())
        print("Dir manual:", gVars.getValorManualDir())
        print("VAut1", gVars.getValorAutMin())
        print("VAut2", gVars.getValorAutMax())'''

    elif msgType == "reqValue":
        payload = {"msgType": "phValue", "value": readSensorData()}
        MQTT_Pub(json.dumps(payload))
        print("pH enviado ao sistema web")
        
if __name__ == "__main__":
    main()