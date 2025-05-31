
//const setLimit =  "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1303"


import * as typings from './typings.js'
import * as typeClass from './typeClasses.js'

const sidebarMenuOpenBtn = document.querySelector(".sidebarMenuOpenBtn")
const sidebarMenuCloseBtn = document.querySelector(".sidebarMenuCloseBtn")
const sidebar = document.querySelector(".nav-sidebar")
const overlay = document.getElementById("overlay")

const searchTxt = document.getElementById("searchTxt")
const searchBtn = document.getElementById("searchBtn")
const pokeDex = document.getElementById("pokeDex")
const testData = "https://pokeapi.co/api/v2/pokemon/1025"
const pokemonData = []
const url = `https://pokeapi.co/api/v2/pokemon/` //`https://pokeapi.co/api/v2/pokemon/{id or name}/`


const fetchData = async () => {
    try {
        
        const res = await fetch(`${url}/${searchTxt.value.toLowerCase()}`);
        //const res = await fetch(testData)
        const data = await res.json()
        //console.log(data)
        pokemonData.push(data)
        console.log("DATA: ", data)

        //Might need to use the following in the future:
        /*
        const { id, name, weight, height, sprites, types } = data;
        const { front_default } = sprites;
        const type1 = types[0].type.name;
        const type2 = types.length > 1 ? types[1].type.name : "none";

        pokeDex.innerHTML = `
                 
            <div id="screen" class="relative flex flex-col justify-center items-center">
                <img src="${front_default}" class="" width="250px" alt="charizard">
                <button id="heartBtn" class="absolute top-[20px] right-[70px]"><i class="fa-regular fa-heart"></i></button>
            </div>

            <div class="w-[100%] flex justify-start ml-5">
                <div id="indexContainer" class="flex flex-col items-start justify-start">
                    <h3 id="pokemonName" class="text-4xl font-bold">${firstLetterCaps(name)}</h3>
                    <p class="text-[20px]">No <span id="pokemonId">${id}</span></p>
                </div>
            </div>
            
            <div class="w-[100%] flex justify-start ml-5">
                <div id="typeContainer" class="flex mt-4">
                    <p id="primaryType" class="${typeClass.addClassToUI(type1)} rounded-2xl w-32 text-[20px] p-1 pl-3 mr-4" for=""><span id="primaryTypeIcon">${typeClass.addImgToUI(type1)}</span>${type1}</p>
                    ${displaySecondType(type2)}
                </div>
            </div>
            
            <div id="info" class="mt-4 flex justify-center ml-5">
                <p>Consectetur quis laboriosam atque quibusdam odit explicabo veniam, tenetur earum! Sint perspiciatis qui sequi provident!</p>
            </div>
            
            <div class="ml-5 mt-1 w-[100%]  border-2 flex flex-col items-center">
                <div id="moreInfo" class="h-[200px] w-[100%] flex flex-col items-center">
                    <div id="firstRow" class="mt-5 w-[80%] flex justify-around">
                        <div class="flex flex-col ">
                            <p class="ml-2"><i class="fa-solid fa-weight-scale"></i><span class="ml-3">Weight</span></p>
                            <h2 id="weight" class="border-2 w-32 rounded-2xl p-2 text-center">${calculateWeight(weight)}</h2>
                        </div>
                        <div class="flex flex-col ">
                            <p class="ml-2"><i class="fa-solid fa-ruler-vertical"></i><span class="ml-3">Height</span></p>
                            <h2 class="border-2 w-32 rounded-2xl p-2 text-center">${calculateHeight(height)}</h2>
                        </div>              
                    </div>

                    <div id="secondRow" class="mt-5 w-[80%] border-4 flex flex-col items-center">
                        <div class="flex flex-col w-[100%] items-center justify-center">
                            <p class=""><i class="fa-solid font-bold fa-ear-deaf"></i><span class="ml-3">Weak Against</span></p>
                            <div class="border-2 w-[100%] rounded-2xl p-2 flex justify-around items-center">
                                 ${addWeakToTypingsUI(type1)}
                            </div>
                        </div>

                        <div class="flex flex-col w-[100%] items-center justify-center">
                            <p class=""><i class="fa-solid fa-dumbbell"></i><span class="ml-3">Super Effective Against</span></p>
                            <div id="superEffectiveDiv" class="border-2 w-[100%] rounded-2xl p-2 flex justify-around items-center">
                                ${addEffectiveTypingsUI(type1)}
                            </div>
                        </div>            
                    </div>
                </div>
            </div>    
            ${typings.displayWeakTypes(type1,type2)}

                   `
*/

        pokemonData.map(({ id, name, weight, height, sprites, types })=>{
            const { front_default } = sprites;
            const type1 = types[0].type.name;
            const type2 = types.length > 1 ? types[1].type.name : "none";

            pokeDex.innerHTML = `
                 
            <div id="screen" >
                <img class="pokemonImg" src="${front_default}" width="250px" >
                <button id="heartBtn"><i class="fa-regular fa-heart"></i></button>
            </div>

            <div >
                <div id="name-container" >
                    <h3 id="pokemonName" >${firstLetterCaps(name)}</h3>
                    <p>No <span id="pokemonId">${id}</span></p>
                </div>
            </div>
            
            <div class="type-ontainer">
                <div>
                    <p id="primaryType" class="${typeClass.addClassToUI(type1)}">${typeClass.addImgToUI(type1)}</span>${type1}</p>
                    ${displaySecondType(type2)}
                </div>
            </div>
            
            <div class="description-container" >
                <p>Consectetur quis laboriosam atque quibusdam odit explicabo veniam, tenetur earum! Sint perspiciatis qui sequi provident!</p>
            </div>
            
            <div class="info-container">
                <div>
                    <div class="firstRow">
                        <div class="weight-container">
                            <p class="ml-2"><i class="fa-solid fa-weight-scale"></i><span class="ml-3">Weight</span></p>
                            <h3 id="weight" class="border-2 w-32 rounded-2xl p-2 text-center">${calculateWeight(weight)}</h2>
                        </div>
                        <div class="height-container">
                            <p></i><span class="ml-3">Height</span></p>
                            <h3>${calculateHeight(height)}</h2>
                        </div>              
                    </div>

                    <div class="secondRow">
                        <div>
                            <p ></i><span class="ml-3">Weak Against</span></p>
                            <div >
                                 ${addWeakToTypingsUI(type1,type2)}
                            </div>
                        </div>

                        <div >
                            <p ></i><span class="ml-3">Super Effective Against</span></p>
                            <div id="superEffectiveDiv">
                                ${addEffectiveTypingsUI(type1)}
                            </div>
                        </div>            
                    </div>
                </div>
            </div>    
           
           
                   `

        }).join("")

    function displaySecondType(type2){
        if (type2 === "none"){
            return ``
        } else {
           return `<p id="secondaryType" class="${typeClass.addClassToUI(type2)} rounded-2xl w-32 text-[20px] p-1 pl-3" for=""><span id="secondaryTypeIcon">${typeClass.addImgToUI(type2)}</span>${type2}</p>`
        }
    }

    function calculateWeight(weight){
      const actualWeight =  weight * 100
      const kilograms = actualWeight / 1000
      return kilograms + "kg"
    }

    function calculateHeight(height){
        const actualHeight = height * 10
        const meters = actualHeight / 100
        return meters + "m"
    }

    function firstLetterCaps(name){
        const capName = name.charAt(0).toUpperCase() + name.slice(1)
        return capName
    }
    
    function addEffectiveTypingsUI(primaryType){

        const typeArr = typings.displaySuperEffectiveTypes(primaryType)
        //console.log(typeArr)
   
        return typeArr.map((type)=>{
            return `<p class="${typeClass.addClassToUI(type)} rounded-2xl w-32 text-[20px] p-1 pl-3 mr-4" for=""><span id="primaryTypeIcon">${typeClass.addImgToUI(type)}</span>${type}</p>`
           
         }).join("")
    
    }

    function addWeakToTypingsUI(primaryType,secondaryType){
        
         const typeArr = typings.displayWeakTypes(primaryType,secondaryType)
   
        return typeArr.map((type)=>{
            return `<p class="${typeClass.addClassToUI(type)} rounded-2xl w-32 text-[20px] p-1 pl-3 mr-4" for=""><span id="primaryTypeIcon">${typeClass.addImgToUI(type)}</span>${type}</p>`
           
         }).join("")
    }


    } catch (error) {
        console.log(error)
    }
}


searchBtn.addEventListener("click",()=>{
    fetchData()
    //console.log(searchTxt.value)
})

searchTxt.addEventListener("keypress",(event)=>{
    if (event.key === "Enter"){
         fetchData()
    }
   
})

sidebarMenuOpenBtn.addEventListener("click",()=>{
    sidebar.classList.toggle("hidden")
    overlay.style.display = "block"
})

sidebarMenuCloseBtn.addEventListener("click",()=>{
    sidebar.classList.toggle("hidden")
    overlay.style.display = "none"
})

overlay.addEventListener("click",()=>{
    overlay.style.display = "none"
    sidebar.classList.toggle("hidden")
})

//fetchData()


