let userSubscription = [];

let boolArr = [true, false];

for (let i = 0; i < 100; i++) {
    let check = boolArr[Math.floor(Math.random() * boolArr.length)];
    userSubscription.push(check);
}

module.exports = userSubscription;