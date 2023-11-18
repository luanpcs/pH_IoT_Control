from globalVars import globalVars
from pumpsControl import *
from pHMeassureModule import readSensorData
import time

gVars = globalVars()
i = 0

def aut():
    if(gVars.getModoAtual() == "a"):
        if(gVars.getValorAsyncTrigger()):
            # print(int((gVars.getValorFinalTime() - gVars.millis())/1000.0))
            if(gVars.millis() >= gVars.getValorFinalTime()):
                strpH = readSensorData()
                currentpHValue = 0
                if(strpH != ''):
                    currentpHValue = float(strpH)
                print(gVars.getValorAutMin(), currentpHValue, gVars.getValorAutMax())
                
                if(gVars.getValorAutMin() <= currentpHValue <=  gVars.getValorAutMax()):
                    print("pH aut ok")
                    
                elif(gVars.getValorAutMin() > currentpHValue):
                    print("PumpUp trigger")
                    pumpUpTrigger()
                    gVars.setValorAsyncTrigger(False)
                    
                elif(gVars.getValorAutMax() < currentpHValue):
                    print("PumpDown trigger")
                    pumpDownTrigger()
                    gVars.setValorAsyncTrigger(False)
            
        else:
            gVars.setValorStartTime(gVars.millis())
            gVars.setValorFinalTime(gVars.getValorStartTime() + 1000)
            gVars.setValorAsyncTrigger(True)
            pumpUpOFF()
            # print(gVars.getValorStartTime(), "E", gVars.getValorFinalTime())