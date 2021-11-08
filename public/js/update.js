let newspaperNames = [
    "Daily Telegram", 
    "Daily Mail", 
    "Enterprise Press", 
    "The dawn Chroncicles", 
    "The Sun Gazette",
    "Daily Explorer",
    "Citizen Tribune",
    "Aurora News",
    "Eastern Times",
    "Prime Time"
];

let magazineNames = [
    "Foodstuff Today",
    "Mind Reports",
    "Scholar Journal",
    "Monster Life",
    "Cuisine Journal",
    "Mastermind Week",
    "Electronics Journal",
    "Film Times",
    "Myth Chronicle",
    "Game Digest"
];

function fillUpdatePage() {
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
    document.querySelector('.new-email').value = userDet.email;
    document.querySelector('.new-name').value = userDet.name;
    document.querySelector('.new-contact').value = userDet.contactNo;
    document.querySelector('.new-address').value = userDet.address;

    displayNews(userDet.newspapers);
    displayMags(userDet.magazines);
}

fillUpdatePage();

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});

function displayNews(newsArr) {
    let newsDiv = document.querySelector('.news-option');
    for (let i = 0; i < newspaperNames.length; i++) {
        let label = document.createElement('label');
        if (newsArr.includes(newspaperNames[i])) {
            label.innerHTML = `<input class="filled-in" type="checkbox" checked /><span>${newspaperNames[i]}</span>`;
        } else {
            label.innerHTML = `<input class="filled-in" type="checkbox" /><span>${newspaperNames[i]}</span>`;
        }
        newsDiv.appendChild(label);
    }
}

function displayMags(magsArr) {
    let magsDiv = document.querySelector('.mags-option');
    for (let i = 0; i < magazineNames.length; i++) {
        let label = document.createElement('label');
        if (magsArr.includes(magazineNames[i])) {
            label.innerHTML = `<input class="filled-in" type="checkbox" checked /><span>${magazineNames[i]}</span>`;
        } else {
            label.innerHTML = `<input class="filled-in" type="checkbox" /><span>${magazineNames[i]}</span>`;
        }
        magsDiv.appendChild(label);
    }
}

let updateBut = document.querySelector('.user-update-but');
updateBut.addEventListener('click', function() {
    updateBut.setAttribute('disabled', 'disabled');
    updateBut.innerHTML = 'Updating Profile...';
    let newName = document.querySelector('.new-name').value;
    let newContact = document.querySelector('.new-contact').value;
    let newAddress = document.querySelector('.new-address').value;

    let newNews = [];
    let newsDiv = document.querySelector('.news-option');
    for (let i = 0; i < newsDiv.children.length; i++) {
        if (newsDiv.children[i].children[0].checked === true) {
            newNews.push(newsDiv.children[i].children[1].innerHTML);
        }
    }

    let newMags = [];
    let magsDiv = document.querySelector('.mags-option');
    for (let i = 0; i < magsDiv.children.length; i++) {
        if (magsDiv.children[i].children[0].checked === true) {
            newMags.push(magsDiv.children[i].children[1].innerHTML);
        }
    }

    let updatedUser = {
        name: newName,
        contactNo: newContact,
        address: newAddress,
        newspapers: newNews,
        magazines: newMags
    }

    //console.log({updatedUser});
    updateUser(updatedUser);
})

function updateUser(updatedUser) {
    let email = document.querySelector('.new-email').value;
    let fetchUrl = `/api/user/${email}`;
    localStorage.removeItem('userNewzly');
    
    fetch(fetchUrl, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        localStorage.setItem('userNewzly', JSON.stringify(data));
        afterUpdate();
    })
}

function afterUpdate() {
    updateBut.removeAttribute('disabled');
    updateBut.innerHTML = 'Update Profile';
    M.toast({html: 'Profile Updated Successfully!', displayLength: 3000})
    setTimeout(() => {
        M.toast({html: 'Redirecting to Profile Page...', displayLength: 3000});
    }, 2000);
    setTimeout(() => {
        window.location.href = '/profile';
    }, 3000);
}