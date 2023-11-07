'''modoAtual = "m"
valorManualAlvo = 0
valorAutMin = 0
valorAutMax = 0

def setModoAtual(novoModo):
    modoAtual = novoModo
    
def getModoAtual():
    return modoAtual'''

class globalVars:
    modoAtual = None
    valorManualAlvo = 0
    valorAutMin = 0
    valorAutMax = 0
    
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
