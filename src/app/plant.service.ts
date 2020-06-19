import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Plant } from './plant';
import { DEFAULT_PLANT, MOCK_PLANTS } from './const-plants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  PLANTS_KEY = 'plantStates';
  META_KEY = 'metaData';

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  initPlantList() {
    const state = this.localStorageService.getRoot(
      this.PLANTS_KEY
    );
    if (state === undefined || Object.keys(state).length === 0) {
      this.localStorageService.init(this.PLANTS_KEY, {});
      console.warn(['PlantList', {}]);
      return false;
    }
    console.warn(['PlantList', state]);
    return true;
  }

  setMockBool(bool: boolean) {
    this.localStorageService.setRoot(this.META_KEY, {});
    this.localStorageService.set(this.META_KEY, 'mock', bool);
  }

  getMockBool() {
    return this.localStorageService.get(this.META_KEY, 'mock');
  }

  initPlant() {
    const state = { ...DEFAULT_PLANT };
    const id = this.genId();
    state.id = id;

    console.log(['Init plant:', state]);
    this.localStorageService.set(
      this.PLANTS_KEY,
      id.toString(),
      state
    );
  }

  updatePlant(id: number, plant: Plant) {
    this.localStorageService.set(
      this.PLANTS_KEY,
      id.toString(),
      plant
    );
    console.log(['Updated plant', plant]);
  }

  genId() {
    const plants = this.localStorageService.getRoot(
      this.PLANTS_KEY
    );
    if (
      plants === undefined ||
      Object.keys(plants).length === 0
    ) {
      return 0;
    }

    const ids = Object.keys(plants).map((id) => +id);
    return Math.max(...ids) + 1;
  }

  getPlants() {
    return of(this.localStorageService.getRoot(this.PLANTS_KEY));
  }

  getPlant(id: number) {
    return of(
      this.localStorageService.get(
        this.PLANTS_KEY,
        id.toString()
      )
    );
  }

  setPlant(id: number, key: string, value: any) {
    const state = this.localStorageService.get(
      this.PLANTS_KEY,
      id.toString()
    );
    state[key] = value;
    this.localStorageService.set(
      this.PLANTS_KEY,
      id.toString(),
      state
    );
  }

  deletePlant(id: number) {
    this.localStorageService.delete(
      this.PLANTS_KEY,
      id.toString()
    );
  }

  deleteAllPlants() {
    this.localStorageService.deleteRoot(this.PLANTS_KEY);
    this.initPlantList();
  }
}
