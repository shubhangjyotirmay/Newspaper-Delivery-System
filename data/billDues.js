let userBillDue = [];

let boolArr = [true, false];

for (let i = 0; i < 100; i++) {
    let check = boolArr[Math.floor(Math.random() * boolArr.length)];
    userBillDue.push(check);
}

module.exports = userBillDue;