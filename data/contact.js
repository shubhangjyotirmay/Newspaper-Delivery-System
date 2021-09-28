let contactNo = [];
for (let i = 0; i < 100; i++) {
    let generatedNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    contactNo.push(generatedNumber);
}

module.exports = contactNo;