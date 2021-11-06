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
	document.querySelector('.check-name').classList.remove('hidden');
	document.querySelector('.check-id').classList.remove('hidden');
}

function trackNameInp() {
	let val = document.querySelector('.name-input').value;
	if (val !== '') {
		document.querySelector('.name-search-but').removeAttribute('disabled');
	} else {
		document.querySelector('.name-search-but').setAttribute('disabled', 'disabled');
	}
}

function checkName() {
	document.querySelector('.name-check-res').innerHTML = '';
	let val = document.querySelector('.name-input').value;
	let x = nameBtree.search(val);
	if (x === true) {
		let div1 = document.createElement('div');
		div1.innerHTML = `User with the name ${val} exists in the database`
		document.querySelector('.name-check-res').appendChild(div1);
		let div2 = document.createElement('div');
		div2.innerHTML = 'For details of the user navigate to Find User page';
		document.querySelector('.name-check-res').appendChild(div2);
	} else {
		let div = document.createElement('div');
		div.innerHTML = `User with the name ${val} does not exist in the database`
		document.querySelector('.name-check-res').appendChild(div);
	}
}

function trackIdInp() {
	let val = document.querySelector('.id-input').value;
	if (val !== '') {
		document.querySelector('.id-search-but').removeAttribute('disabled');
	} else {
		document.querySelector('.id-search-but').setAttribute('disabled', 'disabled');
	}
}

function checkId() {
	document.querySelector('.id-check-res').innerHTML = '';
	let val = document.querySelector('.id-input').value;
	let x = idBtree.search(val);
	if (x === true) {
		let div1 = document.createElement('div');
		div1.innerHTML = `User with the ID ${val} exists in the database`
		document.querySelector('.id-check-res').appendChild(div1);
		let div2 = document.createElement('div');
		div2.innerHTML = 'For details of the user navigate to Find User page';
		document.querySelector('.id-check-res').appendChild(div2);
	} else {
		let div = document.createElement('div');
		div.innerHTML = `User with the ID ${val} does not exist in the database`
		document.querySelector('.id-check-res').appendChild(div);
	}
}

document.querySelector('.name-input').addEventListener('keyup', trackNameInp);
document.querySelector('.name-input').addEventListener('keydown', trackNameInp);
document.querySelector('.name-search-but').addEventListener('click', checkName);

document.querySelector('.id-input').addEventListener('keyup', trackIdInp);
document.querySelector('.id-input').addEventListener('keydown', trackIdInp);
document.querySelector('.id-search-but').addEventListener('click', checkId);

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});