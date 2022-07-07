const url = "https://localhost:5001/api/beanvariety/";
const coffeeUrl = "https://localhost:5001/api/coffee/"
let index = document.querySelector("#main");

// run it button
const button = document.querySelector("#run-button");

button.addEventListener("click", () => {
    renderIndexHTML();
})

// bean variety button
const beanVarietyButton = document.querySelector("#beanVariety-button")

beanVarietyButton.addEventListener("click", () => {
   index.innerHTML = `
    <h4>Add Bean Variety</h4>
    <fieldset>
        <label for="beanName">Name</label><br />
        <input type="text" name="beanName" id="addBeanName" /><br />

        <label for="beanRegion">Region</label><br />
        <input type="text" name="beanRegion" id="addBeanRegion" /><br />

        <label for="beanNotes">Notes</label><br />
        <input type="text" name="beanNotes" id="addBeanNotes" /><br />

        <input type="submit" value="Add" name="beanAdd" id="saveBean" /><br />
    </fieldset>
   `
})


// to save bean

document.addEventListener("click", (event) => {
    if (event.target.id === "saveBean") {
        const beanObject = {
            name: document.querySelector("#addBeanName").value,
            region: document.querySelector("#addBeanRegion").value,
            notes: document.querySelector("#addBeanNotes").value
        };
        postBean(beanObject);
        renderIndexHTML();
    }
})

function postBean(beanObject) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beanObject)
    })
    .then(response => response.json());
}


// get all Beans
function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

// render all beans
let beanHTML = "";

function renderIndexHTML() {
    getAllBeanVarieties()
    .then(beanVarieties => {
        beanVarieties.forEach(beanType => {
            beanHTML += `
                <h5>${beanType.name}</h5>
                <p>${beanType.region}</p>
                <p>${beanType.notes}</p>
            `
        });
    })
    
    index.innerHTML = beanHTML;
}



// button.addEventListener("click", () => {
//     getAllBeanVarieties()
//         .then(beanVarieties => {
//             console.log(beanVarieties);
//             // beanVarieties.forEach((bv) => {
//             //     const name = bv.name
//             //     const region = bv.region
//             //     const notes = bv?.notes
//             //     return `Bean: ${name} | From: ${region} | Notes: ${notes}`
//             // })
//         })

//     getAllCoffees()
//         .then(coffees => {
//             console.log(coffees);
//             // coffees.forEach((singlecoffee) => {
//             //     const title = singlecoffee.title
//             //     const beanVariety = singlecoffee.beanVariety.name
//             //     const coffeeElement = document.getElementById("coffees")
//             //     coffeeElement.innerText = `Coffee: ${title} | Bean Variety: ${beanVariety}`
//             // })
//         })
// });



// function getAllCoffees() {
//     return fetch(coffeeUrl).then(response => response.json());
// }

// const showCoffeeButton = document.querySelector('#show-coffee');
// showCoffeeButton.addEventListener('click', () => {
//     Promise.all(CoffeeManager.getCoffee(), BeanManager.getAllBeanVarieties())
//     .then(([coffee, beanVarieties]) => {
//         render(Coffee.CoffeeList(coffee, beanVarieties))});
// });

// const addCoffeeButton = document.querySelector('#add-coffee');
// addCoffeeButton.addEventListener('click', () => {
//     BeanManager.getAllBeanVarieties()
//     .then(beanVarieties => {
//         render(Coffee.CoffeeForm({}, beanVarieties));
//     });
// })
    



    
