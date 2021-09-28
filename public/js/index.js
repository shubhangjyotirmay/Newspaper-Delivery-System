const userRoute = document.querySelector('.user-route');
const adminRoute = document.querySelector('.admin-route');
const logRegCard = document.querySelector('.login-register-card');
const userRegBut = document.querySelector('user-reg-but');
const userLogBut = document.querySelector('.user-log-but');

const userHTML = '<div class="user"><a class="waves-effect waves-light btn user-route">User</a></div>';
const adminHTML = '<div class="admin"><a class="waves-effect waves-light btn admin-route">Admin</a></div>';
const userRegBUtHTML = '<div class="user-but1"><a id="user-reg-but" class="waves-effect waves-light btn">Register</a></div>';
const userLogButHTML = '<div class="user-but2"><a id="user-log-but" class="waves-effect waves-light btn">Login</a></div>';
const urHTML = '<div class="user-register"><h2>Sign Up!</h2><form class="ur-form" action="/user/register" method="post"><div class="email-ur"><input class="register-inputs validate" type="email" name="email" placeholder="Enter Email" autocomplete="off"></div><div class="password-ur"><input class="register-inputs" type="password" name="password" placeholder="Enter Password" autocomplete="off"></div><div class="repassword-ur"><input  class="register-inputs" type="password" name="repassword" placeholder="Re-enter Password" autocomplete="off"></div><button class="waves-effect waves-light btn ur-route">Submit</button></form></div>'
const ulHTML = '<div class="user-login"><h2>Login!</h2><form class="ul-form" action="/user/login" method="post"><div class="email-ul"><input class="register-inputs validate" type="email" name="email" placeholder="Enter Email" autocomplete="off"></div><div class="password-ul"><input class="register-inputs" type="password" name="password" placeholder="Enter Password" autocomplete="off"></div><button class="waves-effect waves-light btn ul-route">Submit</button></form></div>'
const alHTML = '<div class="admin-login"><h2>Login!</h2><form class="al-form" action="/admin/login" method="post"><div class="email-al"><input class="register-inputs validate" type="email" name="email" placeholder="Enter Email" autocomplete="off"></div><div class="password-al"><input class="register-inputs" type="password" name="password" placeholder="Enter Password" autocomplete="off"></div><button class="waves-effect waves-light btn al-route">Submit</button></form></div>'

function changecardDim() {
    logRegCard.style.height = '500px';
    logRegCard.style.width = '400px';
}

userRoute.addEventListener('click', function () {
    logRegCard.innerHTML = '';
    logRegCard.innerHTML += userRegBUtHTML + userLogButHTML;
})

document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'user-reg-but') {
        changecardDim();
        logRegCard.innerHTML = '';
        logRegCard.innerHTML += urHTML;
    }
    if (e.target && e.target.id == 'user-log-but') {
        changecardDim();
        logRegCard.innerHTML = '';
        logRegCard.innerHTML += ulHTML;
    }
})

adminRoute.addEventListener('click', function () {
    changecardDim();
    logRegCard.innerHTML = '';
    logRegCard.innerHTML += alHTML;
})