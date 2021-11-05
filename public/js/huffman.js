const nameMap = new Map();
const idMap = new Map();
const freqMap = new Map();
let codeMap = new Map();

class HuffmanNode {
    constructor() {
        this.data = 0;
        this.c = '';
        this.left = this.right = null;
    }
}

function getFreq(data) {
    let str = JSON.stringify(data);
    for (let i = 0; i < str.length; i++) {
        if (freqMap.has(str[i]) === true) {
            freqMap.set(str[i], freqMap.get(str[i]) + 1);
        } else {
            freqMap.set(str[i], 1);
        }
    }
    console.log({freqMap});

    let pq = [];
    for (const [key, value] of freqMap) {
        let hm = new HuffmanNode();
        hm.c = key;
        hm.data = value;
        hm.left = hm.right = null;
        pq.push(hm);
    }

    let root = null;
    pq.sort(function(a, b) {
        return a.data - b.data;
    });

    while (pq.length > 1) {
        let x = pq[0];
        pq.shift();

        let y = pq[0];
        pq.shift();

        let f = new HuffmanNode();
        f.data = x.data + y.data;
        f.c = '$';
        f.left = x;
        f.right = y;
        root = f;

        pq.push(f);
        pq.sort(function(a, b) {
            return a.data - b.data;
        });
    }

    getCodes(root, '');
    console.log({codeMap});
}

function getCodes(root, s) {
    if (root.left == null && root.right == null) {
        codeMap.set(root.c, s);
        return;
    }
    getCodes(root.left, s + '0');
    getCodes(root.right, s + '1');
}