import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Plant } from './plant';
import { PLANTS } from './const-plants';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor() {}

  getPlants() {
    return of(PLANTS);
  }

  getPlant(id: number) {
    return of(PLANTS.find((plant) => plant.id === id));
  }
}
