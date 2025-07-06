import * as typeClass from '../typeClasses.js'
import { firstLetterCaps } from './helpers.js'

export function displaySecondType(type2){
        if (type2 === "none"){
            return ``
        } else {
           return `<p id="secondaryType" class="pokemonTypeUI ${typeClass.addClassToUI(type2)}"><span>${typeClass.addImgToUI(type2)}</span>${firstLetterCaps(type2)}</p>`
        }
    }

export function displaySecondTypeIcon(type2){
        if (type2 === "none"){
            return ``
        } else {
           return `<p id="secondaryTypeIcon" class="pokemonTypeUI ${typeClass.addClassToUI(type2)}"><span>${typeClass.addImgToUI(type2)}</span></p>`
        }
    }

export function addWeakToTypingsUI(arrayOfTypes){
        
         const typeArr = arrayOfTypes
   
        return typeArr.map((type)=>{
            return `<p class="pokemonTypeUI ${typeClass.addClassToUI(type)}" ><span>${typeClass.addImgToUI(type)}</span>${firstLetterCaps(type)}</p>`
           
         }).join("")
    }