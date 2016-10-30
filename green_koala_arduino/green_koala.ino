#include "DHT.h"
#include <Adafruit_Sensor.h>
 
#define DHTPIN A1 // pino que estamos conectado
#define SOLOSENSORPIN A0
#define DIRECAOPIN A2
#define VELOCPIN A3
#define DHTTYPE DHT11 // DHT 11
 
// Conecte pino 1 do sensor (esquerda) ao +5V
// Conecte pino 2 do sensor ao pino de dados definido em seu Arduino
// Conecte pino 4 do sensor ao GND
// Conecte o resistor de 10K entre pin 2 (dados) 
// e ao pino 1 (VCC) do sensor
DHT dht(DHTPIN, DHTTYPE);
float umidadeValue = 0; // variable to store the value coming from the sensor
float umidadeMax = 730;
float umidadeMin = 530;
float umidadeValueR = 0;
float angulo = 0;
float velocidade = 0;

void setup(){
  Serial.begin(9600);
  dht.begin();
}
 
void loop(){
  // Sensor de umidade e temperatura do ar
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  // testa se retorno é valido
     
  //Direcao do vento utilizando o potenciometro
  angulo = map(analogRead(DIRECAOPIN), 0, 1023, -135, 135);
  Serial.print("<leitura>");
  Serial.print("<direcao_vento>");
  Serial.print(angulo); 
  Serial.print("<\direcao_vento>");
   
  velocidade = 0;
  
  for(int i = 0; i < 10;i++){
    velocidade += analogRead(VELOCPIN);     
  } 
  Serial.print("<velocidade_vento>");
  Serial.print(velocidade / 10);
  Serial.print("</velocidade_vento>");
  
  //Temperatura e umidade do ar utilizando o DHT
  
  if(isnan(t) || isnan(h)){
    h = t = 0;
  } 
    Serial.print("<umidade_ar>");
    Serial.print(h);
    Serial.print("</umidade_ar>");
    Serial.print("<temperatura>");
    Serial.print(t);
    Serial.print("</temperatura>");
  
  //Umidade do solo utilizando o modulo sensor SEN92355P
  umidadeValue = analogRead(SOLOSENSORPIN);  
  umidadeValueR = umidadeValue - umidadeMin;
  umidadeValueR = 100*umidadeValueR/(umidadeMax-umidadeMin);
  
    Serial.print("<umidade_terra>");
  if (umidadeValue > umidadeMin)
    Serial.print(umidadeValueR);
  else
    Serial.print("0");
    Serial.print("</umidade_terra>");
    
  //ideal: entre 75 e 80
    
    Serial.print("</leitura>\n");  
   //Intervalo entre cada envio de dados
   delay(20000);
   
   
}
