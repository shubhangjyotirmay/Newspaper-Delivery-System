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
    for (let i = 0; i < data.length; i++) {
        let adminName = data[i].name.split(' ');
        let imgName = '';
        imgName += adminName[0].charAt(0).toUpperCase();
        if (adminName.length > 1) {
            imgName += adminName[1].charAt(0).toUpperCase();
        } else {
            imgName += adminName[0].charAt(1).toUpperCase();
        }
        let newCard = `<div class="admin-list-display-card z-depth-4">
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
    }
}