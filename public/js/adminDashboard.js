function fillFieldsOnLoad(localStoredData) {
    document.querySelector('.admin-dashboard-name').innerHTML = localStoredData.name;
    let userName = localStoredData.name;
    let names = userName.split(' ');
    let profImgText = document.querySelector('.navbar-profile-img');
    profImgText.innerHTML = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
        profImgText.innerHTML += names[1].charAt(0).toUpperCase();
    } else {
        profImgText.innerHTML += names[0].charAt(1).toUpperCase();
    }
}

function getOnLoad() {
    fetch('/api/onloadinfo').then((res) => {
        return res.json();
    }).then((data) => {
        localStorage.setItem('userNewzly', JSON.stringify(data));
        fillFieldsOnLoad(data);
    })
}

window.onload = getOnLoad();

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});