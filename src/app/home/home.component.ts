import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private plantService: PlantService) {}

  ngOnInit(): void {}

  onClear() {
    this.plantService.deleteAllPlants();
  }
}
