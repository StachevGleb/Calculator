let display = document.getElementById('input');
let btnWrap = document.getElementById('btnWrapper');
let changeableBtn = document.getElementById('changeableBtn');
let topBtn = document.getElementById('topBtn');
let bottomBtn = document.getElementById('bottomBtn');
let backSpaceBtn = document.getElementById('backSpaceBtn');
let bracketsBut = document.getElementsByClassName('brackets');
let counterClick = 0;
createBtn();

//створення кнопок.
function createBtn() {
    for (let i = 0; i < 9; i++) {
        btnWrap.innerHTML += `<button dataBtn="${i + 1}" id="${i + 1}" class="button${i + 1} button"><p class="pNum">${i + 1}</p></button>`
    }
    btnWrap.innerHTML += `<button dataBtn="0" class="button">0</button>`;
    btnWrap.innerHTML += `<button dataBtn="." id="point" class="button">.</button>`;
    btnWrap.innerHTML += `<button dataBtn="=" class="buttonEqual" id="resultBtn">=</button>`;
    topBtn.innerHTML += `<button dataBtn1="CE" class="operBtnStyle ce" id="Ce">CE</button>`;
    topBtn.innerHTML += `<button class="operBtnStyle addmenu" id="addMenu">...</button>`;
    topBtn.innerHTML += `<button dataBtn="(" class="brackets operBtnStyle additionalSings button">(</button>`;
    topBtn.innerHTML += `<button dataBtn=")" class="brackets operBtnStyle additionalSings button">)</button>`;
    bottomBtn.innerHTML += `<button dataBtn="-" class="operBtnStyle mainSings button" id="minus">-</button>`;
    bottomBtn.innerHTML += `<button dataBtn="+" class="operBtnStyle mainSings button" id="plus">+</button>`;
    bottomBtn.innerHTML += `<button dataBtn="÷" class="operBtnStyle mainSings button" id="division">÷</button>`;
    bottomBtn.innerHTML += `<button dataBtn="×" class="operBtnStyle mainSings button" id="multiplication">×</button>`;

    changeableBtn.innerHTML += `<button dataBtn="%" class="operBtnStyle addOperBtnStyle mainSings button">%</button>`;
    changeableBtn.innerHTML += `<button dataBtn="√" class="operBtnStyle addOperBtnStyle mainSings button">√</button>`;
    changeableBtn.innerHTML += `<button dataBtn="²" class="operBtnStyle addOperBtnStyle mainSings button">²</button>`;
    changeableBtn.innerHTML += `<button dataBtn="π" class="operBtnStyle addOperBtnStyle mainSings button">π</button>`;
}

let addMenu = document.getElementById('addMenu');
let operSymbArr = [];
let operSymbArr2 = [];
let useBrackets = false;

//зміна операційних кнопок, через кнопку ("...").
//changing operating buttons using this ("...").
function changeableBtnFunc() {
    bottomBtn.classList.toggle('hide');
    changeableBtn.classList.toggle('hide');
}

addMenu.addEventListener('click', changeableBtnFunc);

//додавання символів на дисплей, якщо, проходять перевірочну функцію writeValidation.
//adding characters to the display if they passing the verification function writeValidation.
function displayValue() {
    let displayNum = this.getAttribute('dataBtn');
    //якщо, пройшов (символ) перевірку writeValidation додати його до вже існуючого текста на дисплей.
    //if, character passed checking writeValidation add it to the already existing text on the display.
    if (writeValidation(displayNum, display.innerText)) {
        display.innerText += displayNum;
        backSpaceBtn.className = "show";
    }
}

let btnValue = document.querySelectorAll('.button');

//метод масива, що при кліку на будь-який .button запускає displayValue.
//array method - when clicking on any .button starts displayValue.
btnValue.forEach(function (item) {return item.addEventListener('click', displayValue)});

//функція перевірки правильності введення цифр і символів в розрахункове поле.
//function to check the symbols and numbers which we inserting in the calculation field.
function writeValidation(displayNum, displayedVal) {
    counterClick++
    let currentSymbArr = displayedVal.split('');
    //if для перевірки дужок.
    //if statement to check parentheses.
    if (displayNum === ')') {
        useBrackets = true;
        return rightBracketsCheck(displayedVal);
    }
    if (displayNum === '('){
        if(!displayedVal.length){
            return true
        } else{
        return leftBracketsCheck(displayedVal);
        }
    }
    

    //якщо, !displayedVal.length 0 то фолс, не записувати натискання на символів, крім '√' або '-'.
    //if, !displayedVal.length 0 then do not record clicks on symbols beside '√' or '-'.
    if (displayNum == '√') {
        let disArrSq = displayedVal.split('');
        if(displayNum == '√' && (disArrSq[disArrSq.length-1] == '-' ||
        disArrSq[disArrSq.length-1] == '+' || disArrSq[disArrSq.length-1] == '÷' ||
        disArrSq[disArrSq.length-1] == '×') || checkingSqRootAndMinus(displayNum, displayedVal)){
            //перед квадратним коренем має бути операційний символ.
            //the square root must be next to an operation symbol.
            return true
        } else{
            return false
        }
    }  
    //перевірка на перший символ на дисплеї - '-'.
    //check for the first character on the display - '-'.
    if (displayNum == '-' && checkingSqRootAndMinus(displayNum, displayedVal)) {
       return true
    }  
    //заборона цифри після символів: 'π', '%' та '²'.
    //disallow digit after characters: 'π', '%' and '²'.
    if(numbersSymbol(displayNum) && (currentSymbArr[currentSymbArr.length-1] == 'π' ||
     currentSymbArr[currentSymbArr.length-1] == '%' ||
        currentSymbArr[currentSymbArr.length-1] == '²')){
            return false
        }
    //перевірка чи попередній символ являється операційним.
    //check if previous character is operational.
    if (operSymbol(displayNum)) {
        let disArr2 = displayedVal.split('');
        if(regularOperSymbol(displayNum) && (disArr2[disArr2.length-1] == 'π' || disArr2[disArr2.length-1] == '%' ||
        disArr2[disArr2.length-1] == '²')){
            // якщо, символ 'π', '%' або '²' то після обов'язково має бути операційний символ.     
            // if the symbol is 'π', '%' or '²' then there must be an operation symbol after it.
            return true
        } 
        if (disArr2[disArr2.length-1] == '(' && (displayNum == '÷' || displayNum == '+' || displayNum == '×' || 
        displayNum == '²' || displayNum == '%' || displayNum == 'π')){
            return false
        }else if (operSymbol(displayNum) && operSymbol(disArr2[disArr2.length-1]) || disArr2[disArr2.length-1] == '.') {
            return false
        }
    }
    //перевірки на кому.
    //comma check.
    if (displayNum == '.'){
        if(anySymbol(currentSymbArr[currentSymbArr.length-1]) ||
        currentSymbArr[currentSymbArr.length-1] == '.'){
            return false
         } else if(pointerAndSymbolsSearch(displayedVal)){
            return false
        } else {
            return true
        }
    }
    //для того, щоб інші кнопки працювали при натисканні.
    //to make other buttons work when they are clicked.
    if (operSymbol(displayNum) && !displayedVal.length ||
    !displayedVal.length && displayNum == '.') {
        return false
    } else if (!displayedVal.length){
        return true
    }
    return true
}

//функція перевірка лише на додавання, множення, ділення, віднімання.
//function check only for addition, multiplication, division, subtraction.
function regularOperSymbol(displayNum) {
    return displayNum == '×' || displayNum == '÷' || displayNum == '-' || displayNum == '+';
}

//функція, перевіряє displayNum чи це цифрa.
//function checks whether displayNum is a number.
function numbersSymbol(displayNum) {
    return displayNum == '1' || displayNum == '2' || displayNum == '3' || displayNum == '4' || 
    displayNum == '5' || displayNum == '6' || displayNum == '7' || displayNum == '8' ||
    displayNum == '9' || displayNum == '0';
}

//функція, що виводить на екран кнопки операційні в разі натискання (лише на дані кнопки).
//function that displays operating buttons on the screen when pressed (only on these buttons).
function operSymbol(displayNum) {
    return displayNum == '×' || displayNum == '÷' || displayNum == '-' || displayNum == '+' || 
    displayNum == '%' || displayNum == '√' || displayNum == '²' || displayNum == 'π';
}

//функція, що відділяє усі символи від цифр.
//function that separates all characters from numbers.
function anySymbol(displayNum) {
    return displayNum == '×' || displayNum == '÷' || displayNum == '-' || displayNum == '+' || 
    displayNum == '%' || displayNum == '√' || displayNum == '²' || displayNum == 'π' ||
    displayNum == '.' || displayNum == '(' || displayNum == ')';
}



let deleteCeBtn = document.getElementById('Ce');

//функція, що видаляє повністю весь вміст дисплея.
//the function that completely removes all the content of the display.
function deleteCeFunc() {
    display.innerText = null;
    backSpaceBtn.className = "hide";
}

deleteCeBtn.addEventListener('click', deleteCeFunc)

//функція, що видаляє посимвольно.
//character-by-character deleting function.
function backSpaceBtnFunc() {
    let a = display.innerText;
    let backArr = a.split('');
    backArr.splice(backArr.length - 1, 1);
    display.innerText = backArr.join('');
    if (display.innerText == "") {
        backSpaceBtn.className = "hide";
    }
}

backSpaceBtn.addEventListener('click', backSpaceBtnFunc)


let resultBtn = document.getElementById('resultBtn');

resultBtn.addEventListener('click', equalFunction);

//функція equal, що викликає результативну функцію.
//equal function that calls the resulting function

function equalFunction() {
    let displayText = display.innerText;
    let disArr = displayText.split(/[^\d.]/g);
    if (useBrackets) {
        console.log(useBrackets, 'useBrackets');
        testBracketsFunc(displayText);
        return
    }
    console.log(operSymbArr);
    // operSymb = disArr.filter(function(item, index, array){
    // return item == "+" || item == "-" || item == "÷" || item == "×";
    // console.log(operSymb);
    // });
    // console.log(operSymb);
    resultFunc(disArr, operSymbArr);
}

function testBracketsFunc(displayText) {

    let test = displayText.split('(')[displayText.split('(').length - 1].split(')');
    console.log(test, 'test');
    let test2 = ["6+2)"];
    console.log("6+2)".split(")"), "split")
    // console.log(arrDis.indexOf('('))
}

//функція, що проводить розрахунки введених даних.
//function that calculates inputed data.
function resultFunc(disArr, operSymbArr) {
    let resArr = disArr;
    operSymbArr2 = operSymbArr;
    let resProp = 0;
    let multiple = operSymbArr2.indexOf('×');
    let divide = operSymbArr2.indexOf('÷');
    let plus = operSymbArr2.indexOf('+');
    let minus = operSymbArr2.indexOf('-');
    let sqRoot = operSymbArr2.indexOf('√');
    let percent = operSymbArr2.indexOf('%');
    let numberPi = operSymbArr2.indexOf('π');
    let square = operSymbArr2.indexOf('²');

    console.log("equalFunc", resArr);
    // console.log(operSymbArr2);

    // console.log(operSymbArr2.indexOf('×'))
    if (operSymbArr2.length === 0) {
        display.innerText = disArr[0];
        return;
    }
    if (numberPi >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[numberPi] * 3.1415;
        resArr.splice(numberPi, 2, resProp);
        operSymbArr2.splice(numberPi, 1);
        resultFunc(resArr, operSymbArr2);
    }
    if (square >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[square] * +resArr[square];
        resArr.splice(square, 2, resProp);
        operSymbArr2.splice(square, 1);
        resultFunc(resArr, operSymbArr2);
    }
    if (percent >= 0 && operSymbArr2.length !== 0) {
        resProp = ((+resArr[percent] * 0.01) * +resArr[percent - 1]);
        console.log(percent);
        resArr.splice(percent, 1, resProp);
        operSymbArr2.splice(percent, 1);
        resultFunc(resArr, operSymbArr2);
    }
    if (sqRoot >= 0 && operSymbArr2.length !== 0) {
        resProp = Math.sqrt(resArr[sqRoot + 1]);
        resArr.splice(sqRoot, 2, resProp);
        operSymbArr2.splice(sqRoot, 1);
        resultFunc(resArr, operSymbArr2);
    }
    if (multiple >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[multiple] * +resArr[multiple + 1];
        resArr.splice(multiple, 2, resProp);
        operSymbArr2.splice(multiple, 1);
        resultFunc(resArr, operSymbArr2);
    }

    if (divide >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[divide] / +resArr[divide + 1];
        resArr.splice(divide, 2, resProp);
        operSymbArr2.splice(divide, 1);
        resultFunc(resArr, operSymbArr2);
    }

    if (plus >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[plus] + +resArr[plus + 1];
        resArr.splice(plus, 2, resProp);
        operSymbArr2.splice(plus, 1);
        resultFunc(resArr, operSymbArr2);
    }

    if (minus >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[minus] - +resArr[minus + 1];
        resArr.splice(minus, 2, resProp);
        operSymbArr2.splice(minus, 1);
        resultFunc(resArr, operSymbArr2);
        console.log("hello word");S
    }
    // for (let i = 0; operSymbArr.length > i; i++) {
    //     if (operSymbArr[i] === '×') {
    //         resProp = +resArr[i] * +resArr[i+1];
    //         resArr.splice(i, 2, resProp);
    //         operSymbArr.splice(i, 1);
    //         resultFunc(resArr, operSymbArr2);
    //     }
    //     if (operSymbArr[i] === '÷') {
    //         resProp = +resArr[i] / +resArr[i+1];
    //         resArr.splice(i, 2, resProp);
    //         operSymbArr.splice(i, 1);
    //         resultFunc(resArr, operSymbArr2);
    //     }
    //     if(operSymbArr[i] === '+'){
    //         resProp = +resArr[i] + +resArr[i+1];
    //         resArr.splice(i, 2, resProp);
    //         operSymbArr.splice(i, 1);
    //         console.log(resArr);
    //         resultFunc(resArr, operSymbArr2);
    //     }
    //     if(operSymbArr[i] === '-'){
    //         resProp = +resArr[i] - +resArr[i+1];
    //         resArr.splice(i, 2, resProp);
    //         operSymbArr.splice(i, 1);
    //         console.log(resArr);
    //         resultFunc(resArr, operSymbArr2);
    //     }
    // }
}

//функції перевірки круглих дужок.
//functions to check parentheses.
function rightBracketsCheck(displayedVal) {
    let disArrBr = displayedVal.split('');
    let counterLeft = 0;
    let counterRight = 0;
    disArrBr.forEach((item) => {
        if (item === '(') counterLeft++;
        if (item === ')') counterRight++;
    })
    if (disArrBr[disArrBr.length - 1] === '(') {
        return false;
    }
    if(operSymbol(disArrBr[disArrBr.length - 1])){
        return false
    }
    if (counterLeft > counterRight) {
        return true;
    } else {
        return false;
    }
}

function leftBracketsCheck(displayedVal) {
    let displayToArray = displayedVal.split('');
    if (displayToArray[displayToArray.length - 1] === ')'){
        return false;
    }else if (displayToArray[displayToArray.length - 1] == '-' || 
    displayToArray[displayToArray.length - 1] == '+' || 
    displayToArray[displayToArray.length - 1] == '×' ||
    displayToArray[displayToArray.length - 1] == '÷'){
        return true;
    } 
}


//функція перевірка на попередній символ корінь квадратний або мінус.
//function checking for the previous square root symbol or minus.
function checkingSqRootAndMinus(displayNum, displayedVal) {
    //якщо, !displayedVal.length 0 то фолс, не записувати натискання на символів, крім '√' або '-'.
    //if, !displayedVal.length 0 then do not record clicks on symbols beside '√' or '-'.
    if (!displayedVal.length && (displayNum == '√' || displayNum == '-')){
        return true
    } else {
        return false
    }
    
}

//функція перевірки на появу точки в числі один раз.
//check function for the appearance of a point/dot in a number only once.
function pointerAndSymbolsSearch(displayedVal){
    let disArrPointerDraft = displayedVal.split('');
    let disArrPointer = []
    //якщо, першим символом йде мінус видаляєм його з масива, щоб зпрацювала подальша логіка.
    //if the first character is '-', we remove it from the array so that further logic works.
    if(disArrPointerDraft[0] == '-'){
        disArrPointerDraft.splice(0, 1)
        disArrPointer = disArrPointerDraft
    } else{
        disArrPointer = disArrPointerDraft
    }
    let symbolOcurArr = [];
    let pointOcurArr = [];
    symbArr = ['-', '+', '×', '÷']
    for(let i = 0; i < symbArr.length; i++){
        let str = symbArr[i]
         for(let j = 0; j < disArrPointer.length; j++){
        if (str == disArrPointer[j]){
            symbolOcurArr.push(j)
        }
    }
    }
   
    for(let i = 0; i < disArrPointer.length; i++){
        if ('.' == disArrPointer[i]){
         pointOcurArr.push(i)
        }
    }   
    // pointOcurArr[pointOcurArr.length-1] > symbolOcurArr[symbolOcurArr.length-1] &&
    // pointOcurArr[pointOcurArr.length-2] < symbolOcurArr[symbolOcurArr.length-1]
    // console.log("symbolOcurArr ", symbolOcurArr)
    // console.log("pointOcurArr ", pointOcurArr)   
    if ((displayedVal.length > pointOcurArr[pointOcurArr.length-1]) &&
        (pointOcurArr[pointOcurArr.length-1] > symbolOcurArr[symbolOcurArr.length-1])){
        // console.log("symbolOcurArr ", symbolOcurArr)
        // console.log("pointOcurArr ", pointOcurArr)
        // console.log("pointOcurArr last ", pointOcurArr[pointOcurArr.length-1])
        // console.log("symbolOcurArr last ", symbolOcurArr[symbolOcurArr.length-1])
        // console.log("pointOcurArr before ", pointOcurArr[pointOcurArr.length-2])
        return true
         
    } else if (symbolOcurArr.length == 0 && pointOcurArr.length > 0){
        return true
    } else {  
        return false
    }
}