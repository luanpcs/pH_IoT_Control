#define requestPin 9
#define ledPin 13
int requestState = 0;
float valor_calibracao = 21.09 + 4;   // Fator de calibração
int contagem = 0;           // Variável de contagem
float soma_tensao = 0;      // Variável para soma de tensão
float media = 0;            // Variável que calcula a media
float in;           // Variável de leitura do pino A0
float tensao;               // Variável para conversão em tensão

void setup() {
  pinMode(requestPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  soma_tensao = 0;   // Inicia soma_tensão em 0
  contagem = 0;      // Inicia a contagem em 0
 
  while (contagem < 10) {                   // Executa enquanto contagem menor que 10
    in = analogRead(A6);            // Lê a entrada analógica
    tensao = (in * 5.0) / 1024.0;   // Converte em tensão, o valor lido
    soma_tensao = (soma_tensao + tensao);   // Soma a tensão anterior com a atual
    contagem++;                             // Soma 1 à variável de contagem
    delay(100);                             // Aguarda para próxima leitura
  }
 
  media = soma_tensao / 10;                 // Calcula a média das leituras
 
  float valor_pH = -5.7 * media + valor_calibracao;    // Calcula valor de pH

  int pinState = digitalRead(requestPin);

  if (!requestState && pinState) {
    Serial.println(String(valor_pH, 1));
    digitalWrite(ledPin, HIGH);
    delay(50);
    digitalWrite(ledPin, LOW);
    requestState = true;
  }

  if (requestState && !pinState) {
    requestState = false;
  }
}
