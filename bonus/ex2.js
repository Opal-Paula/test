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
    {id: 2, color: 'red', height: 5, width: 30, distance: 5},
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
 4. Sa se implementeze o functie numita reject, care primeste un array si o functie iterator.
 Functia iterator primeste cate un element din array ca si parametru si trebuie sa returneze true sau false. 
 Daca returneaza true, elementul in cauza nu va fi inclus de functia parinte in array-ul rezultat. 
 Daca returneaza false va fi inclus.
 */
function iterator(elem) {
//    console.log(elem);
    return elem.height >= 10;
}

function reject(arr, iteratorCallback) {
    //de implementat
    var result = [];
    for (var prop in arr) {
        var value = arr[prop];
//        console.log(iteratorCallback(value));
        if (!(iteratorCallback(value))) {
            result.push(value);
        }
    }

//    console.log(arr, iteratorCallback, result);
    return result;
}

console.log('reject height >= 10', reject(demoArr, iterator)); // sa returneze un array de obiecte cu height < 10


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
var countColors = countColors();
console.log('find and count colors', countColors);

/*
 10. Sa se scrie o functie care returneaza un array cu toate elementele care au o coluare unica. Oricare element dupa primul care are o culoare care s-ar repeta nu este inclus in array.
 */
function uniqueColor(arr) {
    var result = [], colors = {}, obj;
    for (obj of arr) {
        if (!colors[obj.color]) {
            colors[obj.color] = true;
            result.push(obj);
        }
    }
    return result;
}
console.log('unique color', uniqueColor(demoArr));

/*
 11. Sa se scrie o functie care inverseaza doua numere.
 */
function destructuring(a, b) {
    console.log('initial values', a, b);
    var temp;
    temp = b;
    b = a;
    a = temp;
    return [a, b];
}
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

function arrayToObject() {
    var objArrClasses = [];
    for (var i in classes) {
        objClasses = {
            subject: classes[i][0],
            time: classes[i][1],
            teacher: classes[i][2]
        };
        objArrClasses.push(objClasses);
    }
    return objArrClasses;
}

console.log('array of objects', arrayToObject());
