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

document.querySelector('.user-logout-but').addEventListener('click', function () {
    localStorage.removeItem('userNewzly');
});

let namesNum = [
    "Brittney Hunt",
    "Angelica Walker",
    "Daniel Lopez",
    "Daniel Wu",
    "Ronnie Sanders",
    "Shane Barber",
    "Kyle Osborne",
    "Heather Caldwell",
    "Tyler Davis",
    "Alfred Butler",
    "Tyler Gray",
    "Tracy Martinez",
    "Heather Simpson",
    "Jamie Thompson",
    "John Johnson",
    "Kelli Alvarado",
    "Angela Roy",
    "Brenda Ramos",
    "Donald Boyd",
    "Joseph Palmer",
    "Anna Lopez",
    "Stephanie Moss",
    "Taylor Thompson",
    "Linda Kennedy",
    "William Patterson",
    "Howard Ferguson",
    "Howard Curry",
    "Melissa Clay",
    "Allison Fuentes",
    "John Hall",
    "Tina Rhodes",
    "Brenda Freeman",
    "Angel Hale",
    "John Rodriguez",
    "Brian Browning",
    "Amy Poole",
    "Shelby Ramirez",
    "Sarah Gomez",
    "Jeffrey Higgins",
    "Miguel Mckinney",
    "Austin Howe",
    "Ryan Rose",
    "Stacey Edwards",
    "Jasmine Huynh",
    "Kathryn Blackburn",
    "Amanda Quinn",
    "Alexander Freeman",
    "Timothy Griffin",
    "Jose King",
    "Daniel Skinner",
    "Brittney Davis",
    "Kelly Rodriguez",
    "Kenneth Williams",
    "Alyssa Davis",
    "Carrie Parrish",
    "Michelle Gonzalez",
    "Kenneth Padilla",
    "Sonya Torres",
    "Phillip Dean",
    "Roger Henry",
    "Nicholas Roberts",
    "Michael Conley",
    "Patrick Maldonado",
    "Jeremy Howard",
    "Kelsey Johnson",
    "Jessica Gonzalez",
    "David Andrews",
    "Ricardo Page MD",
    "William Henderson",
    "Jonathan Sullivan",
    "Lisa Contreras",
    "David Howell",
    "Steven Mendez",
    "John Lee",
    "Samuel Smith",
    "Anna Simmons",
    "Christopher Welch",
    "Tony Smith",
    "Karen Smith",
    "Thomas Thomas",
    "Jacqueline Martin",
    "Rebecca Johnson",
    "Diane Lewis",
    "Vincent Decker",
    "Victoria Harris",
    "Dennis Harris",
    "Scott Williams",
    "James Edwards",
    "Jennifer Schmidt",
    "Deborah Norton",
    "Alicia Lane",
    "Janet Hopkins",
    "Annette Smith",
    "Kim Mayer",
    "Sonya Rodriguez",
    "Laurie Williams",
    "Jessica Williams",
    "Mark Daniels",
    "Jessica Robbins",
    "Rachel Ferguson"
]

let edges = [
    [61, 93, 257],
    [93, 50, 121],
    [50, 1, 199],
    [50, 54, 190],
    [54, 71, 201],
    [71, 5, 300],

    [88, 66, 250],
    [66, 2, 210],
    [2, 75, 165],
    [75, 73, 200],
    [73, 46, 187],
    [46, 24, 170],

    [82, 47, 199],
    [82, 78, 200],
    [82, 4, 251],
    [82, 87, 178],
    [82, 81, 121],
    [81, 87, 192],
    [47, 25, 188],

    [59, 26, 211],
    [26, 51, 192],
    [51, 11, 196],
    [11, 59, 177],
    [11, 48, 169],
    [48, 51, 167],
    [48, 72, 235],
    [11, 62, 187],

    [74, 28, 172],
    [28, 97, 255],
    [97, 9, 209],
    [9, 74, 177],
    [74, 89, 182],
    [28, 30, 163],
    [9, 31, 233],

    [0, 94, 202],
    [0, 37, 181],
    [94, 37, 169],
    [0, 14, 222],
    [0, 18, 217],
    [14, 18, 205],
    [0, 65, 210],
    [0, 68, 193],
    [65, 68, 123],

    [84, 44, 171],
    [84, 34, 229],
    [84, 55, 211],
    [84, 58, 188],
    [84, 8, 196],
    [84, 40, 189],
    
    [53, 7, 190],
    [7, 60, 177],
    [60, 35, 200],
    [35, 63, 241],
    [63, 53, 222],
    [53, 67, 233],
    [53, 15, 198],

    [85, 21, 218],
    [21, 38, 213],
    [38, 17, 199],
    [17, 12, 209],
    [12, 38, 220],
    [17, 77, 200],
    [12, 64, 213],

    [33, 23, 202],
    [23, 29, 165],
    [29, 33, 190],
    [29, 56, 231],
    [29, 83, 222],
    [83, 45, 177],
    [45, 29, 176],
    [45, 19, 199],

    [95, 3, 200],
    [3, 98, 187],
    [98, 80, 211],
    [80, 96, 177],
    [96, 95, 199],
    [96, 36, 198],

    [13, 99, 188],
    [99, 6, 199],
    [6, 10, 177],
    [10, 32, 155],
    [32, 42, 166],
    [42, 13, 178],

    [57, 91, 207],
    [91, 49, 200],
    [49, 90, 219],
    [90, 52, 215],
    [52, 57, 171],
    [52, 91, 181],
    [52, 86, 193],

    [43, 27, 251],
    [27, 92, 200],
    [92, 43, 190],
    [92, 39, 177],
    [39, 20, 192],
    [20, 16, 241],
    [16, 92, 211],

    [69, 41, 185],
    [41, 22, 179],
    [22, 70, 190],
    [70, 41, 208],
    [22, 76, 229],
    [76, 79, 213],
    [79, 22, 220]
]

function loadCityPlan() {
    document.querySelector('.delivery-before-load').classList.add('hidden');
    document.querySelector('.city-map').classList.remove('hidden');
    document.querySelector('.city-components').classList.remove('hidden');
    document.querySelector('.city-distances').classList.remove('hidden');
}

setTimeout(() => {
    loadCityPlan();
}, 5000);