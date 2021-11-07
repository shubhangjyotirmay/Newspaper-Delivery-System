function fillProfilePage() {
    let userName = JSON.parse(localStorage.getItem('userNewzly')).name;
    let names = userName.split(' ');
    let profImgText = document.querySelector('.navbar-profile-img');
    profImgText.innerHTML = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
        profImgText.innerHTML += names[1].charAt(0).toUpperCase();
    } else {
        profImgText.innerHTML += names[0].charAt(1).toUpperCase();
    }

    let userDet = JSON.parse(localStorage.getItem('userNewzly'));
    displayProfile(userDet);
}

fillProfilePage();

function displayProfile(searchRes) {
    fillLeftTop(searchRes);
    fillLeftBot(searchRes);
    fillRightTop(searchRes);
    fillRightBot(searchRes);
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

function fillRightBot(searchRes) {
    let newsList = searchRes.newspapers;
    let magsList = searchRes.magazines;
    let newsDiv = document.querySelector('.find-news-list');
    let magsDiv = document.querySelector('.find-mags-list');
    newsDiv.innerHTML = '';
    magsDiv.innerHTML = '';
    for (let i = 0; i < newsList.length; i++) {
        let div = document.createElement('div');
        div.innerHTML = newsList[i];
        newsDiv.appendChild(div);
    }
    for (let i = 0; i < magsList.length; i++) {
        let div = document.createElement('div');
        div.innerHTML = magsList[i];
        magsDiv.appendChild(div);
    }
}