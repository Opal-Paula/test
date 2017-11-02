/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//alert('algorithms');

'use strict';

/**
 * Exercitiul 1 
 * @param {number} min
 * @param {number} max 
 **/
function averageInterval(min, max) {
    if (min > max) {
        //swap values/Destructuring assignment 
        [min, max] = [max, min];
    }
//    console.log(min, max);
    var sum = 0;
    var i, result;
    for (i = min; i <= max; i++) {
//        console.log('i: ', i);
        sum += i;
    }
    result = sum / (max - min + 1);
    console.log('average is: ', result);
    return result;
}
document.getElementById('r1').innerText = averageInterval(3, 8);

/**
 * Exercitiul 2 
 **/
function division() {
    var input1 = Number(document.getElementById('nr1').value);
    var input2 = Number(document.getElementById('nr2').value);
    var result;
//    console.log(input1, input2);
    if ((input1 === 0) || (input2 === 0)) {
        result = 'Eroare';
    } else {
        result = input1 / input2;
    }
    console.log('result: ', result);
    document.getElementById('r2').innerText = result;
}
document.querySelector('.js-division').addEventListener('click', division);

/**
 * Exercitiul 3 
 **/
function maxAverage() {
    var input1 = Number(document.getElementById('nr3').value);
    var input2 = Number(document.getElementById('nr4').value);
    var input3 = Number(document.getElementById('nr5').value);
    var input4 = Number(document.getElementById('nr6').value);
//    console.log(input1, input2, input3, input4);
    var averageFirst = (input1 + input2) / 2;
    var averageLast = (input3 + input4) / 2;

//  v1
    var result = Math.max(averageFirst, averageLast);
    var output = 'Maximul dintre cele doua medii este: ' + result;

//    v2
//    var output = 'Maximul dintre cele doua medii este: ';
//    if (averageFirst > averageLast) {
//        output += averageFirst;
//    } else {
//        output += averageLast;
//    }

    console.log(output);
    document.getElementById('r3').innerText = output;
}
document.querySelector('.js-maxAverage').addEventListener('click', maxAverage);

/**
 * Exercitiul 4 
 **/
function exponent() {
    var input1 = parseInt(document.getElementById('nr7').value);
    var input2 = parseInt(document.getElementById('nr8').value);
//    console.log(input1, input2);
    var exponent = Math.pow(input1, input2);
//    console.log('exponent ', exponent);    

    document.getElementById('r4').innerText = input1;
    document.getElementById('r4i').innerText = input2;

//    console.log('sign', Math.sign(input2));
    if (Math.sign(input2) === -1) {
        exponent = 'Greseala';
    }
    document.getElementById('r4ii').innerText = exponent;
    console.log('result: ', exponent);
}
document.querySelector('.js-exponent').addEventListener('click', exponent);

/**
 * Exercitiul 5 
 **/
function sum() {
    var start = 0;
    var nr = parseInt(prompt('Numbers'));
    console.log('nr: ', nr);
    for (var i = 0; i <= nr; i++) {
//        console.log('i', i);
        start += i;
    }
//    console.log(start);

    if ((start <= 15) && (Math.sign(nr) !== -1) && !(isNaN(nr))) {
        console.log('sum: ', start);
        sum();        
    } else {
        console.log('sum above 15: ', start);
    }
    document.getElementById('r5').innerText = nr;
    document.getElementById('r5i').innerText = nr + 1;
    document.getElementById('r5ii').innerText = start;    
}
document.querySelector('.js-sum').addEventListener('click', sum);

/**
 * Exercitiul 5A si 5B
 **/
function averageRandom() {
    var numbers = [];
    console.log('numbers:', numbers);
    var sum = 0;
    var averageNr;

    //version 1 function 5A
    function numbersFromUser() {
        var userNumber = Number(prompt('Add a number'));
        sum += userNumber;
//        console.log(sum);
//        console.log(typeof userNumber, userNumber, 'numbers:', numbers);
        if ((userNumber !== 0) && (Math.sign(userNumber) !== -1) && !(isNaN(userNumber))) {
            numbers.push(userNumber);
//            console.log(typeof userNumber, userNumber, 'numbers', numbers);
            numbersFromUser();
//            console.log('here');
        }
        return sum;
    }
    averageNr = numbersFromUser() / numbers.length;
    console.log('average: ', averageNr);

//    version 2 loop 5A
//    var userNumber = 1;    
//    while (userNumber > 0) {
//        userNumber = Number(prompt('Add a number'));
////        console.log(typeof userNumber, userNumber);
//        if ((userNumber !== 0) && (Math.sign(userNumber) !== -1) && !(isNaN(userNumber))) {
//            numbers.push(userNumber);
//            sum += userNumber;
////            console.log(sum);
//        }
//    }
//    averageNr = sum / numbers.length;
//    console.log('average: ',averageNr);

    document.getElementById('r6').innerText = numbers;
    document.getElementById('r6i').innerText = averageNr;
}
document.querySelector('.js-averageRandom').addEventListener('click', averageRandom);

//find the max nr from the numbers added by user 5B
function maxNumber() {
    var numbers = [];
    console.log(numbers);
    var userNumber = 1; 
    var min = 0;
    var max = 0;
    
    while (userNumber > 0) {
        userNumber = Number(prompt('Add a number'));
//        console.log(typeof userNumber, userNumber);
        if ((userNumber !== 0) && (Math.sign(userNumber) !== -1) && !(isNaN(userNumber))) {
            numbers.push(userNumber);
        }
    }
    
    for (var nr in numbers) {
        min = numbers[nr];
        console.log('min/nr:', min);
        if (min === max) {
            max = min;
            console.log('max :', min, max);
        } else if (min > max) {
            [min, max] = [max, min];                
            console.log('swap:', min, max);
        }
    }
    console.log('max nr of the array is ' + max);    
    document.getElementById('r7').innerText = numbers;
    document.getElementById('r7i').innerText = max;
}
document.querySelector('.js-maxNumber').addEventListener('click', maxNumber);
