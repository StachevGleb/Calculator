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
//equal function that calls the resulting function
function equalFunction() {
    let displayText = display.innerText;
    //перевірка чи display.innerText має дужки в своєму складі.
    //check whether display.innerText has parentheses in its structure.
    for(let i=0;i<displayText.length-1;i++){
        if (displayText[i] == '(' || displayText[i] == ')'){
            useBrackets = true
        }
    }
    //з display.innerText отримати айтемс у вигляді чисел або флоат чисел, без будь яких символів.
    //from display.innerText get items in the form of numbers or float numbers, without any symbols.
    let disArr = displayText.split(/[^\d.()]/g);
    let input = disArr;
    let output = input.map(function(element) {
    return element.replace(/[\(\)]/g, '');
    }).filter(function(element) {
    return element !== '';
    });
    disArr = input
    // console.log(output)

    for (let i = 0; i < displayText.length; i++) {
        if (operSymbol(displayText[i])){
            operSymbArr.push(displayText[i])
        }
    }
    // console.log(operSymbArr)

    if (useBrackets) {
        console.log(useBrackets, 'useBrackets');
        testBracketsFunc(displayText);
        return
    }

    // console.log(output, 'changed')
 
    resultFunc(disArr, operSymbArr);
}

function testBracketsFunc(displayText) {
   
    let result = displayText.match(/\(([^)]+)\)/g).map(function(element) {
      return element.substring(1, element.length - 1);
    });
    
    console.log(result);
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
    
    console.log('operSymbArr2  ',operSymbArr2)
    console.log('disArr  ', disArr)
    console.log('square  ', square)

    // console.log("equalFunc", resArr);
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
        // console.log("hello world");
    }


//     for (let i = 0; operSymbArr.length > i; i++) {
//         if (operSymbArr[i] === '×') {
//             resProp = +resArr[i] * +resArr[i+1];
//             resArr.splice(i, 2, resProp);
//             operSymbArr.splice(i, 1);
//             resultFunc(resArr, operSymbArr2);
//         }
//         if (operSymbArr[i] === '÷') {
//             resProp = +resArr[i] / +resArr[i+1];
//             resArr.splice(i, 2, resProp);
//             operSymbArr.splice(i, 1);
//             resultFunc(resArr, operSymbArr2);
//         }
//         if(operSymbArr[i] === '+'){
//             resProp = +resArr[i] + +resArr[i+1];
//             resArr.splice(i, 2, resProp);
//             operSymbArr.splice(i, 1);
//             console.log(resArr);
//             resultFunc(resArr, operSymbArr2);
//         }
//         if(operSymbArr[i] === '-'){
//             resProp = +resArr[i] - +resArr[i+1];
//             resArr.splice(i, 2, resProp);
//             operSymbArr.splice(i, 1);
//             console.log(resArr);
//             resultFunc(resArr, operSymbArr2);
//         }
//     }
}


 






