let noOfComp = new Set();

class subset {
    constructor() {
        this.parent = 0;
        this.rank = 0;
    }
}

function findDSU(subsets, i) {
    if (subsets[i].parent != i) {
        subsets[i].parent = findDSU(subsets, subsets[i].parent);
    }
    return subsets[i].parent;
}

function UnionDSU(subsets, x, y) {
    let xroot = findDSU(subsets, x);
    let yroot = findDSU(subsets, y);

    if (subsets[xroot].rank < subsets[yroot].rank) {
        subsets[xroot].parent = yroot;
    } else if (subsets[yroot].rank < subsets[xroot].rank) {
        subsets[yroot].parent = xroot;
    } else {
        subsets[xroot].parent = yroot;
        subsets[yroot].rank++;
    }
}

function countComponents() {
    let subsets = new Array(100);
    for (let v = 0; v < 100; v++) {
        subsets[v] = new subset();
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }

    for (let e = 0; e < edges.length; e++) {
        let x = findDSU(subsets, edges[e][0]);
        let y = findDSU(subsets, edges[e][1]);
        UnionDSU(subsets, x, y);
    }

    for (let i = 0; i < 100; i++) {
        noOfComp.add(findDSU(subsets, i));
    }

    totComp();
}

countComponents();

function totComp() {
    let totalComp = noOfComp.size;
    document.querySelector('.total-comp').innerHTML = `Total Number of Different Areas are ${totalComp}`;
}