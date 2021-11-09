function fillAdminListPage() {
    let adminName = JSON.parse(localStorage.getItem('userNewzly')).name;
    let names = adminName.split(' ');
    let profImgText = document.querySelector('.navbar-profile-img');
    profImgText.innerHTML = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
        profImgText.innerHTML += names[1].charAt(0).toUpperCase();
    } else {
        profImgText.innerHTML += names[0].charAt(1).toUpperCase();
    }
}

fillAdminListPage();

function fetchAdminPage() {
    fetch('/api/findOnlyAdmins').then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        fillAdmins(data);
        document.querySelector('.admin-list-head').innerHTML = "Admin List"
    })
}

fetchAdminPage();

const adminCol1 = document.querySelector('.admin-list-cards-col1');
const adminCol2 = document.querySelector('.admin-list-cards-col2');

function fillAdmins(data) {
    let cardCount = 0;
    for (let i = 0; i < data.length; i++) {
        let adminName = data[i].name.split(' ');
        let imgName = '';
        imgName += adminName[0].charAt(0).toUpperCase();
        if (adminName.length > 1) {
            imgName += adminName[1].charAt(0).toUpperCase();
        } else {
            imgName += adminName[0].charAt(1).toUpperCase();
        }
        let newCard = `<div id="user-card${cardCount}" onclick="showCard(this.id)" class="admin-list-display-card z-depth-4">
                            <div class="admin-card-content">
                                <div class="admin-card-left">
                                    <div class="admin-card-name">
                                        ${data[i].name}
                                    </div>
                                    <div class="admin-card-id">
                                        ${data[i].id}
                                    </div>
                                </div>
                                <div class="admin-card-right">
                                    <div class="admin-card-img">
                                        ${imgName}
                                    </div>
                                </div>
                            </div>
                        </div>`
        
        if (i % 2 === 0) {
            adminCol1.innerHTML += newCard;
        } else {
            adminCol2.innerHTML += newCard;
        }
        cardCount++;
    }
}

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});

document.querySelector('.user-back-but').addEventListener('click', function() {
    document.querySelector('.admin-list-body').classList.remove('hidden');
    document.querySelector('.profile-body').classList.add('hidden');
})

function showCard(e) {
    let userCardId = document.querySelector(`#${e}`).children[0].children[0].children[1];
    let userCardName = document.querySelector(`#${e}`).children[0].children[0].children[0];
    let userId = userCardId.innerText || userCardId.textContent;
    let userName = userCardName.innerText || userCardName.textContent;

    M.toast({html: `Fetching ${userName}'s details!`, displayLength: 2000});

    fetch(`/api/getUser/${userId}`).then((res) => {
        return res.json();
    }).then((data) => {
        displayProfile(data);
        document.querySelector('.admin-list-body').classList.add('hidden');
        document.querySelector('.profile-body').classList.remove('hidden');
        M.toast({html: `${userName}'s details fetched successfully!'`, displayLength: 2000});
        setTimeout(() => {
            M.toast({html: `Press Go Back to check other users details`, displayLength: 2000});
        }, 1500);
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