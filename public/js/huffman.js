let nameMap = new Map();
let freqMap = new Map();
let codeMap = new Map();
let pq = [];
let root = null;
let dataJSON;
let dataString;

class HuffmanNode {
    constructor() {
        this.freq = 0;
        this.char = '';
        this.left = this.right = null;
    }
}

function getFreq(data) {
    dataJSON = data;
    dataString = JSON.stringify(data);
    for (let i = 0; i < dataString.length; i++) {
        if (freqMap.has(dataString[i]) === true) {
            freqMap.set(dataString[i], freqMap.get(dataString[i]) + 1);
        } else {
            freqMap.set(dataString[i], 1);
        }
    }
    //console.log({freqMap});

    buildHuffmanTree();
    //console.log({nameMap});
}

function buildHuffmanTree() {
    for (const [key, value] of freqMap) {
        let hm = new HuffmanNode();
        hm.char= key;
        hm.freq = value;
        hm.left = hm.right = null;
        pq.push(hm);
    }

    pq.sort(function(a, b) {
        return a.data - b.data;
    });

    while (pq.length > 1) {
        let x = pq[0];
        pq.shift();

        let y = pq[0];
        pq.shift();

        let f = new HuffmanNode();
        f.freq = x.freq + y.freq;
        f.char = '$';
        f.left = x;
        f.right = y;
        root = f;

        pq.push(f);
        pq.sort(function(a, b) {
            return a.data - b.data;
        });
    }

    getCodes(root, '');
    //console.log({codeMap});

    encodeData();
}

function getCodes(root, s) {
    if (root.left == null && root.right == null) {
        codeMap.set(root.char, s);
        return;
    }
    getCodes(root.left, s + '0');
    getCodes(root.right, s + '1');
}

function encodeData() {
    for (let i = 0; i < dataJSON.length; i++) {
        let encodedString = '';
        let str = JSON.stringify(dataJSON[i]);
        for (let j = 0; j < str.length; j++) {
            encodedString += codeMap.get(str[j]);
        }
        nameMap.set(dataJSON[i].name, encodedString);
    }
}

function decodeData() {
    let searchName = document.querySelector('.search-text-box').value;
    let str = nameMap.get(searchName);
    let n = str.length;
    let i = 0;
    let decStr = '';
    while (i < n) {
        let tempRoot = root;
        while (i < n && (tempRoot.left != null || tempRoot.right != null)) {
            if (str[i] === '0') {
                tempRoot = tempRoot.left;
            } else {
                tempRoot = tempRoot.right;
            }
            i++;
        }
        decStr += tempRoot.char;
    }

    let x = JSON.parse(decStr);
    displaySearchResult(x);
}

function displaySearchResult(searchRes) {
    fillLeftTop(searchRes);
    fillLeftBot(searchRes);
    fillRightTop(searchRes);

    document.querySelector('.find-result').classList.remove('hidden');
}

function fillLeftTop(searchRes) {
    let profPicName = '';
    let resNames = searchRes.name.split(' ');
    profPicName = resNames[0].charAt(0).toUpperCase();
    if (resNames.length > 1) {
        profPicName += resNames[1].charAt(0).toUpperCase();
    } else {
        profPicName += resNames[0].charAt(1).toUpperCase();
    }
    document.querySelector('.find-pic').innerHTML = profPicName;
    document.querySelector('.find-pic-name').innerHTML = searchRes.name;
}

function fillLeftBot(searchRes) {
    let resDues;
    if (searchRes.dues === true) {
        resDues = 'Yes';
    } else {
        resDues = 'None';
    }
    document.querySelector('.find-due').children[1].innerHTML = resDues;

    let resSub;
    if (searchRes.onlineSub === true) {
        resSub = 'Yes';
    } else {
        resSub = 'None';
    }
    document.querySelector('.find-online').children[1].innerHTML = resSub;
}

function fillRightTop(searchRes) {
    document.querySelector('.find-info-id').children[1].innerHTML = searchRes.id;
    document.querySelector('.find-info-name').children[1].innerHTML = searchRes.name;
    document.querySelector('.find-info-email').children[1].innerHTML = searchRes.email;
    document.querySelector('.find-info-contact').children[1].innerHTML = searchRes.contactNo;
    document.querySelector('.find-info-address').children[1].innerHTML = searchRes.address;
}

function fillRightBotLeft(searchRes) {

}

document.querySelector('.searchbar-but').addEventListener('click', decodeData);