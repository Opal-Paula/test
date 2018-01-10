/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

/* 
 1. Sa se implementeze o functie care primeste un array de obiecte si un nume de 
 cheie si returneaza un array cu toate valorile corespunzatoare cheii din obiectele din array.
 */
const demoArr = [
    {id: 1, color: 'red', height: 15, width: 20, distance: 10},
    {id: 2, color: 'green', height: 5, width: 30, distance: 5},
    {id: 3, color: 'turqoize', height: 7, width: 9, distance: 8},
    {id: 4, color: 'blue', height: 2, width: 3, distance: 3},
    {id: 5, color: 'red', height: 10, width: 10, distance: 2},
    {id: 6, color: 'crimson', height: 7, width: 8, distance: 16}
];
//console.log(demoArr[2].width);

function pluck(arr, key) {
//    console.log('here', arr, key, typeof arr);
    return arr.map(index => index[key]);
}
console.log('custom key show', pluck(demoArr, 'color'));

/*
 2. Sa se implementeze o functie care returneaza ariile tuturor elementelor din array-ul de mai sus, 
 aria e inaltime * latime.
 */

//v1
function area1(arr) {
    return arr.map((elem, i) => 'Id:' + (Number(i) + 1) + ' are aria de ' + elem.width * elem.height);
}
console.log(area1(demoArr));

//v2
function area(arr) {
    return arr.map(elem => elem.width * elem.height);
}
let areas = area(demoArr);
console.log('areas', areas);

/*
 3. Sa se scrie o functie care returneaza un subset din array-ul de mai sus unde elementele
 au aria mai mica sau egala cu 100
 */
let filtered = areas.filter(areas => areas <= 100);
console.log('filtered areas <=100', filtered);

/*
 4. Sa se implementeze o functie numita reject, care primeste un array si o functie iterator.
 Functia iterator primeste cate un element din array ca si parametru si trebuie sa returneze true sau false. 
 Daca returneaza true, elementul in cauza nu va fi inclus de functia parinte in array-ul rezultat. 
 Daca returneaza false va fi inclus.
 */
let iterator = elem => elem.height >= 10;
function reject(arr, iteratorCallback) {
    return arr.filter(elem => !iteratorCallback(elem));
}
console.log('reject height >= 10', reject(demoArr, iterator)); // sa returneze un array de obiecte cu height < 10

/*
 5. Sa se scrie o functie care returneaza elementul cu culoarea crimson
 */
function findColorEl(arr, colorName) {
    return arr.filter(elem => elem.color === colorName);
}
console.log('el color', findColorEl(demoArr, 'crimson'));

/*
 6. Sa se scrie o functie care returneaza true daca toate elementele din array au aria >= 10, false altfel.
 */
function checkArea(arr) {
    return arr.every(elem => elem >= 10);
}
console.log('check area >=10', checkArea(areas));

/*
 7. Sa se scrie o functie care returneaza true daca cel putin unul din elementele array-ului are culoarea 'green';
 */
function checkColor(arr, color) {
    return arr.some(elem => elem.color === color);
}
console.log('color exists: ', checkColor(demoArr, 'green'));

/*
 8. Sa se scrie o functie care returneaza distanta totala (suma distantelor elementelor)
 */
//v1 Reduce
function totalDistanceReduce(callback) {
    return callback.reduce((a, b) => {
        return a + b;
    }, 0);
}
console.log('total distance', totalDistanceReduce(pluck(demoArr, 'distance')));

/*
 9. Sa se scrie o functie care returneaza un obiect in care se numara de cate ori apare fiecare culoare
 in parte in array-ul de obiecte. {red: 2, blue: 1, etc...}
 */
function countColors(callback) {
    return callback.reduce((colors, i) =>
    {
        if (i in colors) {
            colors[i]++;
        } else {
            colors[i] = 1;
        }
        return colors;
    }, {});
}
console.log('find and count colors', countColors(pluck(demoArr, 'color')));

/*
 10. Sa se scrie o functie care returneaza un array cu toate elementele care au 
 o culoare unica. Oricare element dupa primul care are o culoare care s-ar repeta nu este inclus in array.
 */
function uniqueColor(arr) {
    let result = [];
    arr.filter((elem, i) => {
        let index = result.findIndex(i => i.color === elem.color);
        if (index === -1) {
            result.push(elem);
        }
    });
    return result;
}
console.log('unique color', uniqueColor(demoArr));

/*
 11. Sa se scrie o functie care inverseaza doua numere.
 */
let destructuring = (a, b) => [a, b] = [b, a];
console.log('destructured values', destructuring(100, 5));

/*
 12. Folosind array-ul de mai jos, vreau sa se obtina o variabila care contine un array de obiecte strcturat astfel:
 [
 {subject: 'Chemistry', time: '9AM', teacher: 'Mr. Darnick'},
 ...
 ]
 */
const classes = [
    ['Chemistry', '9AM', 'Mr. Darnick'],
    ['Physics', '10:15AM', 'Mrs. Lithun'],
    ['Math', '11:30AM', 'Mrs. Vitalis']
];

function arrayToObject(obj) {
    return obj.map(elem => {
        const objClasses = {
            subject: elem[0],
            time: elem[1],
            teacher: elem[2]
        };
        return objClasses;
    });
}
console.log('array of objects', arrayToObject(classes));