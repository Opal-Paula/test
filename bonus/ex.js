/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

/**
 * 1.
 * 
 * Sa se defineasca o functie care face ceva similar cu .bind, fara a folosi .bind in definire.
 * Functia vreau sa se numeasca associate() si sa faca codul de mai jos sa functioneze.
 * 
 * eta: 1h
 * eta: made in class
 */

function associate(func, customThis) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        return func.apply(customThis, args);
    };
}

function myFunc() {
    if (this === 'my this') {
        console.info('Success');
    } else {
        console.error('"this" is not correctly set!', this);
    }
}
var newFunc = associate(myFunc, 'my this');
newFunc();

/**
 * 2.
 * 
 * Ce se intampla daca nu folosim 'use strict'? Incercati sa gasiti o explicatie, cat mai exacta cu atat mai bine.
 * 
 * eta: 30 min
 * durata: 1h 30min
 * 
 *Modul 'use strict' restrictioneaza libertatea data de modul normal, care este cu mult mai permisiv in scrierea codului. 
 *Daca nu folosim modul strict, atunci nu vom vedea anumite erori sau exceptii in consola,
 *care ne pot ajuta in scrierea si structurarea codului corect, eficient. De asemenea 'use strict' ne ajuta sa mentinem codul
 *mai usor, ca ulterior sa poata fi reutilizat.
 *Modul normal ne permite sa definim, modificam, utilizam codul intr-o maniera care poate fi problematica atat pentru utilizator 
 *cat si pentru programator: probleme de securitate, de incarcare a aplicatiei, erori 'silentioase', suprascrierea
 *nedeorita/neintentionata a unor proprietati, variabile, loop continuu, etc., atribuirea incorecta de valori unor variabile constante, etc.
 *De ex. in exercitiul 1, daca nu folosim 'use strict', this este preluat ca Obiect in myFunc() si va afisa in consola o eroare (va intra in conditia de else).
 *Folosind 'use strict', this va deveni string, iar acest lucru este util pentru securitate si pentru performanta. This nu va mai fi egal cu window, va deveni undefined.
 *
 *Mica paralela: 
 *Mod normal: imi pot instala pe calculator orice joc doresc. Unele jocuri pot contine malware sau trojan sau orice virus care poate dauna calculatorului. Nu voi sti acest lucru, deoarece calculatorul nu imi va afisa erori. 
 *Eventual voi observa lipsa unor fisiere, comportament ciudat, defectiune sau ecran albastru.
 *Mod strict: calculatorul are antivirus. Nu imi mai pot instala orice joc, deoarece antivirusul mi-l va scana si imi va afisa erori daca va considera ca jocul este 'suspect'/'infectat'.
 *Daca este mai mult o eroare de notificare, pot alege ca antivirusul sa o ignore si sa ma lasa sa imi instalez jocul. In schimb daca eroare se dovedeste a fi un troian, antivirusul ma restrictioneaza
 * de la a instala jocul (va sterge fisiere, va bloca accesul jocului la fisierele calculatorului, etc.).
 **/

/**
 * 3.a
 *
 * Sa se modifice functia associate astfel incat sa permita functiei transmise ca parametru sa primeasca la randul ei oricati parametri
 * Practic vreau sa functioneze ca in exemplul de mai jos, fara a strica exemplul de mai sus! Si vreau sa mearga teoretic cu ORICATI parametri nu doar doi!
 * Se poate rezolva folosind "arguments", tranformat in array (mai stiti cum transformam un array-like in array?). Restul ar trebui sa va dati seama singuri.
 * La ES6 discutam cum facem mai elegant fara arguments.
 * 
 * eta: 1h 30m
 * durata: 1h 36m
 */
function myFunc2(arg1, arg2) {
    if (this === 'my this' && arg1 === 'unu' && arg2 === 'doi') {
        console.info('Success');
    } else {
        console.error('`this` is not correctly set: "%s", or args not transmitted correctly: arg1 = "%s", arg2 = "%s"', this, arg1, arg2);
    }
}

var newFunc2 = associate(myFunc2, 'my this', 'unu', 'doi');
newFunc2(); // daca comentez linia asta vreau sa nu se afiseze nimic in consola, la fel ca mai sus!

/**
 * 3.b
 * 
 * Acum dupa ce ati facut si problema 3 vreau sa va uitati la functia voastra associate si sa o faceti sa aiba maxim 4 randuri in blocul de definitie 
 * (o expresie per linie, nu inghesuiti) 
 * (practic la mine acolada de deschidere a functiei este pe randul 8 si cea de inchidere pe randul 13, 9-12 sunt blocul de definitie)!
 * Daca are mai multe uitati-va ce puteti optimiza la ea. Daca are deja patru randuri (incluzand aici un rand cu doar o acolada) e foarte bine.
 * eta: 1h
 * durata: 41m
 **/

/**
 * 4. 
 *
 * Vreau acum sa faceti similar cu .bind, metoda associate sa poata fi apelata direct pe functie! Vedeti exemplul de mai jos, refolositi-va de ce aveti pana acum!
 * Nu stergeti, nu comentati si nu stricati ce functiona mai sus!
 * Implementarea mea are 3 linii cu o expresie per linie (nu am inghesuit nimic). Va recomand sa studiati Array.prototype.unshift ;).
 *
 * eta: 2h
 * durata: 4h
 */

Function.prototype.associate = function (customThis) {
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    return function () {
        return self.apply(customThis, args);
    };
};
var newFunc3 = myFunc2.associate('my this', 'unu', 'doi');
newFunc3();


/**
 * 5.
 * 
 * Faceti ce trebuie astfel incat codul de mai jos sa functioneze fara a folosi .repeat (practic reimplementati .repeat):
 * 5 randuri :)
 * 
 * eta: 2h
 * durata: 30m
 */

String.prototype.repeatify = function(nr) {
    var i = 0, str = '';
    while(i<nr) {
        str += this;
        i++;
    }
//    console.log(str);
    return str;
};

if ('BatmanBatmanBatman' === 'Batman'.repeatify(3)) {
    console.log('Success');
} else {
    console.error('Didn\'t work: ', 'Batman'.repeatify(3));
}