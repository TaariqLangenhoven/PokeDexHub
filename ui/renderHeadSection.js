import * as typeClass from '../typeClasses.js'
import { firstLetterCaps } from "../utils/helpers.js"
import { displaySecondTypeIcon } from '../utils/uiHelpers.js'

export function getPokemonHeadInfo(data,name,type1,type2,front_default){
      return `
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
    }