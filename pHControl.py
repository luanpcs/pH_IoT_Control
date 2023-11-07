# 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

import paho.mqtt.client as mqtt
import threading
import time

from pHMeassureModule import readSensorData
modoAtual = "m"
valorManualAlvo = 0
valorAutMin = 0
valorAutMax = 0

def main():
    from MQTT_Module import mqtt_loop, MQTT_Pub
    mqtt_thread = threading.Thread(target=mqtt_loop)
    mqtt_thread.start()
    time.sleep(2)
    MQTT_Pub("Raspberry listening...")
    
def onMessage(msg):
    from MQTT_Module import MQTT_Pub
    import json
    global modoAtual
    global valorManualAlvo
    global valorAutMin
    global valorAutMax
    
    msgType = json.loads(msg)['msgType']
    value = json.loads(msg)['value']
    
    if msgType == 'modo':
        if value == 'a':
            modoAtual = value
            
        elif value == 'm':
            modoAtual = value
            
        else:
            print('Modo nao reconhecido')
            
        print("Modo atual:", modoAtual) 
            
    elif msgType == 'mValue':
        valorManualAlvo = value
        print("Valor alvo [MAN]:", valorManualAlvo)
    
    elif msgType == "aValue":
        valorAutMin = value[0]
        valorAutMax = value[1]
        
        print("Valores alvos [AUT]:", valorAutMin, "e", valorAutMax)
        
    elif msgType == "reqValue":
        payload = {"msgType": "phValue", "value": int(readSensorData())}
        MQTT_Pub(json.dumps(payload))
        print("pH enviado ao sistema web")
        
            
     

if __name__ == "__main__":
    main()