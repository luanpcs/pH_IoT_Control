import paho.mqtt.client as mqtt
import threading
import time
import json
import RPi.GPIO as GPIO

from pHMeassureModule import readSensorData
from globalVars import globalVars

gVars = globalVars()

def main():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(32, GPIO.OUT)
    GPIO.setup(33, GPIO.OUT)
    GPIO.output(32, GPIO.LOW)
    GPIO.output(33, GPIO.LOW)
    
    from MQTT_Module import mqtt_loop, MQTT_Pub
    from autControl import aut
    from manControl import manual
    from pumpsControl import pumpsInit, pumpUpTrigger, pumpUpOFF, pumpDownOFF
    
    pumpsInit()
    mqtt_thread = threading.Thread(target=mqtt_loop)
    sendPHValue = threading.Thread(target=sendpHValue)
    mqtt_thread.start()
    time.sleep(2)
    MQTT_Pub("Raspberry listening...")
    
    sendPHValue.start()
    
    pumpUpOFF()
    pumpDownOFF()
    
    while 1:
        aut()
        manual()

def sendpHValue():
    from MQTT_Module import MQTT_Pub
    while 1:
        time.sleep(3)
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
    print(msg)

    if msgType == 'modo':
        modo = json.loads(msg)['modo']
        value = json.loads(msg)['value']
        
        gVars.setModoAtual(modo)
        
        if modo == 'a':
            print("Modo automatico [", value[0], ",", value[1], "]" )
            payload = {"msgType": "reg", "value": "Modo automático ativado"}
            MQTT_Pub(json.dumps(payload))
            gVars.setValorAutMin(value[0])
            gVars.setValorAutMax(value[1])

        elif modo == 'm':
            print("Modo manual: ", value)
            payload = {"msgType": "reg", "value": "Modo manual ativado"}
            MQTT_Pub(json.dumps(payload))
            gVars.setValorManualDir(value)
            
        else:
            print('Modo nao reconhecido')

    elif msgType == "reqValue":
        payload = {"msgType": "phValue", "value": readSensorData()}
        MQTT_Pub(json.dumps(payload))
        print("pH enviado ao sistema web")
        
    elif msgType == 'fill':
        from pumpsControl import pumpUpOFF, pumpDownOFF, pumpDownON, pumpUpON
        
        pump = json.loads(msg)['pump']
        pos = json.loads(msg)['pos']
        
        if pump == 'u':
            if pos == "0":
                pumpUpOFF()
            elif pos == "1":
                pumpUpON()
        elif pump == 'd':
            if pos == "0":
                pumpDownOFF()
            elif pos == "1":
                pumpDownON()
            
        
if __name__ == "__main__":
    main()