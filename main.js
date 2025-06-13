
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
const testData = "https://pokeapi.co/api/v2/pokemon/2"
const pokemonDescription = "https://pokeapi.co/api/v2/pokemon-species/2"
const abilityURL = "https://pokeapi.co/api/v2/ability/"
const pokemonSpeciesURL = "https://pokeapi.co/api/v2/pokemon-species/"
//const pokemonData = []
const url = `https://pokeapi.co/api/v2/pokemon/` //`https://pokeapi.co/api/v2/pokemon/{id or name}/`


const fetchData = async () => {
    try {
        
        //const res = await fetch(`${url}/${searchTxt.value.toLowerCase()}`);
        const res = await fetch(testData)
        const pokemonDescriptionRes = await fetch(pokemonDescription)
    
        const data = await res.json()
        const pokemonDescriptionData = await pokemonDescriptionRes.json()
       
        //console.log(data)
        //pokemonData.push(data)
        console.log("DATA: ", data)
        
        const { abilities, id, name, weight, height, sprites, types, stats } = data;
  
        const ability1 = abilities[0].ability.name
        const ability2 = abilities.length > 1 ? abilities[1].ability.name : "none"

        const { front_default } = sprites;
        const type1 = types[0].type.name;
        const type2 = types.length > 1 ? types[1].type.name : "none";

        const {flavor_text_entries} = pokemonDescriptionData
        const entry1 = flavor_text_entries[11].flavor_text

        console.log("ENTRY 1: ",entry1)
        console.log("Ability1 :" , ability1  )
        console.log("Ability2 :" , ability2  )
        
        const getAbilityDescription = async (ability) => {
            
            try {

                const response = await fetch(`${abilityURL}${ability}`)
                const data = await response.json()

                const {flavor_text_entries} = data
                const descriptionText = flavor_text_entries[1].flavor_text
                
                console.log("Ability description: ", descriptionText)
                const description = descriptionText.replace(/\n/g, " ")

                return description

            } catch (error) {
                console.log(error)
            }

        }

        const getCaptureRate = async (pokemonName) =>{
            try {
                const response = await fetch(`${pokemonSpeciesURL}${pokemonName}`)
                const data = await response.json()
                const {capture_rate} = data
                console.log("Cate Rate: ", capture_rate)
                return capture_rate
            } catch (error) {
                console.log(error)
            }
        }

        const getPokemonHp = () => {

            const health = stats[0].base_stat
            console.log("Health: " , health)
            return health
        }

        const getCatchRate = (rate) => {
            
            const maxHp = getPokemonHp()
            const currentHp = maxHp / 2       
            const ballMod = {
                "pokeball": 1,
                "greatBall": 1.5,
                "ultraBall": 2
            }

            const base = (((3 * maxHp) - (2 * currentHp)) * (rate * ballMod.pokeball)) / (3 * maxHp)

            const probability = base / 255
            console.log("Probability: ", probability)
            const percentage = (probability * 100).toFixed(2)
            console.log(percentage)
            return `${percentage}%`
        }

        const pokemonCaptureRate = await getCaptureRate(name)
        const ability1ShortDescription = await getAbilityDescription(ability1)
        const ability2ShortDescription = ability2 !== "none" ? await getAbilityDescription(ability2) : "None"

        
        pokeDex.innerHTML = `

            <div>
                <div class="prevBtn-nextBtn">
                    <div class="wrapper">
                        <div class="prevBtn responsive-color">
                            <h2><i class="fa-solid fa-arrow-left"></i> Previous </h2>
                        </div>
                        <div class="nextBtn responsive-color">
                            <h2>Next <i class="fa-solid fa-arrow-right"></i></h2>                      
                        </div>
                    </div>
                    <div class="wrapper-col flex-center">              
                        <h1>${firstLetterCaps(name)} <span id="pokemonId">#${id}</span></h1>
                        <div class="flex-center">
                            <p id="primaryTypeIcon" class="pokemonTypeUI ${typeClass.addClassToUI(type1)}"><span>${typeClass.addImgToUI(type1)}</span></p>
                            ${displaySecondTypeIcon(type2)}
                        </div>
                        
                    </div>         
                </div>      
            </div>     
            
            <div id="pokedexInfo">
                <div class="image-container flex-center" >
                    <div class="wrapper flex-center card">       
                        <img class="pokemonImg" src="${front_default}" >     
                    </div>
                </div>
                
                <nav class="about-navbar">
                    <ul class="flex-center">
                        <li id="pokemonAboutBtn" class="responsive-color">About</li>
                        <li id="pokemonStatsBtn" class="responsive-color">Stats</li>
                        <li id="pokemonMovesBtn" class="responsive-color">Moves</li>
                    </ul>
                </nav>
                
                <div class="about-stats-moves-container">

                </div>

                <div class="species-container flex-center">
                    <div class="type-info wrapper-col card">
                            <div class="wrapper-col flex-center">
                                <h3 class="responsive-color">Species</h3>
                                <div class="text-center">
                                    <p>${entry1}</p>
                                </div>
                                <div class="wrapper">
                                    <p id="primaryType" class="pokemonTypeUI ${typeClass.addClassToUI(type1)}"><span>${typeClass.addImgToUI(type1)}</span>${firstLetterCaps(type1)}</p>
                                    ${displaySecondType(type2)}
                                </div>
                            </div>
                                
                            <div class="mt-1 wrapper flex-evenly">
                                <div class="info-weight-container wrapper-col flex-center">
                                    <p><i class="fa-solid fa-weight-scale"></i></p>
                                    <h3>${calculateWeight(weight)}</h3>
                                </div>
                                <div class="info-height-container wrapper-col flex-center ">
                                    <p><i class="fa-solid fa-ruler-vertical"></i></p>
                                    <h3>${calculateHeight(height)}</h3>
                                </div>  
                            </div>
                            <div class="mt-1 wrapper-col flex-center">
                                <i class="fa-solid fa-microphone-lines"></i>
                                <h3>Cry</h3>
                            </div>     
                    </div>
                </div>

                <div class="abilities-container flex-center">
                    <div class="type-info  card">
                        <div class="wrapper-col flex-center">
                            <h3 class="responsive-color">Abilities</h3>
                            <div class="text-center">
                                <P>abilities are passive special traits that can enhance or hinder a Pokémon's performance in battle or in the overworld. They are activated automatically and can provide various effects, such as boosting stats, influencing weather conditions, or altering how moves are used. </P>
                            </div>
                            <div class="wrapper-col flex-center">
                                <h4>${ability1}</h4>
                                <p>${ability1ShortDescription}</p>
                            </div>
                            <div class="wrapper-col flex-center">
                                <h4>${ability2}</h4>
                                <p>${ability2ShortDescription}</p>
                            </div>
                        </div>                      
                    </div>
                </div>

                <div class="catchRate-container flex-center">
                    <div class="type-info wrapper-col card">
                        <div class="wrapper-col flex-center">
                            <h3 class="responsive-color">Catch Rate</h3>
                            
                            <div class="text-center">
                                <P>In Pokémon games, the catch rate (also known as the capture rate) determines how likely you are to successfully catch a wild Pokémon when using a Poké Ball.</P>
                            </div>
                            <div class="wrapper-col flex-center">
                                <p>Catch Rate with Poke ball: ${getCatchRate(pokemonCaptureRate)}</p>
                                <p>Catch Rate with Great Ball: </p>
                                <p>Catch Rate with Ultra Ball: </p>
                            </div>
                        </div>                      
                    </div>
                </div>

                

                <div class="type-diff-container flex-center">
                    <div class="type-info wrapper-col card">
                            <div class="wrapper-col">
                                <h3>Weak Against</h3>
                                <div class="wrapper-wrap">
                                    ${addWeakToTypingsUI(type1,type2)}
                                </div>
                            </div>

                            <div class="wrapper-col">
                                <h3>Super Effective Against</span></h3>
                                <div class="wrapper-wrap">
                                    ${addEffectiveTypingsUI(type1)}
                                </div>
                            </div>            
                    </div>
                </div>       

                    
            </div>
               
                   `

                   /*<div class="evolutionChain-container flex-center">
                    <div class="type-info wrapper-col card">
                        <div class="wrapper-col flex-center">
                            <h3 class="responsive-color">Evolution Chain</h3>
                            <div class="flex-center">
                                <p>img of pokemon evo chain 1</p>
                                <p>img of pokemon evo chain 2</p>
                                <p>img of pokemon evo chain 3</p>
                            </div>
                        </div>                      
                    </div>
                </div>*/
    

    function displaySecondType(type2){
        if (type2 === "none"){
            return ``
        } else {
           return `<p id="secondaryType" class="pokemonTypeUI ${typeClass.addClassToUI(type2)}"><span>${typeClass.addImgToUI(type2)}</span>${firstLetterCaps(type2)}</p>`
        }
    }

    function displaySecondTypeIcon(type2){
        if (type2 === "none"){
            return ``
        } else {
           return `<p id="secondaryTypeIcon" class="pokemonTypeUI ${typeClass.addClassToUI(type2)}"><span>${typeClass.addImgToUI(type2)}</span></p>`
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
            return `<p class="pokemonTypeUI ${typeClass.addClassToUI(type)}"><span>${typeClass.addImgToUI(type)}</span>${firstLetterCaps(type)}</p>`
           
         }).join("")
    
    }

    function addWeakToTypingsUI(primaryType,secondaryType){
        
         const typeArr = typings.displayWeakTypes(primaryType,secondaryType)
   
        return typeArr.map((type)=>{
            return `<p class="pokemonTypeUI ${typeClass.addClassToUI(type)}" ><span>${typeClass.addImgToUI(type)}</span>${firstLetterCaps(type)}</p>`
           
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
/*
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
*/

fetchData()


