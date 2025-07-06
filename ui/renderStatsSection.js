 import * as typeClass from '../typeClasses.js'
 import { addWeakToTypingsUI } from '../utils/uiHelpers.js'
 import { getStatValues,displayStatValues,calculateTotal } from '../utils/helpers.js'

 export function getStatsSection(data,type1,weakAgainstTypeInfo,resistantAgainstTypeInfo,immuneAgainstTypeInfo,superEffectiveAgainst){

        return `
    
    <div class="main-info-grid">

        <div class="mt-2 flex-center">    
            <div class="wrapper-col card">
                <div class="chart flex-center">
                    <canvas id="myChart"></canvas>
                    <div class="flex-col gap-5">
                        ${displayStatValues(getStatValues(data))}
                    </div>
                        
                </div>
                    <div class="flex-center gap-05">
                        <div>
                            <h3>Total: </h3>
                        </div>
                        <div>
                            <h3>${calculateTotal(getStatValues(data))}</h3>
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