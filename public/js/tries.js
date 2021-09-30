const searchInputBar = document.querySelector('.search-text-box');
const searchSuggestion = document.querySelector('.search-suggestion');
let userFindList = [];

function fillFindPage() {
    let userName = JSON.parse(localStorage.getItem('userNewzly')).name;
    let names = userName.split(' ');
    let profImgText = document.querySelector('.navbar-profile-img');
    profImgText.innerHTML = names[0].charAt(0);
    if (names.length > 1) {
        profImgText.innerHTML += names[1].charAt(0);
    }
}

fillFindPage();

function fetchUserList() {
    fetch('/api/userList').then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            userFindList.push(data[i].name);
        }
        buildTrie();
        searchInputBar.placeholder = "Enter Name";
        searchInputBar.disabled = false;
    })
}

fetchUserList();

function displaySuggestions() {
    searchSuggestion.classList.remove('hidden');
}
searchInputBar.addEventListener('keydown', displaySuggestions);
searchInputBar.addEventListener('keyup', displaySuggestions);
searchInputBar.addEventListener('click', displaySuggestions);

window.addEventListener('click', function (e) {
    if (!e.target.matches('.search-text-box') && !e.target.matches('.search-suggestion')) {
        if (searchSuggestion.classList.contains('hidden')) {

        } else {
            searchSuggestion.classList.add('hidden');
        }
    }
})

class Trie {
    constructor(char) {
        this.char = char;
        this.isEndOfWord = false;
        this.map = {};
        this.words = [];
    }
}

function addTrie(str, i, rootTrie) {
    if (i === str.length) {
        rootTrie.words.push(str);
        rootTrie.isEndOfWord = true;
        return;
    }

    if (!rootTrie.map[str[i]]) {
        rootTrie.map[str[i]] = new Trie(str[i]);
    }

    rootTrie.words.push(str);
    addTrie(str, i + 1, rootTrie.map[str[i]]);
}

function searchTrie(str, i, rootTrie) {
    if (i === str.length)
        return rootTrie.words;

    if (!rootTrie.map[str[i]]) {
        return [];
    }

    return searchTrie(str, i + 1, rootTrie.map[str[i]]);
}

const rootTrie = new Trie('\0');
function buildTrie() {
    for (let i = 0; i < userFindList.length; i++) {
        addTrie(userFindList[i], 0, rootTrie);
    }
}

function giveSuggestions(e) {
    const str = e.target.value;
    const predictions = searchTrie(str, 0, rootTrie);
    //console.log(predictions);
    searchSuggestion.innerHTML = '';
    for (let i = 0; i < predictions.length; i++) {
        searchSuggestion.innerHTML += `<div class="suggestion-item" onClick="placeItemInBar(this)"><b>${str}</b>${predictions[i].substring(str.length)}</div>`
    }
}

function placeItemInBar(e) {
    searchInputBar.value = e.innerText;
}

searchInputBar.addEventListener('keyup', giveSuggestions);
searchInputBar.addEventListener('keydown', giveSuggestions);
searchInputBar.addEventListener('click', giveSuggestions);

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});

