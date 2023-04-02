let buttons = document.querySelector('.buttons') 
let SelectedIngredients = document.querySelector('.ingSelected') 

const ingredientsLine1 = document.getElementById('ingredientsLine1')
const ingredientsLine2 = document.getElementById('ingredientsLine2')
const ingredientsLine3 = document.getElementById('ingredientsLine3')

const searchButton = document.getElementById('ember4')

const ingredientsLine4 = document.getElementById('ingredientsLine4')

let array = []
let ingredientsList = []
let ingredientsSelected = []

let list1 = []
let list2 = []
let list3 = []

function showData(array) {
    // console.log(array);
    let i = 0
    list1 = []
    list2 = []
    list3 = []
    array.forEach(element => {
        if (i <= 18) {
            list1.push(element)
        } else if (i >= 19 && i <= 37) {
            list2.push(element)
        } else if (i > 37 && i <= 57) {
            list3.push(element)
        }
        i += 1
    });
    handlDataShow(list1, list2, list3)
    showIngredientsSelected(ingredientsSelected)
}

fetch("https://api.gumbo.co.uk/ingredients?&top=true")
    .then(response => response.json())
    .then(
        data => {
            array = data.data
            ingredientsList = array
            showData(ingredientsList)

        });
function handlDataShow(array1, array2, array3) {
    ingredientsLine1.innerHTML = ``
    ingredientsLine2.innerHTML = ``
    ingredientsLine3.innerHTML = ``

    // console.log(array1);
    // console.log(array2);
    // console.log(array3);
    // console.log(array4);
    array1.forEach(element => {
        let button = document.createElement('button')
        button.setAttribute("class", "ingredientButton")
        button.setAttribute("id", element.id)
        button.setAttribute("onclick", `selectedIngredient(${element.id})`)
        button.innerHTML = `<span>${element.attributes.emoji}</span> <span>${element.attributes.name}</span>`
        ingredientsLine1.appendChild(button)
    })
    array2.forEach(element1 => {
        let button = document.createElement('button')
        button.setAttribute("class", "ingredientButton")
        button.setAttribute("id", element1.id)
        button.setAttribute("onclick", `selectedIngredient(${element1.id})`)
        button.innerHTML = `<span>${element1.attributes.emoji}</span> <span>${element1.attributes.name}</span>`
        ingredientsLine2.appendChild(button)
    })
    array3.forEach(element3 => {
        let button = document.createElement('button')
        button.setAttribute("class", "ingredientButton")
        button.setAttribute("id", element3.id)
        button.setAttribute("onclick", `selectedIngredient(${element3.id})`)
        button.innerHTML = `<span>${element3.attributes.emoji}</span> <span>${element3.attributes.name}</span>`
        ingredientsLine3.appendChild(button)
    })


}

function showIngredientsSelected(array) {
    if (array.length == 0) {
        SelectedIngredients.style.display = 'none'
        searchButton.style.display = 'none'
    } else {
        SelectedIngredients.style.display = 'block'
        searchButton.style.display = 'flex'

        ingredientsLine4.innerHTML = ``
        array.forEach(itme => {
            let button = document.createElement('button')
            button.setAttribute("class", "ingredientButton")
            button.setAttribute("id", itme.id)
            button.innerHTML = `<span>${itme.attributes.emoji}</span>
                                <span>${itme.attributes.name}</span>
                                <button class="cancelButton" onclick="cancelIngredient(${itme.id})">
                                <svg class="svg-inline--fa fa-circle-xmark text-yellow cursor-pointer" data-prefix="fas" data-icon="circle-xmark" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"></path>
                                </svg></button>`
            ingredientsLine4.appendChild(button)
        })
    }
}
// SelectedIngredient to select ingredient from ingredientslist
function selectedIngredient(id) {
    ingredientsList.forEach(el => {
        if (el.id == id) {
            ingredientsSelected.indexOf(el) === -1 ? ingredientsSelected.push(el) : console.log("This item already exists");
        }
    })
    ingredientsSelected.forEach(itme => {
        ingredientsList = ingredientsList.filter(el => el.id !== itme.id)
        list1 = list1.filter(el => el.id !== itme.id)
        list2 = list2.filter(el => el.id !== itme.id)
        list3 = list3.filter(el => el.id !== itme.id)
    })
    console.log(ingredientsSelected)
    console.log(ingredientsList)
    handlDataShow(list1, list2, list3)
    showIngredientsSelected(ingredientsSelected)
    // searchButton.addEventListener("click", search(ingredientsSelected))
}


// CancelIngredient to remove ingredient from ingerdientsSelected
function cancelIngredient(id) {
    ingredientsSelected = ingredientsSelected.filter(el => el.id !== id)
    console.log(ingredientsSelected)
    if (ingredientsSelected.length == 0) {
        ingredientsList = array
    } else if (ingredientsSelected.length >= 1) {
        ingredientsSelected.forEach(itme => {
            ingredientsList = array.filter(el => el != itme)
        })
    }
    showData(ingredientsList)
    console.log(ingredientsList);
    handlDataShow(list1, list2, list3)
    showIngredientsSelected(ingredientsSelected)

}



// Resapi result data

// let jsarray = ingredientsSelected;
// sessionStorage.setItem("jsArray", JSON.stringify(jsarray));

// // JSON.stringify(jsArray) converts the jsArray into a string which can be stored in sessionStorage
searchButton.onclick = () => search(ingredientsSelected)


let ul = document.getElementById('ul')
function search(array) {
    // window.location.href = "result.html"
    console.log(array)
    let incl = []
    array.forEach(el => {
        incl.push(el.id)
    })
    let url = incl.join('&incl=')
    let itmeList = []
    let baseUrl = `https://api.gumbo.co.uk/recipes?incl=${url}`
    let req = new Request(baseUrl, {
        method: 'GET',
        mode: 'cors'
    })
    console.log(incl)
    fetch(req)
        .then(response => response.json())
        .then(data => {
            itmeList = data.data
            viewResapi(itmeList)
        })
}

function viewResapi(array) {
    console.log(array);
    ul.innerHTML = ``
    array.forEach(el => {
        let time = el.attributes.time
        console.log(el)
        let li = document.createElement('li')
        // li.setAttribute("class", "ember-view")
        li.setAttribute("id", el.id)
        li.innerHTML = `
            <a href="details.html" class="ember-view">
                <img class="object-cover" src="${el.attributes.image}">
                <div class="flex flex-col flex-1 gap-3 p-2 mt-3">
                    <div class="flex justify-between">
                        <div class="text-yellow font-boldT">
                            ${el.attributes.site_name}
                        </div>
                        <div class="flex items-center gap-2 ml-auto">
                            <svg class="svg-inline--fa fa-clock-rotate-left text-slate-500" data-prefix="fas" data-icon="clock-rotate-left" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C201.7 512 151.2 495 109.7 466.1C95.2 455.1 91.64 436 101.8 421.5C111.9 407 131.8 403.5 146.3 413.6C177.4 435.3 215.2 448 256 448C362 448 448 362 448 256C448 149.1 362 64 256 64C202.1 64 155 85.46 120.2 120.2L151 151C166.1 166.1 155.4 192 134.1 192H24C10.75 192 0 181.3 0 168V57.94C0 36.56 25.85 25.85 40.97 40.97L74.98 74.98C121.3 28.69 185.3 0 255.1 0L256 0zM256 128C269.3 128 280 138.7 280 152V246.1L344.1 311C354.3 320.4 354.3 335.6 344.1 344.1C335.6 354.3 320.4 354.3 311 344.1L239 272.1C234.5 268.5 232 262.4 232 256V152C232 138.7 242.7 128 256 128V128z"></path>
                            </svg>
                            <p class="font-normal">${time}</p>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col gap-2">
                        <div class="w-full rounded-2xl">
                            <h3 class="text-xl text-grey-dark break-words font-bold">${el.attributes.title}</h3>
                        </div>
                    </div>
                </div>
            </a>
        `
        ul.appendChild(li)
    })
}