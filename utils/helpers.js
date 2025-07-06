
export function firstLetterCaps(name){
         
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

export function calculateWeight(weight){
      const actualWeight =  weight * 100
      const kilograms = actualWeight / 1000
      return kilograms + "kg"
    }

export function calculateHeight(height){
        const actualHeight = height * 10
        const meters = actualHeight / 100
        return meters + "m"
    }

export const getCaptureRate = (speciesData) =>{
           return speciesData.capture_rate
}

export const getCatchRate = (rate, item, maxHp) => {
  const currentHp = maxHp / 2;

  const ballMod = {
    pokeBall: 1,
    greatBall: 1.5,
    ultraBall: 2,
  };

  const base = (((3 * maxHp) - (2 * currentHp)) * (rate * ballMod[item])) / (3 * maxHp);
  const probability = base / 255;

  const percentage = new Intl.NumberFormat("en-ZA", {
    style: "percent",
    minimumFractionDigits: 1,
  }).format(probability);

  return `${percentage}`;
};

export const getStatValues = (data)=>{   
            return data.stats.map((stat)=> stat.base_stat)
        }

export function displayStatValues(array){

            return array.map(i=>`<h4>${i}</h4>`).join("")
    
        }

export function calculateTotal (array){

            const statValues = [...array]
            return `${statValues.reduce((i , index)=> i + index , 0)}`
        }

export function checkAPIResponse(response, label = "API") {
  if (!response.ok) {
    console.error(`${label} Error ${response.status}: ${response.statusText}`);
    throw new Error(`${label.toUpperCase()}_FETCH_FAILED`);
  }
}

export function getSpeciesDescription(data){
            const entry = data.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || "No description.";
            return entry
        }

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