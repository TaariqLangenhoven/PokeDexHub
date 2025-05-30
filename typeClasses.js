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
            break;
    }

}

export {addClassToUI, addImgToUI}