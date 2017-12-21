/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 1. Sa se implementeze o functie care primeste un array de obiecte si o nume de 
 cheie si returneaza un array cu toate valorile corespunzatoare cheii din obiectele din array.
 */
const demoArr = [
    {id: 1, color: 'red', height: 15, width: 20, distance: 10},
    {id: 2, color: 'green', height: 5, width: 30, distance: 5},
    {id: 3, color: 'turqoize', height: 7, width: 9, distance: 8},
    {id: 4, color: 'blue', height: 2, width: 3, distance: 3},
    {id: 5, color: 'red', height: 10, width: 10, distance: 2},
    {id: 6, color: 'crimson', height: 7, width: 8, distance: 16},
];
//console.log(demoArr[2].width);

console.log('custom key show', pluck(demoArr, 'width'));  // => ['red', 'green', 'turqoize' .......];

function pluck(arr, key) {
//    console.log('here', arr, key, typeof arr);
    var newArr = [], index;
    for (index in arr) {
        newArr.push(arr[index][key]);
    }
//    console.log(newArr);
    return newArr;
}

/*
 2. Sa se implementeze o functie care returneaza ariile tuturor elementelor din array-ul de mai sus, aria e inaltime * latime.
 */

//v1
function area1(arr) {
    var areas = ' ', i;
    for (i in arr) {
        areas += 'Id:' + (Number(i) + 1) + ' are aria de ' + arr[i].width * arr[i].height + ' \n';
    }
    return areas;
}
//console.log(area1(demoArr));

//v2
function area(arr) {
    var areas = [], i;
    for (i in arr) {
        areas.push(arr[i].width * arr[i].height);
    }
    return areas;
}
var areas = area(demoArr);
console.log('areas', areas);

/*
 3. Sa se scrie o functie care returneaza un subset din array-ul de mai sus unde elementele au aria mai mica sau egala cu 100
 */

function areaOneHundred(areas) {
    return areas <= 100;
}
var filtered = areas.filter(areaOneHundred);
console.log('filtered areas <=100', filtered);

/*
 5. Sa se scrie o functie care returneaza elementul cu culoarea crimson
 */
function findColorEl(colorName) {
    var el = [], i;
    for (i in demoArr) {
        if (demoArr[i].color === colorName) {
            el.push(demoArr[i]);
        }
    }
    return el;
}
console.log('el color', findColorEl('crimson'));

/*
 6. Sa se scrie o functie care returneaza true daca toate elementele din array au aria >= 10, false altfel.
 */
function checkArea() {
    var output = true, i;
    for (i in areas) {
        if (areas[i] < 10) {
            output = false;
        }
    }

    return output;
}
console.log('check area >=10', checkArea());

/*
 7. Sa se scrie o functie care returneaza true daca cel putin unul din elementele array-ului are culoarea 'green';
 */
function checkColor(color) {
    var colorChecker = findColorEl(color);
    if (colorChecker && (colorChecker.length > 0)) {
        return true;
    }
    return false;
}
console.log('color exists: ', checkColor('green'));

/*
 8. Sa se scrie o functie care returneaza distanta totala (suma distantelor elementelor)
 */

//v1 Reduce
function totalDistanceReduce() {
//    console.log('here', arr, key, typeof arr);
    var eachElDistances, sum;
    eachElDistances = pluck(demoArr, 'distance');
//    console.log(eachElDistances);
    sum = eachElDistances.reduce(function (a, b) {
        return a + b;
    }, 0);
//    console.log(sum);
    return sum;
}
console.log('v1 total distance', totalDistanceReduce());

//v2
function totalDistance() {
    var eachElDistances, sumDistances = 0, i;
    eachElDistances = pluck(demoArr, 'distance');
//    console.log(eachElDistances);
    sumDistances = 0;
    for (i in eachElDistances) {
        sumDistances += Number(eachElDistances[i]);
//        console.log('sumDistances ',sumDistances);
    }
    return sumDistances;
}
console.log('v2 total distance', totalDistance());

/*
 9. Sa se scrie o functie care returneaza un obiect in care se numara de cate ori apare fiecare culoare in parte in array-ul de obiecte. {red: 2, blue: 1, etc...}
 */
function countColors() {
    var el = {}, colors, i;
    colors = pluck(demoArr, 'color');
    for (i in colors) {
//      console.log(findColorEl(colors[i]),colors[i], findColorEl(colors[i]).length);
        el[colors[i]] = findColorEl(colors[i]).length;
    }
//    console.log(el);
    return el;
}
console.log('find and count colors', countColors());

/*
 10. Sa se scrie o functie care returneaza un array cu toate elementele care au o coluare unica. Oricare element dupa primul care are o culoare care s-ar repeta nu este inclus in array.
 */
