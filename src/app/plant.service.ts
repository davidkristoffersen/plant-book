import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Plant } from './plant';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  PLANT_STATES = 'plantStates';
  plantState: Plant = {
    id: 1,
    isAlive: true,
    alive: 'Yes',
    HP: 10,
    humidity: 0,
    sunlight: 0,
    mood: ':(',
    name: 'Unknown',
    size: 1,
    owner: 'Unknown',
    species: 'Unknown',
    group: 'Unknown',
    imgUrl: '../assets/images/potnus.jpg',
    imgText: 'Alt text',
  };

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  initPlantList() {
    const state = this.localStorageService.getRoot(
      this.PLANT_STATES
    );
    if (state === undefined || Object.keys(state).length === 0) {
      return false;
    }
    this.localStorageService.init(this.PLANT_STATES, {});
    return true;
  }

  initPlant(id: number) {
    const state = { ...this.plantState };
    state.id = id;

    this.localStorageService.set(
      this.PLANT_STATES,
      id.toString(),
      state
    );
    this.log(`Init plant: ${state}`);
  }

  updatePlant(id: number, plant: Plant) {
    this.localStorageService.set(
      this.PLANT_STATES,
      id.toString(),
      plant
    );
    this.log(`Updated plant ${plant}`);
  }

  getPlants() {
    return of(
      this.localStorageService.getRoot(this.PLANT_STATES)
    );
  }

  getPlant(id: number) {
    return of(
      this.localStorageService.get(
        this.PLANT_STATES,
        id.toString()
      )
    );
  }

  setPlant(id: number, key: string, value: any) {
    const state = this.localStorageService.get(
      this.PLANT_STATES,
      id.toString()
    );
    state[key] = value;
    this.localStorageService.set(
      this.PLANT_STATES,
      id.toString(),
      state
    );
  }

  deletePlant(id: number) {
    this.localStorageService.delete(
      this.PLANT_STATES,
      id.toString()
    );
  }

  deleteAllPlants() {
    this.localStorageService.deleteRoot(this.PLANT_STATES);
    this.initPlantList();
  }

  log(msg: string) {
    console.log('plantService: ' + msg);
  }

  // OLD
  /*
  getPlantsT() {
    return of(PLANTS);
  }

  getPlantT(id: number) {
    return of(PLANTS.find((plant) => plant.id === id));
  }

  getPlantState(id: number) {
    return of(
      PLANTSTATES.find((plantState) => plantState.id === id)
    );
  }
  */
}
