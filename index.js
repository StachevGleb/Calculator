import { writeValidation, operSymbol } from "./checking.js";
let display = document.getElementById('input');
let btnWrap = document.getElementById('btnWrapper');
let changeableBtn = document.getElementById('changeableBtn');
let topBtn = document.getElementById('topBtn');
let bottomBtn = document.getElementById('bottomBtn');
let backSpaceBtn = document.getElementById('backSpaceBtn');
let bracketsBut = document.getElementsByClassName('brackets');
let useBrackets = false

createBtn();

//створення кнопок.
//buttons creation.
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
//equal function that calls the resulting function.
function equalFunction() {
    let displayText = display.innerText;
    let parentheses = 0
    let closeBracketArr = []
    //перевірка чи display.innerText має дужки в своєму складі.
    //check whether display.innerText has parentheses in it's structure.
    for(let i=0;i<displayText.length-1;i++){
        if (displayText[i] == '('){
            parentheses++
            useBrackets = true
            if(displayText[i] == '(' && i == 0 || parentheses == 1 && displayText[i-1] != '-' ){
                console.log(displayText[i-1], ' symbol in first appearence of "("')
            } else {
                closeBracketArr.push(displayText[i-1])
                console.log("yes")
            }
        }
    }
    //відділяєм символи від дужок з цифрами.
    //separate symbols from parentheses with numbers.
    let disArr = itemsClearCreator(displayText);
    //формуєм масив з операційними символами.
    //form an array with operational symbols.
    for (let i = 0; i < displayText.length; i++) {
        if (operSymbol(displayText[i])){
            operSymbArr.push(displayText[i])
        }
    }
    //попереджуємо повторення символів.
    //prevent repeating characters.
    if(operSymbArr.length > disArr.length){
        operSymbArr.splice(disArr.length-1, operSymbArr.length-disArr.length)
    }
    //в разі якщо, є інпут дужок.
    //if there is an input of parentheses.
    if (useBrackets) {
        testBracketsFunc(disArr, displayText, closeBracketArr);
        useBrackets = false
        return
    }
    //в разі якщо, немає інпут дужок.
    //if there is no input of parentheses.
    resultFunc(disArr, operSymbArr);
}

//функція testBracketsFunc, що викликає результативну функцію (якщо в інпуті є дужки).
//testBracketsFunc function that calls the resulting function (if input with parentheses).
function testBracketsFunc(disArrOrig, displayText, closeBracketArr) {
    let operSymbArr3 = []
    let resInParenth = []
    let parenthesesPattern = /\(([^)]+)\)/g;
    //видаляємо дужки з string.
    //delete parenthese from the string.
    displayText.replace(parenthesesPattern, '');
    let arithmeticExpression = displayText.replace(parenthesesPattern, '').trim();

    displayText.match(parenthesesPattern).map(function(element) {
    let beforeCounting =  element.substring(1, element.length - 1);
    //отримуєм масив з опер. символами які знаходяться в дужках.
    //receiving an array with operation symbols that are in parentheses.
     for (let i = 0; i < beforeCounting.length; i++) {
        if (operSymbol(beforeCounting[i])){
            operSymbArr3.push(beforeCounting[i])
        }
    }
    //відділяєм символи від дужок з цифрами.
    //separate symbols from parentheses with numbers.
    let disArr = itemsClearCreator(beforeCounting);
    //обраховуєм результат для кожних із дужок і зберігаєм його в resInParenth.
    //calculate the result for every of the parentheses and saving it in resInParenth.
    resultFunc(disArr, operSymbArr3);
    let displayText = display.innerText
    resInParenth.push(displayText)
    });
    if(resInParenth.length > closeBracketArr.length){
        closeBracketArr.splice(0, 0,'+')
    }
    //формуєм string для того, щоб з'єднати числа обраховані з середини дужок із тими які поза ними - afterParentCountStr.
    //form a string in order to connect the numbers calculated from the parentheses with numbers outside of them - afterParentCountStr.
    for(let i=0;i<resInParenth.length;i++){
        closeBracketArr.splice(i * 2 + 1, 0, resInParenth[i])
    }
    console.log(resInParenth)

    closeBracketArr.join('')
    let newStrArr= []
    // console.log(arithmeticExpression)

    newStrArr = arithmeticExpression.split('')
    console.log(newStrArr)

    for(let i=0;i < newStrArr.length;i++){
        if(operSymbol(newStrArr[0])){
            newStrArr.splice(0, 0, resInParenth[0])
            resInParenth.splice(0, 1)
        }else if(operSymbol(newStrArr[i]) && operSymbol(newStrArr[i+1])){
            newStrArr.splice(i+1, 0, resInParenth[0])
            resInParenth.splice(0, 1)
        } else if (operSymbol(newStrArr[newStrArr.length-1])){
            newStrArr.splice(newStrArr.length, 0, resInParenth[resInParenth.length-1])
            resInParenth.splice(resInParenth.length-1, 1)
        } else if (operSymbol(newStrArr[0])){
            newStrArr.splice(0, 0, resInParenth[0])
            resInParenth.splice(0, 1)
        }
    }
    let afterParentCountStr = newStrArr.join('')
    //відділяєм символи від дужок з цифрами.
    //separate symbols from parentheses with numbers.
    let disArrParent = itemsClearCreator(afterParentCountStr)
    console.log(disArrParent)

    //отримуєм масив з опер. символами які знаходяться в дужках.
    //receiving an array with operation symbols that are in parentheses.
    let operSymbArrParent = []  
    for (let i = 0; i < afterParentCountStr.length; i++) {
        if (operSymbol(afterParentCountStr[i])){
            operSymbArrParent.push(afterParentCountStr[i])
        }
    }
    if(operSymbArrParent.length > disArrParent.length){
        operSymbArrParent.splice(disArrParent.length-1, operSymbArrParent.length-disArrParent.length)
    }
    console.log(disArrParent)
    console.log(operSymbArrParent)

    //обраховуєм результат для кожних із дужок і із іншими цифрами.
    //calculate the result for each of the parentheses with other numbers.
     resultFunc(disArrParent, operSymbArrParent);
     
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
  
    if (operSymbArr2.length === 0) {
        display.innerText = Math.round(disArr[0] * 1e10) / 1e10;
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
    if (percent >= 0 && operSymbArr2.length > 1) {
        resProp = ((+resArr[percent] * 0.01) * +resArr[percent + 2]);
        console.log(percent);
        resArr.splice(percent, 2, resProp);
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

    if (minus >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[minus] - +resArr[minus + 1];
        console.log(resArr, 'minus')
        console.log(resArr[minus], '-' ,resArr[minus + 1])
        resArr.splice(minus, 2, resProp);
        operSymbArr2.splice(minus, 1);
        resultFunc(resArr, operSymbArr2);
    }
    
    if (plus >= 0 && operSymbArr2.length !== 0) {
        resProp = +resArr[plus] + +resArr[plus + 1];
        console.log(resArr, 'plus')
        console.log(resArr[plus], '-' ,resArr[plus + 1])
        resArr.splice(plus, 2, resProp);
        operSymbArr2.splice(plus, 1);
        resultFunc(resArr, operSymbArr2);
    }

}

//з display.innerText отримати айтемс у вигляді чисел або флоат чисел, без будь яких символів.
//from display.innerText get items in the form of numbers or float numbers, without any symbols.
function itemsClearCreator(displayText){
     let disArr = displayText.split(/[^\d.()]/g);
    let output = disArr.map(function(element) {
    return element.replace(/[\(\)]/g, '');
    }).filter(function(element) {
    return element !== '';
    });
    return disArr
}





