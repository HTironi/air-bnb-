/*- Funcionalidades
    - Há um incremento de 20% no preço da diária por hospede adicional até o limite de 4 hóspedes
    - Os valores devem ser atualizados ao se escolher uma data de checkout ou se modificar o número de usuários
    - O valor da taxa de limpeza é fixo, a taxa de serviço do Airbnb é de 15% sobre o preço das diárias
    - Habilite o campo cupom de desconto o cupom tem o padrão OFF + quanto de desconto o cliente irá receber. Ex: OFF15, OFF40, OFF10
    - Utilize no lugar do campo quantidade de diárias um campo date para o dia da entrada e um campo date para o dia da saída*/
const cupons = ["OFF10", "OFF20", "OFF30", "OFF40", "OFF50"];
const noite = 620;
let precoTempo;
let hospedes;
let checkIn;
let checkOut;
let tempo;
let taxaHospedes;
let cupom;
let total;
let taxaLimpeza = 120;
let taxaBnb;
let desconto = 0;
let subTotal; 
let valorDesconto
function calcularNoite() {
  total = 0;
  event.preventDefault();
  hospedes= Number(document.getElementById("hospedes").value);
  taxaHospedes = (hospedes-1)*20/100
  checkIn = new Date(document.getElementById("in").value);
  checkOut = new Date(document.getElementById("out").value);
  tempo = (checkOut - checkIn) / 86400000;
  if (tempo <= 0) {
    document.getElementById("noite").textContent = "Datas inseridas invalidas.";
    return;
  }
  precoTempo = noite * tempo * (taxaHospedes+1);
  document.getElementById("noite").textContent = "R$" + noite +"x" + tempo + "Noites:";
  document.getElementById("noitePreco").textContent = "R$ " + precoTempo;

  document.getElementById("limpeza").textContent = "Taxa de Limpeza:";
  document.getElementById("limpezaPreco").textContent = "R$ " + taxaLimpeza;

  taxaBnb = precoTempo * 0.15;
  document.getElementById("servico").textContent = "Taxa de Serviço do Airbnb:";
  document.getElementById("servicoPreco").textContent = "R$ " + taxaBnb;

  cupom = document.getElementById("cupom").value.toUpperCase();
  for (const i in cupons) {
    if (cupom.toUpperCase() === cupons[i]) {

      desconto = Number(cupom.replace("OFF", ""));
      document.getElementById("cupomTexto").textContent =
        "Cupom Digitado Valido, Desconto de " + desconto + "%";
      break;
    } else if (cupom == "") {
    } else {
      document.getElementById("cupomTexto").textContent =
        "Cupom Digitado Invalido";
        desconto = 0;
    }
  }

  valorDesconto = (precoTempo + taxaBnb + taxaLimpeza)*(desconto/100);
  subTotal = precoTempo + taxaBnb + taxaLimpeza;
  total = subTotal - valorDesconto;
  document.getElementById("total").textContent = "Total sem impostos:";
  document.getElementById("totalPreco").textContent = "R$ " + total.toFixed(2);
}
