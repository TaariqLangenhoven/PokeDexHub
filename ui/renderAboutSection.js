 import * as typeClass from "../typeClasses.js"
 import { firstLetterCaps, calculateHeight, calculateWeight, getCatchRate } from "../utils/helpers.js"
 import { displaySecondType } from "../utils/uiHelpers.js"

 export function getAboutSection(
    type1,
    entry1,
    type2,
    weight,
    height,
    ability1,
    ability1ShortDescription,
    ability2,
    ability2ShortDescription,
    captureRate,
    hp){
        return `
        
                <div class="about-stats-moves-container main-info-grid">
                    <div class="mt-2 species-container flex-center">
                        <div class="type-info wrapper-col card">
                            <div class="wrapper-col flex-center">
                                <h3 class="responsive-title">Species</h3>
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
                            <h3 class="responsive-title">Abilities</h3>
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
                            <h3 class="responsive-title">Catch Rate</h3>
                            
                            <div class="text-center mt-1 ">
                                <P>In Pokémon games, the catch rate (also known as the capture rate) determines how likely you are to successfully catch a wild Pokémon when using a Poké Ball.</P>
                            </div>
                            <div class="catchRate-info mt-1 wrapper flex-center">
                                <div>
                                    <img src="images/Bag_Poké_Ball_SV_Sprite.png" width="50px"></img>
                                    <p> ${getCatchRate(captureRate,"pokeBall",hp)}</p>
                                </div>
                                <div>
                                    <img src="images/bag_Great_Ball_SV_Sprite.png" width="50px"></img>
                                    <p> ${getCatchRate(captureRate,"greatBall",hp)}</p>
                                </div>
                                <div>
                                    <img src="images/Bag_Ultra_Ball_SV_Sprite.png" width="50px"></img>
                                    <p> ${getCatchRate(captureRate,"ultraBall",hp)}</p>
                                </div>
                                
                            </div>
                        </div>                      
                    </div>
                </div>
                </div>            
        
        `
}