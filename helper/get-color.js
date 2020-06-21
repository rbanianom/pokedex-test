export default function getColor(type) {
  let color = '';
  switch (type) {
    case 'bug':
      color = '#88960e';
      break;
    case 'dark':
      color = '#3c2d23';
      break;
    case 'electric':
      color = '#e79302';
      break;
    case 'dragon':
      color = '#7059d8';
      break;
    case 'fairy':
      color = '#e08fe0';
      break;
    case 'fighting':
      color = '#79301a';
      break;
    case 'fire':
      color = '#df3509';
      break;
    case 'flying':
      color = '#94a6f3';
      break;
    case 'ghost':
      color = '#5f5fb1';
      break;
    case 'grass':
      color = '#72c134';
      break;
    case 'ground':
      color = '#cdac51';
      break;
    case 'ice':
      color = '#9ee5fd';
      break;
    case 'normal':
      color = '#c3bdb3';
      break;
    case 'poison':
      color = '#904392';
      break;
    case 'psychic':
      color = '#ea447e';
      break;
    case 'rock':
      color = '#b79f54';
      break;
    case 'steel':
      color = '#aaaab9';
      break;
    case 'water':
      color = '#3496f8';
      break;
    default:
      color = '#c3bdb3';
      break;
  }

  return color;
}
