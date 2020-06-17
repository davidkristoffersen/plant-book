import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Plant } from '../plant';
import { PlantState } from '../plant-state';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  plant: Plant;
  plantState: PlantState;
  status: {};
  test: string;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.getPlant();
    this.getState();
    this.test = 'testing';
  }

  getId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  getPlant() {
    this.plantService
      .getPlant(this.getId())
      .subscribe((plant) => (this.plant = plant));
  }

  getState() {
    this.plantService
      .getPlantState(this.getId())
      .subscribe(
        (plantState) => (this.plantState = plantState)
      );
  }

  formatTime(time) {
    let ret = '';
    let days = Math.floor(time / (60 * 24));
    let hours = Math.floor(time / 60 - days * 24);
    let minutes = Math.floor(
      time - hours * 60 - days * 24 * 60
    );
    return days + 'd ' + hours + 'h ' + minutes + 'm';
  }
}
