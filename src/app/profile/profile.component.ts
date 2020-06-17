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

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.getPlant();
  }

  getPlant() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService
      .getPlant(id)
      .subscribe((plant) => (this.plant = plant));
  }
}
