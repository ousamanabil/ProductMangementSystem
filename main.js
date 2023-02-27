//get total
//creat product
//save loclstorge
//clear inputs
//delete
//count
//update
//search
//clean data


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogory = document.getElementById('catogory');
let submit = document.getElementById('submit');
let mode = 'create';
let tmp;


//console.log(title, price, taxes, ads, discount,total,count, catogory,submit);

//get total---------------------------------------
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(95, 8, 19)';
    }
}
//creat product----------------------------------

let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}


submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogory: catogory.value.toLowerCase(),
    }
   if(title.value !=''
   && price.value !='' 
   && catogory.value !=''
   && newPro.count < 100 ){
    if (mode === 'create') {

        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mode = 'creata';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
    clearData() 
}
  


    //save loclstorge--------------------------
    localStorage.setItem('product', JSON.stringify(dataPro))
  
    showData()
};

//clear inputs----------------------------------

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catogory.value = '';
}
//read--------------------------------------


function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {

        table += `
  <tr>
  <td>${i+1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].catogory}</td>
  <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
</tr>
  `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All(${dataPro.length})</button>
  `
    } else {
        btnDelete.innerHTML = '';
    }
}
showData()

//delete-----------------------------------------

function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

//deleteAll---------

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0)
    showData()
}


//count---------------------------------------


//update---------------------------------------

function updateData(i) {

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    catogory.value = dataPro[i].catogory;
    submit.innerHTML = 'update';
    mode = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}
//search----------------------------------------

let searchMode = 'title';

function getSearchMode(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMode = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMode = 'catogory';
        search.placeholder = 'Search By Catorgory';
    }
    search.focus()
    search.value = '';
    showData()

}
function searchData(value) {
    let table = '';
    if (searchMode == 'title') {


        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {

                table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].catogory}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
  </tr>
    `;
            }
        }
    }
    else 
    {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].catogory.includes(value.toLowerCase())) {

                table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].catogory}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
  </tr>
    `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data----------------------------------------------------------

