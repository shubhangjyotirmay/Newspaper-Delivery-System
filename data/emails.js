const userNames = require("./names");

let emailSuffix = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"]

let emails = [];
for (let i = 0; i < 100; i++) {
    let namesSplit = userNames[i].split(" ");
    let emailString = "";
    for (let j = 0; j < namesSplit.length; j++) {
        emailString += namesSplit[j];
    }
    let ranNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    emailString += ranNum;
    let getEmailEnd = emailSuffix[Math.floor(Math.random() * emailSuffix.length)];
    emailString += getEmailEnd;
    emails.push(emailString);
}

//console.log(emails);

module.exports = emails