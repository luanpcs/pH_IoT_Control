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
