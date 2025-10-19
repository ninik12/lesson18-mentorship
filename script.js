//ajax
// 1. xml http requist

let divElement = document.getElementById('users-api')
let title = document.getElementById('title')

function ajaxUsers() {
    let request = new XMLHttpRequest(); //თავდაპირველად ვქმნით მოთხოვნის ობიექტს
    request.open('GET', 'https://jsonplaceholder.typicode.com/users'); //მოთხოვნის კონფიგურაცია - GET მეთოდით ვითხოვთ ინფორმაციის წამოღებას მითითებული url-დან
    request.addEventListener('load', function () {   //ჩვენს მოთხოვნის ობოექტზე addEventListener-ის საშუალებით უნდა მივუმაგროთ load ივენთი, რომელიც მაშინ ირთვება, როდესაც მოთხოვნა წარმატებით შესრულდება, ფუნქციის ტანში კი ავღწერთ წარმატების შემთხვევაში რა უნდა მოხდეს
        let responseInfo = this.response;
        let responseInfoJs = JSON.parse(responseInfo);
        // console.log(responseInfoJs);

        let ulElement = document.createElement('ul')
        responseInfoJs.forEach((element) => {
            let liEl = document.createElement('li');
            liEl.innerText = `${element.username}---- adrdress: ${element.address.city} --- phone:${element.phone}`;
            ulElement.appendChild(liEl);
        });
        divElement.appendChild(ulElement);
    })
    request.addEventListener('error', function () {  //წარუმატებლობის შემთხვევაში რა უნდა მოხდეს, ერორ ივენთის საშუალებით ავღწერთ ფუნქციას
        let pError = document.createElement('p');
        pError.textContent = 'Server Error';
        divElement.appendChild(pError);

    })
    request.send() //გავაგზავნოთ ეს მოთხოვნა
}

// ajaxUsers()

//2. fetch
fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
})
    .then(function (response) {   //აქ მოდის პირობა
        // console.log(response);
        if (response.status !== 200) {   //ნებისმიერი შეცდომის დროს უნდა წავიდეს catch-ში და ამიტომაც ვუწერთ ლოგიკას 
            throw 'error' // გადადის ქეთჩში
        }

        return response.json();  //პირობას ამოვიღებ ჯეისონ ფორმატში
    })
    .then(function (getInfo) {   //აქ ჩავარდება ინფორმაცია როგორც ჯავასკრიპტის ობიექტი
        // console.log(getInfo);
        let nameTitle = document.createElement('h3');
        nameTitle.textContent = getInfo[2].name;
        title.appendChild(nameTitle)


    })
    .catch(function (error) {
        console.log(error);
    })



