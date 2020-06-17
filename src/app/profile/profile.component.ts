import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Plant } from '../plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  plant: Plant;
  status: {};

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.getPlant();
    this.status = {
      humidity: 0,
      alive: true,
      HP: 100,
    };
  }

  getPlant() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService
      .getPlant(id)
      .subscribe((plant) => (this.plant = plant));
  }

  getStatus() {
    return this.status;
  }
}
