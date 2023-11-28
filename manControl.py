from globalVars import globalVars
from pumpsControl import *
from pHMeassureModule import readSensorData
import time

gVars = globalVars()

def manual():
    if(gVars.getModoAtual() == "m"):
        if(gVars.getValorAsyncTrigger()):
            if(gVars.millis() >= gVars.getValorFinalTime()):
                currentDir = gVars.getValorManualDir()
                
                if(currentDir == 0):
                    print("PumpDown trigger")
                    pumpDownTrigger()
                    gVars.setValorAsyncTrigger(False)
                    gVars.setValorManualDir(-1)
                    
                elif(currentDir == 1):
                    print("PumpUp trigger")
                    pumpUpTrigger()
                    gVars.setValorAsyncTrigger(False)
                    gVars.setValorManualDir(-1)
            
        else:
            gVars.setValorStartTime(gVars.millis())
            gVars.setValorFinalTime(gVars.getValorStartTime() + (gVars.getValorPumpsIntervalTrigger() * 1000))
            gVars.setValorAsyncTrigger(True)
            pumpUpOFF()
            pumpDownOFF()
            # print(gVars.getValorStartTime(), "E", gVars.getValorFinalTime())