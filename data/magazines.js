let magazineNames = [
    "Foodstuff Today",
    "Mind Reports",
    "Scholar Journal",
    "Monster Life",
    "Cuisine Journal",
    "Mastermind Week",
    "Electronics Journal",
    "Film Times",
    "Myth Chronicle",
    "Game Digest"
];

let userMagazines = [];
let max = 9;
let min = 1;

for (let i = 0; i < 100; i++) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    num = Math.max(num, 1);
    num = Math.min(num, 3);
    let mySet = new Set();
    let tempMagazine = [];
    for (let j = 0; j < num; j++) {
        let numIndex = Math.floor(Math.random() * 10);
        if (mySet.has(numIndex) === false) {
            tempMagazine.push(magazineNames[numIndex]);
            mySet.add(numIndex);
        }
    }
    userMagazines.push(tempMagazine);
}

module.exports = userMagazines;