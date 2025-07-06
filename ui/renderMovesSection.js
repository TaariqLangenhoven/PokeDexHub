export function getMoveSection(){
        return `
    
    <div class="main-info-grid">

        <div class="mt-2 type-diff-container flex-center ">
            <div class="type-info wrapper-col card">
                <div class="wrapper-col">
                    
                    <div class="table-wrapper">
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th id="lvBtn">Lv.</th>
                                <th id="moveBtn">Move</th>
                                <th id="typeBtn">Type</th>
                                <th id="catBtn">Cat.</th>
                                <th id="powerBtn">Power</th>
                                <th id="accBtn">Acc.</th>
                            </tr>
                        </thead>
                        <tbody id="movelist-container">                         
                        </tbody>
                    </table>
                </div>            
            </div>
        </div>

        
    </div>
    
        `
    }