import { Component, OnInit } from '@angular/core';

import { Plant } from '../plant';
import { MOCK_PLANTS } from '../const-plants';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css'],
})
export class PlantsComponent implements OnInit {
  plants: Plant[];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    if (!this.plantService.initPlantList()) {
      console.warn('Plants does not exists');
      if (this.plantService.getMockBool() === true) {
        this.setMockPlants(true);
      }
    } else {
      console.warn('Plants already exists');
    }
    this.getPlants();
  }

  getPlants() {
    this.plantService.getPlants().subscribe((plants) => {
      (this.plants = Object.keys(plants).map(
        (id) => plants[+id]
      )),
        console.log([
          'Got plants',
          Object.keys(plants).map((id) => plants[+id]),
        ]);
    });
  }

  addPlant() {
    this.plantService.initPlant();
    this.getPlants();
  }

  deletePlant(id: number) {
    this.plantService.deletePlant(id);
    this.getPlants();
  }

  setMockPlants(bool: boolean) {
    this.plantService.deleteAllPlants();
    this.plantService.setMockBool(bool);
    if (bool) {
      for (const plant of MOCK_PLANTS) {
        this.plantService.initPlant();
        this.plantService.updatePlant(plant.id, plant);
      }
    }
    this.getPlants();
  }

  onClear() {
    this.plantService.deleteAllPlants();
    this.getPlants();
  }
}
