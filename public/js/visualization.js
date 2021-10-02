let names = [];
let ids = [];
let nameBtree = null;
let idBtree = null;

function fillVisPage() {
    let userName = JSON.parse(localStorage.getItem('userNewzly')).name;
    let names = userName.split(' ');
    let profImgText = document.querySelector('.navbar-profile-img');
    profImgText.innerHTML = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
        profImgText.innerHTML += names[1].charAt(0).toUpperCase();
    } else {
        profImgText.innerHTML += names[0].charAt(1).toUpperCase();
    }
}

function getVisData() {
    fetch('/api/findOnlyUsers').then((res) => {
        return res.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            names.push(data[i].name);
            ids.push(data[i].id);
        }
        buildBTree();
    })
}

window.onload = function() {
	fillVisPage();
	getVisData();
}

function makeNameTree() {
	nameBtree = new tree(3);
	buildNameTree();
	nameBtree.show('names-canvas');
}
function buildNameTree() {
	for (let i = 0; i < names.length; i++) {
		nameBtree.insert(names[i], '');
	}
}

function makeIdTree() {
	idBtree = new tree(4);
	buildIdTree();
	idBtree.show('id-canvas');
}
function buildIdTree() {
	for (let i = 0; i < ids.length; i++) {
		idBtree.insert(ids[i], '');
	}
}

function buildBTree() {
	makeNameTree();
	makeIdTree();
	document.querySelector('.visualization-header').innerHTML = 'B+ Trees Visualization for Names and ID entry';
	document.querySelector('.Btree-name-text').innerHTML = 'B+ Tree for User Names';
	document.querySelector('.Btree-id-text').innerHTML = 'B+ Tree for User IDs';
	document.querySelector('.visualization-body').style.marginBottom = '50px';
}

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});