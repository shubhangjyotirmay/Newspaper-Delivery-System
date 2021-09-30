function fillFieldsOnLoad(localStoredData) {
    document.querySelector('.admin-dashboard-name').innerHTML = localStoredData.name;
    let userName = localStoredData.name;
    let names = userName.split(' ');
    let profImgText = document.querySelector('.navbar-profile-img');
    profImgText.innerHTML = names[0].charAt(0);
    if (names.length > 1) {
        profImgText.innerHTML += names[1].charAt(0);
    }
}

function getOnLoad() {
    let localStoredData = JSON.parse(localStorage.getItem('userNewzly'));
    if (localStoredData == null) {
        fetch('/api/onloadinfo').then((res) => {
            return res.json();
        }).then((data) => {
            localStoredData = data;
            localStorage.setItem('userNewzly', JSON.stringify(localStoredData));
            fillFieldsOnLoad(localStoredData);
        })
    } else {
        fillFieldsOnLoad(localStoredData);
    }
}

getOnLoad();

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});