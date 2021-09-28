let newspaperNames = [
    "Daily Telegram", 
    "Daily Mail", 
    "Enterprise Press", 
    "The dawn Chroncicles", 
    "The Sun Gazette",
    "Daily Explorer",
    "Citizen Tribune",
    "Aurora News",
    "Eastern Times",
    "Prime Time"
];

let userNewspapers = [];
let max = 9;
let min = 1;

for (let i = 0; i < 100; i++) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    num = Math.max(num, 1);
    num = Math.min(num, 3);
    let mySet = new Set();
    let tempPaper = [];
    for (let j = 0; j < num; j++) {
        let numIndex = Math.floor(Math.random() * 10);
        if (mySet.has(numIndex) === false) {
            tempPaper.push(newspaperNames[numIndex]);
            mySet.add(numIndex);
        }
    }
    userNewspapers.push(tempPaper);
}

module.exports = userNewspapers;