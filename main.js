import * as typeClass from './typeClasses.js'

const searchTxt = document.getElementById("searchTxt")
const searchBtn = document.getElementById("searchBtn")
const pokeDex = document.getElementById("pokeDex")
//const testData = "https://pokeapi.co/api/v2/pokemon/Salamence"

const abilityURL = "https://pokeapi.co/api/v2/ability/"
//const pokemonDescription = "https://pokeapi.co/api/v2/pokemon-species/2"
const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/"
const pokemonItemsUrl = "https://pokeapi.co/api/v2/item/"
const pokemonTypeURL = "https://pokeapi.co/api/v2/type/"

const pokemonAboutBtn = document.getElementById("pokemonAboutBtn")
const pokemonStatsBtn = document.getElementById("pokemonStatsBtn")
const pokemonMovesBtn = document.getElementById("pokemonMovesBtn")
const pokedexContent = document.getElementById("pokedex-content")

let currentPokemonData = null

const url = `https://pokeapi.co/api/v2/pokemon/`

const fetchData = async ( identifier = 1) => {
    try {
        //const pokemonName = searchTxt.value || identifier; // fallback to ID if empty
        const res = await fetch(`${url}${typeof identifier === "string" ? identifier.toLowerCase() : identifier}`);
        const data = await res.json();
        currentPokemonData = { id: data.id, name: data.name };

        const speciesRes = await fetch(`${speciesURL}${data.id}`);
        const speciesData = await speciesRes.json();
        const entry1 = speciesData.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || "No description.";

        const name = data.name
        const ability1 = data.abilities[0].ability.name;
        const ability2 = data.abilities[1]?.ability.name || "none";
        const { front_default } = data.sprites;
        const type1 = data.types[0].type.name;
        const type2 = data.types[1]?.type.name || "none";
        const weight = data.weight;
        const height = data.height;
        const stats = data.stats;

        const getAbilityDescription = async (ability) => {
            try {
                const response = await fetch(`${abilityURL}${ability}`)
                const data = await response.json()
                const {flavor_text_entries} = data
                const descriptionText = flavor_text_entries[1].flavor_text
                const description = descriptionText.replace(/\n/g, " ")
                return description
            } catch (error) {
                console.log(error)
            }
        }

        const getCaptureRate = async (pokemonName) =>{
            try {
                const response = await fetch(`${speciesURL}${pokemonName}`)
                const data = await response.json()
                const {capture_rate} = data
                return capture_rate
            } catch (error) {
                console.log(error)
            }
        }

        const getPokemonHp = () => stats[0].base_stat

        //Might use in the future: currently using static images
        /*const getPokeBallImage = async (item) => {
            try {
                const res = await fetch(`${pokemonItemsUrl}${item}`)
                const listOfItems = await res.json()
                const {sprites} = listOfItems 
            } catch (error) {
                console.log(error)
            }        
        }*/

        const getCatchRate = (rate,item) => {
            const maxHp = getPokemonHp()
            const currentHp = maxHp / 2       
            const ballMod = {
                "pokeBall": 1,
                "greatBall": 1.5,
                "ultraBall": 2
            }

            const base = (((3 * maxHp) - (2 * currentHp)) * (rate * ballMod[item])) / (3 * maxHp)
            const probability = base / 255
            const percentage = (probability * 100).toFixed(2)
            return `${percentage}%`
        }

        const getTypeInfo = async (endpoint, type1, type2 = "") => {
            const multipliers = {};
            const typeArray = [];

            try {
                const type1Response = await fetch(`${pokemonTypeURL}${type1}`);
                const type1Data = await type1Response.json();

                let type2Data = null;

                if (type2 !== "" && type2 !== "none") {
                    const type2Response = await fetch(`${pokemonTypeURL}${type2}`);
                    type2Data = await type2Response.json();
                }

                const applyMultipliers = (damage_relations) => {
                    damage_relations.double_damage_from.forEach(type => {
                        multipliers[type.name] = (multipliers[type.name] || 1) * 2;
                    });
                    damage_relations.half_damage_from.forEach(type => {
                        multipliers[type.name] = (multipliers[type.name] || 1) * 0.5;
                    });
                    damage_relations.no_damage_from.forEach(type => {
                        multipliers[type.name] = 0;
                    });
                };

                const collectTypes = (damage_relations, category) => {
                    if (damage_relations[category]) {
                        damage_relations[category].forEach(item => {
                            typeArray.push(item.name);
                        });
                    }
                };

                applyMultipliers(type1Data.damage_relations);
                collectTypes(type1Data.damage_relations, endpoint);

                if (type2Data) {
                    applyMultipliers(type2Data.damage_relations);
                    collectTypes(type2Data.damage_relations, endpoint);
                }

                const unique = arr => [...new Set(arr)];

                const calculatedImmunities = Object.entries(multipliers).filter(([_, mult]) => mult === 0).map(([type]) => type);
                const calculatedResistants = Object.entries(multipliers).filter(([_, mult]) => mult > 0 && mult < 1).map(([type]) => type);
                const calculatedWeaknesses = Object.entries(multipliers).filter(([_, mult]) => mult > 1).map(([type]) => type);

                if (endpoint === "no_damage_from") {
                    return unique(calculatedImmunities);
                } else if (endpoint === "half_damage_from") {
                    return unique(calculatedResistants);
                } else if (endpoint === "double_damage_from") {
                    return unique(calculatedWeaknesses);
                } else if (endpoint === "double_damage_to") {
                    return unique(type1Data.damage_relations.double_damage_to.map(t => t.name));
                } else {
                    return unique(typeArray);
                }
            } catch (error) {
                console.error("Error fetching type info:", error);
                return [];
            }
        }

        const getStatValues = async (data)=>{
        try {
            const array = []
            const {stats} = data
            
            stats.forEach(i=> { 
                console.log(i.base_stat)
                array.push(i.base_stat)
                
            })
            return array
        } catch (error) {
            
        }
        }

        function displayStatValues(array){

            return array.map(i=>`<h4>${i}</h4>`).join("")
    
        }

        function calculateTotal (array){

            const statValues = [...array]
            return `${statValues.reduce((i , index)=> i + index , 0)}`
        }

        const resistantAgainstTypeInfo = await getTypeInfo("half_damage_from", type1, type2);
        const weakAgainstTypeInfo = await getTypeInfo("double_damage_from", type1, type2);
        const immuneAgainstTypeInfo = await getTypeInfo("no_damage_from", type1, type2);
        const superEffectiveAgainst = await getTypeInfo("double_damage_to", type1)

        const pokemonCaptureRate = await getCaptureRate(name)
        const ability1ShortDescription = await getAbilityDescription(ability1)
        const ability2ShortDescription = ability2 !== "none" ? await getAbilityDescription(ability2) : "None"
        const getChartStatValues = await getStatValues(data)

        pokeDex.innerHTML = `
        <div class="prevBtn-nextBtn">
            <div class="wrapper">
                <div class="prevBtn responsive-color">
                    <h2><i class="fa-solid fa-arrow-left"></i> Previous #${data.id-1}</h2>
                </div>
                <div class="nextBtn responsive-color">
                    <h2>Next #${data.id+1}<i class="fa-solid fa-arrow-right"></i></h2>                      
                </div>
            </div>
            <div class="wrapper-col flex-center">              
                <h1>${firstLetterCaps(name)} <span id="pokemonId">#${data.id}</span></h1>
                <div class="flex-center">
                    <p id="primaryTypeIcon" class="pokemonTypeUI ${typeClass.addClassToUI(type1)}"><span>${typeClass.addImgToUI(type1)}</span></p>
                    ${displaySecondTypeIcon(type2)}
                </div>
            </div>         
        </div>
        <div class="image-container flex-center" >
            <div class="wrapper flex-center card">       
                <img class="pokemonImg" src="${front_default}" >     
            </div>
        </div>`
  
    const getChartData = async (data)=>{
            
        createChart(data)
    }

    function createChart(data){

        const ctx = document.getElementById("myChart")
        const {stats} = data
        stats.map(i=> console.log(i))

        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: stats.map(i=>  firstLetterCaps(i.stat.name)),
            datasets: [{
                label: 'Base Stats of Pokemon',
                data: stats.map(entry=> entry.base_stat),
                backgroundColor: '#3B4CCA',
                borderWidth: 1,
                borderRadius: 20
            }]
            },
            options: {
            indexAxis: "y",
            responsive: true,
            aspectRatio: 1,
            //create resposiveness
            maintainAspectRatio: false,
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });

    }

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

    function addWeakToTypingsUI(arrayOfTypes){
        
         const typeArr = arrayOfTypes
   
        return typeArr.map((type)=>{
            return `<p class="pokemonTypeUI ${typeClass.addClassToUI(type)}" ><span>${typeClass.addImgToUI(type)}</span>${firstLetterCaps(type)}</p>`
           
         }).join("")
    }
  
    function getAboutSection(){
        return `
        
                <div class="about-stats-moves-container main-info-grid">
                    <div class="mt-2 species-container flex-center">
                        <div class="type-info wrapper-col card">
                            <div class="wrapper-col flex-center">
                                <h3 class="${typeClass.addResponsiveColor(type1)} responsive-title">Species</h3>
                                <div class="text-center mt-1 ">
                                    <p>${entry1}</p>
                                </div>
                                <div class="wrapper mt-1 ">
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
                                <button class="cryBtn"><i class="fa-solid fa-circle-play"></i></button>
                                <h3>Cry</h3>
                            </div>
                        </div>     
                    </div>

                    <div class="abilities-container flex-center">
                    <div class="type-info  card">
                        <div class="wrapper-col flex-center">
                            <h3 class="${typeClass.addResponsiveColor(type1)} responsive-title">Abilities</h3>
                            <div class="text-center mt-1">
                                <P>abilities are passive special traits that can enhance or hinder a Pokémon's performance in battle or in the overworld. They are activated automatically and can provide various effects, such as boosting stats, influencing weather conditions, or altering how moves are used. </P>
                            </div>

                            <div>
                                <div class="wrapper-col mt-1">
                                    <div class="flex-between pokemonAbilityUI">
                                        <h4>${firstLetterCaps(ability1)} </h4>
                                        <button class="ability-info-button"><i class="fa-solid fa-circle-info"></i></button>
                                    </div                                
                                    <p>${ability1ShortDescription}</p>
                                </div>
                                <div class="wrapper-col mt-1">
                                    <div class="flex-between pokemonAbilityUI">
                                        <h4>${firstLetterCaps(ability2)} </h4>
                                        <button class="ability-info-button"><i class="fa-solid fa-circle-info"></i></button>
                                    </div>
                                    
                                    <p>${ability2ShortDescription}</p>
                                </div>
                            </div>
                            
                        </div>                      
                    </div>
                </div>

                <div class="catchRate-container flex-center">
                    <div class="type-info wrapper-col card">
                        <div class="wrapper-col flex-center">
                            <h3 class="${typeClass.addResponsiveColor(type1)} responsive-title">Catch Rate</h3>
                            
                            <div class="text-center mt-1 ">
                                <P>In Pokémon games, the catch rate (also known as the capture rate) determines how likely you are to successfully catch a wild Pokémon when using a Poké Ball.</P>
                            </div>
                            <div class="catchRate-info mt-1 wrapper flex-center">
                                <div>
                                    <img src="images/Bag_Poké_Ball_SV_Sprite.png" width="50px"></img>
                                    <p> ${getCatchRate(pokemonCaptureRate,"pokeBall")}</p>
                                </div>
                                <div>
                                    <img src="images/bag_Great_Ball_SV_Sprite.png" width="50px"></img>
                                    <p> ${getCatchRate(pokemonCaptureRate,"greatBall")}</p>
                                </div>
                                <div>
                                    <img src="images/Bag_Ultra_Ball_SV_Sprite.png" width="50px"></img>
                                    <p> ${getCatchRate(pokemonCaptureRate,"ultraBall")}</p>
                                </div>
                                
                            </div>
                        </div>                      
                    </div>
                </div>
                </div>            
        
        `
    }

    function getStatsSection(){

        return `
    
    <div class="main-info-grid">

        <div class="mt-2 flex-center">    
            <div class="wrapper-col card">
                <div class="chart flex-center">
                    <canvas id="myChart"></canvas>
                    <div class="flex-col gap-5">
                        ${displayStatValues(getChartStatValues)}
                    </div>
                        
                </div>
                    <div class="flex-center gap-05">
                        <div>
                            <h3>Total: </h3>
                        </div>
                        <div>
                            <h3>${calculateTotal(getChartStatValues)}</h3>
                        </div>           
                    </div>
                    <div class="wrapper-col flex-center p-1">
                        <p class="text-center">Base stats range from values of 1 to 255. They represent the potential of a Pokemon species in battle</p>
                    </div>        
            </div>
        </div>

        <div class="type-diff-container flex-center ">
            <div class="type-info wrapper-col card">
                <div class="wrapper-col">
                    <div class="flex-center">
                        <h3 class="${typeClass.addResponsiveColor(type1)} responsive-title">Type Info</h3>
                    </div>
                    
                    <div class="mt-1 wrapper-col">
                        <h3>Weak Against:</h3>
                        <div class="wrapper-wrap">
                            ${addWeakToTypingsUI(weakAgainstTypeInfo)}
                        </div>
                    </div>

                    <div class="mt-1 wrapper-col">
                        <h3>Resistant Against:</h3>
                        <div class="wrapper-wrap">
                            ${addWeakToTypingsUI(resistantAgainstTypeInfo)}
                        </div>
                    </div>

                    <div class="mt-1 wrapper-col">
                        <h3>Immune Against:</h3>
                        <div class="wrapper-wrap">
                            ${addWeakToTypingsUI(immuneAgainstTypeInfo)}
                        </div>
                    </div>

                    <div class="mt-1 wrapper-col">
                        <h3>Super Effective Against:</h3>
                        <div class="wrapper-wrap">
                            ${addWeakToTypingsUI(superEffectiveAgainst)}
                        </div>
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
    }

    pokedexContent.innerHTML = getAboutSection()

    document.querySelector(".nextBtn").addEventListener("click", () => {
        fetchData(currentPokemonData.id + 1)
        searchTxt.value = ""
        console.log("TEST")
    })

    document.querySelector(".prevBtn").addEventListener("click",()=>{
        fetchData(currentPokemonData.id - 1)
        searchTxt.value = ""
    })

    pokemonStatsBtn.addEventListener("click",()=>{ 
        pokedexContent.innerHTML = getStatsSection()
        getChartData(data)
     })

    pokemonAboutBtn.addEventListener("click",()=>{ pokedexContent.innerHTML = getAboutSection() })

    //FetchData catch block:
    } catch (error) {
        console.log(error)
    }

}

searchBtn.addEventListener("click", () => {fetchData(searchTxt.value);});

searchTxt.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchData(searchTxt.value);
    }
});


//fetchData()
