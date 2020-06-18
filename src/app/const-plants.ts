import { Plant } from './plant';
import { PlantState } from './plant-state';

export const PLANTS: Plant[] = [
  {
    id: 1,
    name: 'Potnus',
    size: 1,
    owner: 'Markus',
    species: 'Unknown',
    group: 'Gymnosperms',
    imgUrl: '../assets/images/potnus.jpg',
    imgText: 'Small boi',
  },
  {
    id: 2,
    name: 'Lykketrollet',
    size: 4,
    owner: 'Magnus',
    species: 'Unknown',
    group: 'Pteridophytes',
    imgUrl: '../assets/images/lykketrollet.jpg',
    imgText: 'Thicc boi',
  },
  {
    id: 3,
    name: 'Baby Alfred',
    size: 3,
    owner: 'Anton',
    species: 'Unknown',
    group: 'Gymnosperms',
    imgUrl: '../assets/images/baby_alfred.jpg',
    imgText: 'Baby boi',
  },
  {
    id: 4,
    name: 'Pilten',
    size: 2,
    owner: 'Jon',
    species: 'Unknown',
    group: 'Gymnosperms',
    imgUrl: '../assets/images/pilten.jpg',
    imgText: 'Sad boi :(',
  },
  {
    id: 5,
    name: 'Plutti',
    size: 5,
    owner: 'David',
    species: 'Unknown',
    group: 'Pteridophytes',
    imgUrl: '../assets/images/plutti.jpg',
    imgText: 'Fat boi',
  },
];

let plantstates: PlantState[] = [];
for (let plant of PLANTS) {
  let state = {
    id: plant.id,
    isAlive: true,
    alive: 'Yes',
    HP: 10,
    humidity: 0,
    sunlightMin: 150,
    sunlight: 150,
    mood: ':(',
  };
  plantstates.push(state);
}
export const PLANTSTATES: PlantState[] = plantstates;
