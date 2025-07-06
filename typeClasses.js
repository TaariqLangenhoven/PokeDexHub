function addClassToUI(type) {
  switch (type) {
    case 'normal':
      return 'type-normal';
    case 'fire':
      return 'type-fire';
    case 'water':
      return 'type-water';
    case 'grass':
      return 'type-grass';
    case 'electric':
      return 'type-electric';
    case 'ice':
      return 'type-ice';
    case 'fighting':
      return 'type-fighting';
    case 'poison':
      return 'type-poison';
    case 'ground':
      return 'type-ground';
    case 'flying':
      return 'type-flying';
    case 'psychic':
      return 'type-psychic';
    case 'bug':
      return 'type-bug';
    case 'rock':
      return 'type-rock';
    case 'ghost':
      return 'type-ghost';
    case 'dragon':
      return 'type-dragon';
    case 'dark':
      return 'type-dark';
    case 'steel':
      return 'type-steel';
    case 'fairy':
      return 'type-fairy';
    default:
      return '';
  }
}

 function addImgToUI(type){

     switch (type) {
        case 'normal':
            return `<i class="fa-solid fa-user-tie"></i>`
            break;
        case 'fire':
            return `<i class="fa-solid fa-fire"></i>`
            break;
        case 'water':
            return `<i class="fa-solid fa-water"></i>`
            break;
        case 'grass':
            return `<i class="fa-solid fa-leaf"></i>`
            break;
        case 'electric':
            return `<i class="fa-solid fa-bolt"></i>`
            break;
        case 'ice':
            return `<i class="fa-solid fa-cube"></i>`
            break;
        case 'fighting':
            return `<i class="fa-solid fa-hand-fist"></i>`
            break;
        case 'poison':
            return `<i class="fa-solid fa-skull-crossbones"></i>`
            break;
        case 'ground':
            return `<i class="fa-solid fa-campground"></i>`
            break;
        case 'flying':
            return `<i class="fa-brands fa-fly"></i>`
            break;
        case 'psychic':
            return `<i class="fa-solid fa-brain"></i>`
            break;
        case 'bug':
            return `<i class="fa-solid fa-bug"></i>`
            break;
        case 'rock':
            return `<i class="fa-solid fa-hill-rockslide"></i>`
            break;
        case 'ghost':
            return `<i class="fa-solid fa-ghost"></i>`
            break;
        case 'dragon':
            return `<i class="fa-solid fa-dragon"></i>`
            break;
        case 'dark':
            return `<i class="fa-solid fa-moon"></i>`
            break;
        case 'steel':
            return `<i class="fa-solid fa-helmet-safety"></i>`
            break;
        case 'fairy':
            return `<i class="fa-solid fa-republican"></i>`
            break;
        default:
            return `<i class="fa-solid fa-question"></i>`; // Safe fallback icon
    }

}

function addResponsiveColor(type){
  switch (type) {
    case 'normal':
            return `res-type-normal`
            break;
        case 'fire':
            return `res-type-fire`
            break;
        case 'water':
            return `res-type-water`
            break;
        case 'grass':
            return `res-type-grass`
            break;
        case 'electric':
            return `res-type-electric`
            break;
        case 'ice':
            return `res-type-ice`
            break;
        case 'fighting':
            return `res-type-fighting`
            break;
        case 'poison':
            return `res-type-poison`
        case 'ground':
            return `res-type-ground`
            break;
        case 'flying':
            return `res-type-flying`
            break;
        case 'psychic':
            return `res-type-psychic`
            break;
        case 'bug':
            return `res-type-bug`
            break;
        case 'rock':
            return `res-type-rock`
            break;
        case 'ghost':
            return `res-type-ghost`
            break;
        case 'dragon':
            return `res-type-dragon`
            break;
        case 'dark':
            return `res-type-dark`
            break;
        case 'steel':
            return `res-type-steel`
            break;
        case 'fairy':
            return `res-type-fairy`
            break;
        default:
            return 'res-type-unknown'; // Fallback class to avoid undefined
  }
}

export {addClassToUI, addImgToUI, addResponsiveColor}


