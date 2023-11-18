from globalVars import globalVars
import time

gVars = globalVars()
i = 0

def aut():
    if(gVars.getModoAtual() == "a"):
        if(gVars.getValorAsyncTrigger()):
            if(gVars.millis() >= gVars.getValorFinalTime()):
                gVars.setValorAsyncTrigger(False)
                print("Acabou")
            
        else:
            gVars.setValorStartTime(gVars.millis())
            gVars.setValorFinalTime(gVars.getValorStartTime() + 1000)
            gVars.setValorAsyncTrigger(True)
            print(gVars.getValorStartTime(), "E", gVars.getValorFinalTime())