from globalVars import globalVars
from pumpsControl import *
from pHMeassureModule import readSensorData
import time

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
                    strpH = readSensorData()
                    currentpHValue = 0
                    if(strpH != ''):
                        currentpHValue = float(strpH)
                    print(gVars.getValorAutMin(), currentpHValue, gVars.getValorAutMax())
                    
                    if(gVars.getValorAutMin() <= currentpHValue <=  gVars.getValorAutMax()):
                        print("pH aut ok")
                        pumpsIdle()
                        gVars.setValorAsyncTrigger(False)
                        
                    elif(gVars.getValorAutMin() > currentpHValue):
                        print("PumpUp trigger")
                        pumpUpTrigger()
                        gVars.setValorAsyncTrigger(False)
                        
                    elif(gVars.getValorAutMax() < currentpHValue):
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