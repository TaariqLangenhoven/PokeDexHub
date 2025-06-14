const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
];

const superEffectiveTypings = [
  {
    type: 'normal',
    effectiveness: [
      { type: 'fighting' },
    ],
  },
  {
    type: 'fire',
    effectiveness: [
      { type: 'grass' },
      { type: 'ice' },
      { type: 'bug' },
      { type: 'steel' },
    ],
  },
  {
    type: 'water',
    effectiveness: [
      { type: 'fire' },
      { type: 'ground' },
      { type: 'rock' },
    ],
  },
  {
    type: 'grass',
    effectiveness: [
      { type: 'water' },
      { type: 'ground' },
      { type: 'rock' },
    ],
  },
  {
    type: 'ice',
    effectiveness: [
      { type: 'grass' },
      { type: 'ground' },
      { type: 'flying' },
      { type: 'dragon' },
    ],
  },
  {
    type: 'electric',
    effectiveness: [
      { type: 'water' },
      { type: 'flying' },
    ],
  },
  {
    type: 'psychic',
    effectiveness: [
      { type: 'fighting' },
      { type: 'poison' },
    ],
  },
  {
    type: 'fighting',
    effectiveness: [
      { type: 'normal' },
      { type: 'rock' },
      { type: 'ice' },
      { type: 'dark' },
      { type: 'steel' },
    ],
  },
  {
    type: 'poison',
    effectiveness: [
      { type: 'grass' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'ground',
    effectiveness: [
      { type: 'electric' },
      { type: 'poison' },
      { type: 'rock' },
      { type: 'steel' },
      { type: 'fire' },
    ],
  },
  {
    type: 'flying',
    effectiveness: [
      { type: 'grass' },
      { type: 'fighting' },
      { type: 'bug' },
    ],
  },
  {
    type: 'bug',
    effectiveness: [
      { type: 'grass' },
      { type: 'psychic' },
      { type: 'dark' },
    ],
  },
  {
    type: 'rock',
    effectiveness: [
      { type: 'flying' },
      { type: 'bug' },
      { type: 'fire' },
      { type: 'ice' },
    ],
  },
  {
    type: 'ghost',
    effectiveness: [
      { type: 'psychic' },
      { type: 'ghost' },
    ],
  },
  {
    type: 'steel',
    effectiveness: [
      { type: 'rock' },
      { type: 'ice' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'dragon',
    effectiveness: [
      { type: 'dragon' },
    ],
  },
  {
    type: 'dark',
    effectiveness: [
      { type: 'psychic' },
      { type: 'ghost' },
    ],
  },
  {
    type: 'fairy',
    effectiveness: [
      { type: 'dragon' },
      { type: 'dark' },
      { type: 'fighting' },
    ],
  },
];

const weakToTypings = [
  {
    type: 'normal',
    weakTo: [
      { type: 'fighting' },
    ],
  },
  {
    type: 'fire',
    weakTo: [
      { type: 'water' },
      { type: 'ground' },
      { type: 'rock' },
    ],
  },
  {
    type: 'water',
    weakTo: [
      { type: 'electric' },
      { type: 'grass' },
    ],
  },
  {
    type: 'grass',
    weakTo: [
      { type: 'fire' },
      { type: 'ice' },
      { type: 'poison' },
      { type: 'flying' },
      { type: 'bug' },
    ],
  },
  {
    type: 'ice',
    weakTo: [
      { type: 'fire' },
      { type: 'fighting' },
      { type: 'rock' },
      { type: 'steel' },
    ],
  },
  {
    type: 'electric',
    weakTo: [
      { type: 'ground' },
    ],
  },
  {
    type: 'psychic',
    weakTo: [
      { type: 'bug' },
      { type: 'ghost' },
      { type: 'dark' },
    ],
  },
  {
    type: 'fighting',
    weakTo: [
      { type: 'flying' },
      { type: 'psychic' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'poison',
    weakTo: [
      { type: 'ground' },
      { type: 'psychic' },
    ],
  },
  {
    type: 'ground',
    weakTo: [
      { type: 'water' },
      { type: 'grass' },
      { type: 'ice' },
    ],
  },
  {
    type: 'flying',
    weakTo: [
      { type: 'electric' },
      { type: 'ice' },
      { type: 'rock' },
    ],
  },
  {
    type: 'bug',
    weakTo: [
      { type: 'fire' },
      { type: 'flying' },
      { type: 'rock' },
    ],
  },
  {
    type: 'rock',
    weakTo: [
      { type: 'water' },
      { type: 'grass' },
      { type: 'fighting' },
      { type: 'ground' },
      { type: 'steel' },
    ],
  },
  {
    type: 'ghost',
    weakTo: [
      { type: 'ghost' },
      { type: 'dark' },
    ],
  },
  {
    type: 'steel',
    weakTo: [
      { type: 'fire' },
      { type: 'fighting' },
      { type: 'ground' },
    ],
  },
  {
    type: 'dragon',
    weakTo: [
      { type: 'ice' },
      { type: 'dragon' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'dark',
    weakTo: [
      { type: 'fighting' },
      { type: 'bug' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'fairy',
    weakTo: [
      { type: 'poison' },
      { type: 'steel' },
    ],
  },
];

const resistTypings = [
  {
    type: 'normal',
    resist: [],
  },
  {
    type: 'fire',
    resist: [
      { type: 'fire' },
      { type: 'grass' },
      { type: 'ice' },
      { type: 'bug' },
      { type: 'steel' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'water',
    resist: [
      { type: 'fire' },
      { type: 'water' },
      { type: 'ice' },
      { type: 'steel' },
    ],
  },
  {
    type: 'grass',
    resist: [
      { type: 'water' },
      { type: 'electric' },
      { type: 'grass' },
      { type: 'ground' },
    ],
  },
  {
    type: 'ice',
    resist: [
      { type: 'ice' },
    ],
  },
  {
    type: 'electric',
    resist: [
      { type: 'electric' },
      { type: 'flying' },
      { type: 'steel' },
    ],
  },
  {
    type: 'psychic',
    resist: [
      { type: 'fighting' },
      { type: 'psychic' },
    ],
  },
  {
    type: 'fighting',
    resist: [
      { type: 'bug' },
      { type: 'rock' },
      { type: 'dark' },
    ],
  },
  {
    type: 'poison',
    resist: [
      { type: 'grass' },
      { type: 'fighting' },
      { type: 'poison' },
      { type: 'bug' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'ground',
    resist: [
      { type: 'poison' },
      { type: 'rock' },
    ],
  },
  {
    type: 'flying',
    resist: [
      { type: 'grass' },
      { type: 'fighting' },
      { type: 'bug' },
    ],
  },
  {
    type: 'bug',
    resist: [
      { type: 'grass' },
      { type: 'fighting' },
      { type: 'ground' },
    ],
  },
  {
    type: 'rock',
    resist: [
      { type: 'normal' },
      { type: 'fire' },
      { type: 'poison' },
      { type: 'flying' },
    ],
  },
  {
    type: 'ghost',
    resist: [
      { type: 'poison' },
      { type: 'bug' },
      { type: 'normal' }, // immune
      { type: 'fighting' }, // immune
    ],
  },
  {
    type: 'steel',
    resist: [
      { type: 'normal' },
      { type: 'grass' },
      { type: 'ice' },
      { type: 'flying' },
      { type: 'psychic' },
      { type: 'bug' },
      { type: 'rock' },
      { type: 'dragon' },
      { type: 'steel' },
      { type: 'fairy' },
    ],
  },
  {
    type: 'dragon',
    resist: [
      { type: 'fire' },
      { type: 'water' },
      { type: 'electric' },
      { type: 'grass' },
    ],
  },
  {
    type: 'dark',
    resist: [
      { type: 'ghost' },
      { type: 'dark' },
    ],
  },
  {
    type: 'fairy',
    resist: [
      { type: 'fighting' },
      { type: 'bug' },
      { type: 'dark' },
      { type: 'dragon' }, // immune
    ],
  },
];

const immuneTypings = [
  {
    type: 'normal',
    immuneTo: [
      { type: 'ghost' },
    ],
  },
  {
    type: 'fire',
    immuneTo: [],
  },
  {
    type: 'water',
    immuneTo: [],
  },
  {
    type: 'grass',
    immuneTo: [],
  },
  {
    type: 'ice',
    immuneTo: [],
  },
  {
    type: 'electric',
    immuneTo: [],
  },
  {
    type: 'psychic',
    immuneTo: [],
  },
  {
    type: 'fighting',
    immuneTo: [],
  },
  {
    type: 'poison',
    immuneTo: [],
  },
  {
    type: 'ground',
    immuneTo: [
      { type: 'electric' },
    ],
  },
  {
    type: 'flying',
    immuneTo: [
      { type: 'ground' },
    ],
  },
  {
    type: 'bug',
    immuneTo: [],
  },
  {
    type: 'rock',
    immuneTo: [],
  },
  {
    type: 'ghost',
    immuneTo: [
      { type: 'normal' },
      { type: 'fighting' },
    ],
  },
  {
    type: 'steel',
    immuneTo: [
      { type: 'poison' },
    ],
  },
  {
    type: 'dragon',
    immuneTo: [],
  },
  {
    type: 'dark',
    immuneTo: [
      { type: 'psychic' },
    ],
  },
  {
    type: 'fairy',
    immuneTo: [
      { type: 'dragon' },
    ],
  },
];

function displaySuperEffectiveTypes(typing){
    const arrOfTypes = []
    const check = superEffectiveTypings.find((item)=> item.type === typing ) 
    check.effectiveness.forEach((type)=> arrOfTypes.push(type.type)) 
    //console.log("Strong against: ",arrOfTypes)
    return arrOfTypes
}

function displayWeakTypes(type1, type2) {
  const arrOfTypes = [];
  const arrOfResistTypes = [];
  const arrOfImmunities = [];

  // Helper function to collect typings
  function collectTypeData(type) {
    const weakEntry = weakToTypings.find(t => t.type === type);
    if (weakEntry) weakEntry.weakTo.forEach(t => arrOfTypes.push(t.type));

    const resistEntry = resistTypings.find(t => t.type === type);
    if (resistEntry) resistEntry.resist.forEach(t => arrOfResistTypes.push(t.type));

    const immuneEntry = immuneTypings.find(t => t.type === type);
    if (immuneEntry) immuneEntry.immuneTo.forEach(t => arrOfImmunities.push(t.type));
  }

  collectTypeData(type1);

  if (pokemonTypes.includes(type2)) {
    //console.log("TEST IF TYPE2 IS ACTIVE");
    collectTypeData(type2);
  }

  //console.log("weak types arr: ", arrOfTypes);
  //console.log("resist types arr: ", arrOfResistTypes);
 // console.log("immunities types arr: ", arrOfImmunities);

  const filteredArrOfTypes = arrOfTypes.filter(
    type => !arrOfResistTypes.includes(type) && !arrOfImmunities.includes(type)
  );

  const removedDups = [...new Set(filteredArrOfTypes)];
  //console.log("end product: ", removedDups);

  return removedDups;
}




export {displaySuperEffectiveTypes, displayWeakTypes}