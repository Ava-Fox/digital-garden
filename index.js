console.log("hello, world!")
// FizzBuzz
for (let i = 0; i <= 100; i++) {
    divThree = (i % 3 == 0);
    divFive = (i % 5 == 0);
    if (divThree && divFive) {
        console.log("Fizzbuzz")
    }
    else if (divThree) {
        console.log("Fizz")
    }
    else if (divFive) {
        console.log("Buzz")
    }
    else {
        console.log(i)
    }
}
/*
#
##
###
####
#####
######
*/
hash = "#"
for (let i = 0; i < 7; i++) {
    console.log(hash)
    hash += "#"
}
// Chessboard
let size = 8, str = "", newChar = " ";
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        str += newChar;
        if (newChar == " " ? newChar = "o" : newChar = " ");
    }
    if (newChar == " " ? newChar = "o" : newChar = " ");
    str += "\n";
}
console.log(str);

// Minimum 
let mini = (a, b) => (a < b ? a : b); // I'm a fucking Java pro dude
console.log("Smallest number between 3 and 4 is: " + mini(3, 4));

// Counting capital B's in word
let countBs = string => countChar(string, "B");

function countChar(string, char) {
    let count = 0, length = string.length;
    for (let i = 0; i < length; i++) {
        if (string[i] === char) {
            count++
        }
    }
    return count;
}
console.log("There is " + countBs("Beelzebub") + " capital B in Beelzebub!");

function isEven(n) {
// 0 even
// 1 odd
// otherwise, evenness same as n - 2
    // see if n - 2 is even, then return that answer?
if (n == 0) {
    return true;
}
else if (n == 1) {
    return false;
}
else {
    return isEven(n - 2);
}
}
console.log("2 is even:  " + isEven(2));
console.log("3 is even:  " + isEven(100));