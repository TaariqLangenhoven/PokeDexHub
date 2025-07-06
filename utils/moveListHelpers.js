import { checkAPIResponse } from "./helpers.js";
import { firstLetterCaps } from "./helpers.js";
import { displaySecondType } from "./uiHelpers.js";

//Add a versionGroup parameter and a moveLearnMethod parameter to make function more dynamic
    //function search for sword-shield version moves KEEP THAT IN MIND
    export const getPokemonMovesByLevel = async (pokemonData,movesData)=> {
        try {

        const { moves } = pokemonData;

        const levelUpMoves = [];

        moves.forEach(moveEntry => {
            // Filter only those learned by level-up
            const levelUpDetails = moveEntry.version_group_details.filter(
                detail => detail.move_learn_method.name === "level-up" && detail.version_group.name === "sword-shield"
            ) ;
            
            levelUpDetails.forEach(detail => {
                levelUpMoves.push({
                    moveName: moveEntry.move.name,
                    levelLearnedAt: detail.level_learned_at,
                    versionGroup: detail.version_group.name,
                });
            });
        });

        // Optional: sort by level
        levelUpMoves.sort((a, b) => a.levelLearnedAt - b.levelLearnedAt);

        const detailMoves = await Promise.all(

            levelUpMoves.map(async (move)=>{

                try {
                    const response = await fetch(`${movesData}${move.moveName}`)

                    checkAPIResponse(response,"moveset_")

                    const data = await response.json()
                    //console.log("Data on all moves:",data)

                    return {
                        ...move,
                        type: data.type.name,
                        power: data.power ?? "-",
                        accuracy: data.accuracy ?? "-",
                        category: data.damage_class.name,
                    }

                } catch (error) {
                    console.error("Error fetching pokemon moveset:" , error.message)
                    return null
                }

            })

        )

        return detailMoves;

         } catch (error) {
            console.error("Error fetching pokemon moveset by level:" , error.message)
            return []
        }

    }

    export function displayPokemonMovesByLevel(arr){
    
                const moveListContainer = document.getElementById("movelist-container")
    
                moveListContainer.innerHTML = arr.map((entry)=>{
                    
                    const {
                        moveName,
                        levelLearnedAt,
                        power,
                        accuracy,
                        category,
                        type
                    } = entry
    
                    return `
                    
                    <tr>
                        <td>${levelLearnedAt}</td>            
                        <td>${firstLetterCaps(moveName)}</td>
                        <td class="flex-center">${displaySecondType(type)}</td>
                        <td>${displayImagesForMoveCategory(category)}</td>
                        <td>${power}</td>
                        <td>${accuracy}</td>
                    </tr>
    
                    `
                    
                }).join("")       
        }

    export function displayImagesForMoveCategory(category){

            switch (category) {
                case "physical":
                    return `<img src="moveCategoryImages/move-physical.png" width="50px">`
                    break;
                case "special":
                    return `<img src="moveCategoryImages/move-special.png" width="50px">`
                default: 
                    return `<img src="moveCategoryImages/move-status.png" width="50px">`
                    break;
            }

    }