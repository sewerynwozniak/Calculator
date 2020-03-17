const inputButton = document.querySelectorAll('.inputButton');
const input = document.querySelector('input');
const output = document.querySelector('.output');
const equal = document.querySelector('.equal');
const backspace = document.querySelector('.backspace');
let dotPresent =false;
let target;
const arithmArray =[];  
const lastNumberRegex = /[-+X/]?(\d+[.]?\d*?)[-+X/]?$/;    


inputButton.forEach(button=>button.addEventListener('click', screenInput));
window.addEventListener('keydown', keyboardInput);
input.addEventListener('keydown', ignoreInput);
equal.addEventListener('click', equalFunction);
backspace.addEventListener('click', backspaceFunction);


function ignoreInput(e){
e.preventDefault();
}


//Prevents from typing more than one dot in one operand and dot at the beginning
function dotChecker(){
let dotRegex = /[-+X/]?\d+?[.](\d+)?$/; 
if(dotRegex.test(input.value) &&  (target == '.' || target == 'Period')) return true
if(input.value == '' && (target == '.' || target == 'Period')) return true
}



//Prevents from typing operation before operands and more than one operation
function operationsChecker(){
    let moreOperationsRegex = /\d[-+X/]$/;
//Prevents from typing operation before operands  
if(input.value == '' &&  /[-+X/]/.test(target)) return true;
//Prevents from typing more than one operation
if(moreOperationsRegex.test(input.value) && /[-+X/]/.test(target)) return true
}


function equalFunction(){
if(input.value == '') return;
//if last character is different than [-+x/] add to arithArray 
if(/[^-+X/]$/.test(input.value)){
arithmArray.push(parseFloat(input.value.match(lastNumberRegex)[1]))
return evaluate()
}else return evaluate()
}


function backspaceFunction(){
   // If last element is dot or number delete from input but not from array as it's not added yet in array, calculator adds number after clicking operation buttons
   if(/(\d|\.)/.test(input.value.charAt(input.value.length-1))){
    return input.value = input.value.slice(0, input.value.length-1)
  }else{
    // If last element is operation sign delete two last elements from array 
    arithmArray.splice(-2,2);
    return input.value = input.value.slice(0, input.value.length-1)
  } 
}



function evaluate(){
if(arithmArray.length == 2){
    input.value = '';
    output.innerText = (arithmArray[0]).toFixed(2);
    return arithmArray.length=0
}
    // First loop does multiplying and diving and second adding and substracting
    for(let i=0;i<arithmArray.length;i++){
    if(/[X]/.test(arithmArray[i])){
        arithmArray[i-1] = arithmArray[i-1] * arithmArray[i+1]
        arithmArray.splice(i, 2);
    }
    if(/[/]/.test(arithmArray[i])){
        arithmArray[i-1] = arithmArray[i-1] / arithmArray[i+1]
        arithmArray.splice(i, 2);
    }
}

for(let i =0;i<arithmArray.length;i++){
        if(/[+]/.test(arithmArray[i])){
        arithmArray[i-1] = arithmArray[i-1] + arithmArray[i+1]
        arithmArray.splice(i, 2);
    }
        if(/[-]/.test(arithmArray[i])){
        arithmArray[i-1] = arithmArray[i-1] - arithmArray[i+1]
        arithmArray.splice(i, 2);
    }}

    //Show result and clear input
    input.value = '';
    output.innerText = (arithmArray[0]).toFixed(2);
    return arithmArray.length=0
}



function screenInput(e){
target = e.target.innerText;

if(dotChecker()) return;
if(operationsChecker()) return

   
input.value += target;
output.innerText = '';

if(/[-+X/]/.test(target)){

arithmArray.push(parseFloat(input.value.match(lastNumberRegex)[1]))
arithmArray.push(target)

}}


function keyboardInput(e){

e.preventDefault()
}



