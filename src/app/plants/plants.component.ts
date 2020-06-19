import { Component, OnInit } from '@angular/core';

import { Plant } from '../plant';
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

  onClear() {
    this.plantService.deleteAllPlants();
    this.getPlants();
  }
}
