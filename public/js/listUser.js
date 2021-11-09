function fillUserListPage() {
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

fillUserListPage();

function fetchUserPage() {
    fetch('/api/findOnlyUsers').then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        fillUsers(data);
        document.querySelector('.user-list-head').innerHTML = "Users List"
    })
}

fetchUserPage();

const userCol1 = document.querySelector('.user-list-cards-col1');
const userCol2 = document.querySelector('.user-list-cards-col2');

function fillUsers(data) {
    let cardCount = 0;
    for (let i = 0; i < data.length; i++) {
        let userName = data[i].name.split(' ');
        let imgName = '';
        imgName += userName[0].charAt(0).toUpperCase();
        if (userName.length > 1) {
            imgName += userName[1].charAt(0).toUpperCase();
        } else {
            imgName += userName[0].charAt(1).toUpperCase();
        }
        let newCard = `<div id="user-card${cardCount}" onclick="showCard(this.id)" class="user-list-display-card z-depth-4">
                            <div class="user-card-content">
                                <div class="user-card-left">
                                    <div class="user-card-name">
                                        ${data[i].name}
                                    </div>
                                    <div class="user-card-id">
                                        ${data[i].id}
                                    </div>
                                </div>
                                <div class="user-card-right">
                                    <div class="user-card-img">
                                        ${imgName}
                                    </div>
                                </div>
                            </div>
                        </div>`
        
        if (i % 2 === 0) {
            userCol1.innerHTML += newCard;
        } else {
            userCol2.innerHTML += newCard;
        }
        cardCount++;
    }
}

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});

document.querySelector('.user-back-but').addEventListener('click', function() {
    document.querySelector('.user-list-body').classList.remove('hidden');
    document.querySelector('.profile-body').classList.add('hidden');
})

function showCard(e) {
    let userCardId = document.querySelector(`#${e}`).children[0].children[0].children[1];
    let userCardName = document.querySelector(`#${e}`).children[0].children[0].children[0];
    let userId = userCardId.innerText || userCardId.textContent;
    let userName = userCardName.innerText || userCardName.textContent;

    M.toast({html: `Fetching ${userName}'s details!`, displayLength: 3000});

    fetch(`/api/getUser/${userId}`).then((res) => {
        return res.json();
    }).then((data) => {
        displayProfile(data);
        document.querySelector('.user-list-body').classList.add('hidden');
        document.querySelector('.profile-body').classList.remove('hidden');
        M.toast({html: `${userName}'s details fetched successfully!'`, displayLength: 3000});
        setTimeout(() => {
            M.toast({html: `Press Go Back to check other users details`, displayLength: 3000});
        }, 2500);
    })
}

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