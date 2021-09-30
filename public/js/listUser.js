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
    for (let i = 0; i < data.length; i++) {
        let userName = data[i].name.split(' ');
        let imgName = '';
        imgName += userName[0].charAt(0).toUpperCase();
        if (userName.length > 1) {
            imgName += userName[1].charAt(0).toUpperCase();
        } else {
            imgName += userName[0].charAt(1).toUpperCase();
        }
        let newCard = `<div class="user-list-display-card z-depth-4">
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
    }
}

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});