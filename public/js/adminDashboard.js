function fillFieldsOnLoad(localStoredData) {
    console.log({localStoredData});
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
    localStorage.removeItem('user');
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
})



// //document.querySelector(".get-data").addEventListener('click', getData);

// function getData() {
//     fetch("/api/data").then((res) => {
//         return res.json();
//     }).then((data) => {
//         console.log(data);
//         document.querySelector(".display-data").innerHTML = data.name;
//         let obj = {
//             name: data.name,
//             bill: data.billDues
//         }
//         localStorage.setItem('user', JSON.stringify(obj));
//     })
//     // const res = fetch("/api/data");
//     // const data = (await res).json();
//     // console.log(data);
//     // document.querySelector(".display-data").innerHTML = data;
// }

// //getData();

// function testing() {
//     let obj = JSON.parse(localStorage.getItem('user'));
//     if (obj == null) {
//         getData();
//     } else {
//         document.querySelector(".display-data").innerHTML = obj.name;
//     }
//     //localStorage.removeItem("user");
// }

// testing();