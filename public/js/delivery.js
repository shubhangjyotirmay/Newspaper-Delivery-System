function fillDeliveryPage(localStoredData) {
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

fillDeliveryPage();

document.querySelector('.user-logout-but').addEventListener('click', function() {
    localStorage.removeItem('userNewzly');
});