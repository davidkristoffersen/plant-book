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
      this.plantService.initPlant(1);
      this.plantService.initPlant(2);
      this.plantService.initPlant(3);
      this.plantService.setPlant(1, 'mood', ':S');
      this.plantService.setPlant(2, 'mood', 'XD');
      this.plantService.setPlant(3, 'mood', ':/');
    } else {
      console.warn('Plants already exists');
    }
    this.getPlants();
  }

  getPlants() {
    this.plantService.getPlants().subscribe((plants) => {
      (this.plants = plants),
        console.log(['Got plants', plants]);
    });
  }
}
