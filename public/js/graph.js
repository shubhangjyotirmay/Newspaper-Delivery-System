let noOfComp = new Set();
let INF = 1000000;

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

function floydWarshall(distArray) {
    for (let k = 0; k < 100; k++) {
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                if (distArray[i][k] + distArray[k][j] < distArray[i][j]) {
                    distArray[i][j] = distArray[i][k] + distArray[k][j];
                }
            }
        }
    }

    //console.log({distArray});
    displayDist(distArray);
}

function makeArray() {
    let distArray = new Array(100);
    for (let i = 0; i < 100; i++) {
        distArray[i] = new Array(100);
        for (let j = 0; j < 100; j++) {
            distArray[i][j] = INF;
        }
    }

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (distArray[i][j] != 1000000) {
                continue;
            }
            if (i == j) {
                distArray[i][j] = 0;
                continue;
            }
            for (let k = 0; k < edges.length; k++) {
                if ((edges[k][0] === i && edges[k][1] === j) || (edges[k][0] === j && edges[k][1] === i)) {
                    distArray[i][j] = edges[k][2];
                    distArray[j][i] = edges[k][2];
                }
            }
        }
    }

    //console.log({distArray});
    floydWarshall(distArray)
}

makeArray();

function displayDist(distArray) {
    let pairSet = new Set();
    let tableSwitch = 0;
    let table1 = document.querySelector('.table-body1');
    let table2 = document.querySelector('.table-body2');

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (distArray[i][j] === INF || distArray[i][j] === 0) {
                continue;
            }
            let point1 = namesNum[i];
            let point2 = namesNum[j];
            let str1 = point1 + point2;
            let str2 = point2 + point1;
            if (pairSet.has(str1) === true || pairSet.has(str2) === true) {
                continue;
            }
            pairSet.add(str1);
            pairSet.add(str2);

            let row = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            cell1.innerHTML = `${point1}`;
            cell2.innerHTML = `${point2}`;
            cell3.innerHTML = `${distArray[i][j]}`;
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            if (tableSwitch === 0) {
                table1.appendChild(row);
                tableSwitch = 1;
            } else {
                table2.appendChild(row);
                tableSwitch = 0;
            }
        }
    }

    console.log({pairSet});
}