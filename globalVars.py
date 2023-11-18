import time

class globalVars:
    modoAtual = None
    valorManualAlvo = 0
    valorAutMin = 0
    valorAutMax = 0
    startTime = 0
    finalTime = 0
    asyncTrigger = False
    
    @classmethod
    def setModoAtual(cls, novoModo):
        cls.modoAtual = novoModo
    
    @classmethod
    def getModoAtual(cls):
        return cls.modoAtual

    @classmethod
    def setValorManualAlvo(cls, novoValor):
        cls.valorManualAlvo = novoValor
    
    @classmethod
    def getValorManualAlvo(cls):
        return cls.valorManualAlvo

    @classmethod
    def setValorAutMin(cls, novoValor):
        cls.valorAutMin = novoValor
    
    @classmethod
    def getValorAutMin(cls):
        return cls.valorAutMin

    @classmethod
    def setValorAutMax(cls, novoValor):
        cls.valorAutMax = novoValor
    
    @classmethod
    def getValorAutMax(cls):
        return cls.valorAutMax
    
    @classmethod
    def setValorStartTime(cls, novoValor):
        cls.startTime = novoValor
    
    @classmethod
    def getValorStartTime(cls):
        return cls.startTime
    
    @classmethod
    def setValorFinalTime(cls, novoValor):
        cls.finalTime = novoValor
    
    @classmethod
    def getValorFinalTime(cls):
        return cls.finalTime
    
    @classmethod
    def setValorAsyncTrigger(cls, novoValor):
        cls.asyncTrigger = novoValor
    
    @classmethod
    def getValorAsyncTrigger(cls):
        return cls.asyncTrigger
    
    @classmethod
    def millis(cls):
        return int(round(time.time() * 1000))