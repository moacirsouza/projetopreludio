//let price = 5.00;
let price = 3.26;

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// Variables related to the various HTML elements
const cashInput = document.getElementById("cash");
const button = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");
const drawerDisplay = document.getElementById("drawer");
const message = document.getElementById("message");

// Auxiliary array with each monetary unit, already multiplied by 100 and
// reversed in comparison to the original 'cid'
const monetaryUnits = [ 10000, 2000, 1000, 500, 100, 25, 10, 5, 1 ]

/**
 * currencyConverter: Converts a float point number into an array. In the
 * array, the integer and fractional parts become the first and second items,
 * respectively. The input may already be a float number or a string. The
 * decimal point separator might be a comma (,) or a dot (.).
 *
 * Examples:
 * currencyConverter(1)      // Expected output: [1, 0]
 * currencyConverter('6')    // Expected output: [6, 0]
 * currencyConverter("1.3")  // Expected output: [1, 3]
 * currencyConverter('2,32') // Expected output: [2, 32]
 */
const currencyConverter = (inputValue) => {

  let currencyArray = inputValue
                      .toString()
                      .replace(',', '.')
                      .split('.')
                      .map( e => e.replace(/[^0-9]/gi,'') );

  // Number validations
  if ( currencyArray.length > 2 ) {
    alert("Formato incorreto. Verifique a quantidade de vírgulas ou pontos!");
    return;
  }

  // If a single number is given, explicitly fill the decimal part with a zero 
  if ( currencyArray.length == 1 ) {
    currencyArray[1] = "0";
  }

  // console.log(currencyArray);
  // If a 'short-format' float point is given, like '.5' or '1.', explicitly 
  // fill the other part with a zero
  currencyArray = currencyArray.map( e => e.length === 0?e="0":e );

  // Ensures that the decimal part of the number doesn't have more than two
  // digits
  currencyArray[1] = currencyArray[1]
                     .substring(0, 2)

  return currencyArray.map( e => parseInt(e) );
}

/**
 * Several tests for the currencyConverter function
 */
const caTest = () => { 
  [
    1,
    '2,3',
    "76,45",
    6.87,
    "asdasda123.asdaswee2312312",
    " "
  ].forEach( e => console.log( currencyConverter(e) ) );
}

// caTest();

/**
 * owa: operations with arrays
 * a1 = primeiro array
 * a2 = segundo array
 * op = operação ( add, sub, mul, div )
 */
const owa = ( a1, a2, op ) => {
  
  a1 = currencyConverter(a1);
  a2 = currencyConverter(a2);
  volteAmanha = "Função ainda não implementada. Volte amanhã :D";

  switch (op){
    case "add":
      integerPart = a1[0] + a2[0];
      fractionalSum = a1[1] + a2[1]
      integerPart += Math.trunc( fractionalSum / 100 );
      fractionalPart = ( fractionalSum ) % 100;

  //    result = [ integerPart , fractionalPart ];
    break;
    case "sub":
      integerPart = a1[0] - a2[0];
      fractionalPart = a1[1] - a2[1];

      if ( fractionalPart < 0 ) {
        fractionalPart -= -100;
        integerPart -= 1;
      }

    break;
    case "mul":
      console.log(volteAmanha);
    break;
    case "div":
      console.log(volteAmanha);
    break;
    default:
      alert("Operação inválida! Use: 'add', 'sub', 'mul' ou 'div'");
      result = undefined;
      return result;
  };

  result = [ integerPart, fractionalPart ];

  return parseFloat( result.join('.') );
}

/**
 * Several tests for the owa function
 */
const owaTest = () => { 
  [
    [ [1, 0], ['2', '3'], 'add' ],    // Addition
    [ [20, '45'], [12, 80], 'sub' ],  // Subtraction
    [ [1, 0], ['2', '3'], 'bla' ]     // Invalid operation
  ].forEach( e => console.log( owa(e[0], e[1], e[2]) ) );
}

// owaTest();

// let breakCid = cid.reduce((acc, cv) => acc + currencyConverter(cv[1], 0), 0);
// let toEmptyCid = currencyConverter(breakCid, 1) + price;

priceDisplay.innerHTML = `${price}`; //<br />${toEmptyCid}`;
// cashInput.value=toEmptyCid;

const changeCalculator = (itemPrice, cidValue, givenCash) => {

  givenCash = currencyConverter(givenCash, 0);

  console.log(givenCash);
  message.innerHTML = "";

  if(isNaN(givenCash)){
    message.innerHTML += "OPEN: Please enter a valid monetary value.";
    // cashInput.value = "";
    return;
  }

  // Creates a reversed copy of the cid array with all its numeric
  // values multiplied by 100
  let cidInteger = cidValue
                   .map(e => [e[0], currencyConverter(e[1], 0)])
                   .toReversed();
    
  const productPrice = currencyConverter(itemPrice, 0);
  
  if(givenCash < productPrice){
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  }

  if(givenCash === productPrice){
    message.innerHTML = "No change due - customer paid with exact cash";
    //changeDue.innerHTML = "No change due - customer paid with exact cash";
    return;
  }

  let change = givenCash - productPrice;
  let totalCID = cidInteger
                 .reduce((accumulator, currentValue) =>
                          accumulator + currentValue[1], 0);

  if(change === totalCID){
    message.innerHTML = "CLOSED";
  }

  if(message.innerHTML === "INSUFFICIENT_FUNDS"){
    return;
  }

  // console.log(`${givenCash} - ${productPrice} - ${change} - ${totalCID} - ${status}`);
  // console.log("Se passar, está errado (ou não)!")
  // return;

  const result = [];
  let partialResult;
  let possibleChange = cidInteger
                       .filter((_, i) => monetaryUnits[i] <= change)
                       .reduce((acc, curr) => acc + curr[1], 0);

  for(let index = 0; index < cidInteger.length; index++){
    if(possibleChange < change){
      message.innerHTML = "INSUFFICIENT_FUNDS";
    }else if(change >= monetaryUnits[index] && cidInteger[index][1] > 0){
      if(change >= cidInteger[index][1]){
        change -= cidInteger[index][1];
        partialResult = cidInteger[index][1];
        cidInteger[index][1] = 0;
      }else{
        partialResult = Math.floor(change/monetaryUnits[index])*monetaryUnits[index];
        cidInteger[index][1] -= partialResult;
        change %= monetaryUnits[index];
      }
      result.push([cidInteger[index][0], currencyConverter(partialResult, 1)]);
    }

    if(change === 0){
      break;
    }
  }
  
  /*
  console.log("CID INTEGER: \n" + cidInteger);
  console.log("CID VALUE: \n" + cidValue);
  return;
  */

  cid = cidInteger.map(e => [e[0], currencyConverter(e[1], 1)]).toReversed();
// 1. título - E o colspan? Não pode ser sempre 3!
// 2. quantidade de 
/*
let cidTable = "<table><tr><th colspan=3>Drawer</th><tr>";

cid.forEach((e, i) => {
  const tdGroup = `<td>${e.join(': $')}</td>`
  if ( i > 0 && i%3 === 0){
    cidTable += `</tr><tr>${tdGroup}`
  }else{
    cidTable += `${tdGroup}`
  }
});

cidTable += "</tr></table>";
drawerDisplay.innerHTML = cidTable;
*/

// Versão antiga do Register Display
  // drawerDisplay.innerHTML = `<strong>Change in Drawer: </strong>
  //                              <br />${cid.map(item => item.join(': $')).join("<br />")}`;

  changeDue.innerHTML = `Status: ${status}<br />
                         ${result.map( item => item.join(': $') ).join('<br>') }`;

  drawerDisplay.innerHTML = `<strong>Change in Drawer: </strong>
                                <br />${cid.map(item => item.join(': $')).join("<br />")}`;

};

button.addEventListener("click", () => {
  changeCalculator(price, cid, cashInput.value);
});

cashInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    changeCalculator(price, cid, cashInput.value);
  }
});

// price = 19.5
// cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
