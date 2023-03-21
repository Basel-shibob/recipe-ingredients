let buttons = document.querySelector('.buttons') 
const ingredientsLine1 = document.getElementById('ingredientsLine1')
const ingredientsLine2 = document.getElementById('ingredientsLine2')
const ingredientsLine3 = document.getElementById('ingredientsLine3')
const ingredientsLine4 = document.getElementById('ingredientsLine4')

let ingredientsArray = []
function myfunction(id) {
    ingredientsArray.indexOf(id) === -1 ? ingredientsArray.push(id) :console.log(ingredientsArray)
}
ingredientsArray.forEach(element => {
    const buttonSelected = document.getElementById(element)
    console.log(buttonSelected)
})

fetch("https://api.gumbo.co.uk/ingredients?&top=true")
    .then(response => response.json())
    .then(
        data => {
            let ingredientsList = data.data
            // console.log(ingredientsList)

            // let list1 = []
            // let list2 = []
            // let list3 = []
            // let i = 0
            // let ingredientSelected = []
            
            ingredientsList.forEach(element => {
                        
                // if (i <= 18) {
                //     list1.push(element)
                // }if (i >= 19 && i <= 37){
                //     list2.push(element)
                // }if (i > 37 && i <= 57){
                //     list3.push(element)
                // }
                
                // i +=1
                let button = document.createElement('button')
                button.setAttribute("class" ,"ingredientButton")
                button.setAttribute("id" ,element.id)
                button.setAttribute("onclick" ,`myfunction(${element.id})`)
                button.innerText = `${element.attributes.emoji} ${element.attributes.name}`
                ingredientsLine1.appendChild(button)  
            
            });
            
            
            // list1.forEach(element =>{
                              
            // })
            // list2.forEach(element1 =>{
            //     let button = document.createElement('button')
            //     button.setAttribute("class" ,"ingredientButton")
            //     button.setAttribute("id" ,element1.id)
            //     button.setAttribute("onclick" ,`myfunction(${element1.id})`)
            //     button.innerText = `${element1.attributes.emoji} ${element1.attributes.name}`
            //     ingredientsLine2.appendChild(button)
            // })
            // list3.forEach(element3 =>{
            //     let button = document.createElement('button')
            //     button.setAttribute("class" ,"ingredientButton")
            //     button.setAttribute("id" ,element3.id)
            //     button.setAttribute("onclick" ,`myfunction(${element3.id})`)
            //     button.innerText = `${element3.attributes.emoji} ${element3.attributes.name}`
            //     ingredientsLine3.appendChild(button)
            // })




        });
    

// function showIngredients() {
//     const index = array.indexOf(5);
//     if (index > -1) { // only splice array when item is found
//         array.splice(index, 1); // 2nd parameter means remove one item only
//     }
// }