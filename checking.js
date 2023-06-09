let counterClick = 0;

//функція перевірки правильності введення цифр і символів в розрахункове поле.
//function to check the symbols and numbers which we inserting in the calculation field.
function writeValidation(displayNum, displayedVal) {
    counterClick++
    let currentSymbArr = displayedVal.split('');
    //if для перевірки дужок.
    //if statement to check parentheses.
    if (displayNum === ')') {
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
        disArrSq[disArrSq.length-1] == '×') || checkingSqRootAndMinus(displayNum, displayedVal) ||
        disArrSq[disArrSq.length-1] == '('){
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
        let result = helpPointFuncForSeparation(displayedVal);
        let disArrPointer = result.disArrPointer;
        let symbolOcurArr = result.symbolOcurArr;
        if(anySymbol(currentSymbArr[currentSymbArr.length-1]) ||
        currentSymbArr[currentSymbArr.length-1] == '.'){
            return false
         } else if(pointerAndSymbolsSearch(displayedVal, disArrPointer, symbolOcurArr)){
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
    } else if (numbersSymbol(displayNum) && currentSymbArr[currentSymbArr.length-1] == ')'){
        return false
    }else if (!displayedVal.length){
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
function pointerAndSymbolsSearch(displayedVal, disArrPointer, symbolOcurArr){
    let pointOcurArr = [];
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
        console.log("symbolOcurArr ", symbolOcurArr)
        console.log("pointOcurArr ", pointOcurArr)
        // console.log("pointOcurArr last ", pointOcurArr[pointOcurArr.length-1])
        // console.log("symbolOcurArr last ", symbolOcurArr[symbolOcurArr.length-1])
        // console.log("pointOcurArr before ", pointOcurArr[pointOcurArr.length-2])
        return true
         
    } else if (symbolOcurArr.length == 0 && pointOcurArr.length > 0){
        return true
    } else if (!displayedVal.length){
        return true
    } else{  
        return false
    }
}

function helpPointFuncForSeparation(displayedVal) {
    let symbolOcurArr = [];
    let disArrPointer = [];
    let disArrPointerDraft = displayedVal.split('');
    //якщо, першим символом йде мінус видаляєм його з масива, щоб зпрацювала подальша логіка.
    //if the first character is '-', we remove it from the array so that further logic works.
    if (disArrPointerDraft[0] == '-') {
        disArrPointerDraft.splice(0, 1)
        disArrPointer = disArrPointerDraft
    } else {
        disArrPointer = disArrPointerDraft
    }
    let symbArr = ['-', '+', '×', '÷']
    for (let i = 0; i < symbArr.length; i++) {
        let str = symbArr[i]
        for (let j = 0; j < disArrPointer.length; j++) {
            if (str == disArrPointer[j]) {
                symbolOcurArr.push(j)
                symbolOcurArr.sort((a, b) => a - b);
            }
        }
    }
    return { disArrPointer, symbolOcurArr };
}


export { writeValidation, operSymbol } 
