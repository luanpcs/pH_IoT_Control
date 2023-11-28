from globalVars import globalVars
from pumpsControl import *
from pHMeassureModule import readSensorData
import time
from MQTT_Module import MQTT_Pub
import json

gVars = globalVars()

def aut():
    if(gVars.getModoAtual() == "a"):
        if(gVars.getValorAsyncTrigger()):
            if(gVars.millis() >= gVars.getValorFinalTime()):
                while gVars.getSerialBusy() == True:
                    time.sleep(0.1)
                    
                if gVars.getSerialBusy() == False:
                    gVars.setSerialBusy(True)
                    time.sleep(2)
                    currentpHValue = readSensorData()
                    
                    print(gVars.getValorAutMin(), currentpHValue, gVars.getValorAutMax())
                    
                    if(gVars.getValorAutMin() <= currentpHValue <=  gVars.getValorAutMax()):
                        print("pH aut ok")
                        pumpsIdle()
                        gVars.setValorAsyncTrigger(False)
                        
                    elif(gVars.getValorAutMin() > currentpHValue):
                        payload = {"msgType": "alert", "value": f"pH inferior a {gVars.getValorAutMin()}"}
                        MQTT_Pub(json.dumps(payload))
                        pumpUpTrigger()
                        gVars.setValorAsyncTrigger(False)
                        
                    elif(gVars.getValorAutMax() < currentpHValue):
                        payload = {"msgType": "alert", "value": f"pH superior a {gVars.getValorAutMax()}"}
                        MQTT_Pub(json.dumps(payload))
                        print("PumpDown trigger")
                        pumpDownTrigger()
                        gVars.setValorAsyncTrigger(False)
                        
                    gVars.setSerialBusy(False)
            
        else:
            gVars.setValorStartTime(gVars.millis())
            gVars.setValorFinalTime(gVars.getValorStartTime() + (gVars.getValorPumpsIntervalTrigger() * 1000))
            gVars.setValorAsyncTrigger(True)
            pumpUpOFF()
            # print(gVars.getValorStartTime(), "E", gVars.getValorFinalTime())