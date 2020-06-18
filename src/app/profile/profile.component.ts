import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Plant } from '../plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  plant: Plant;
  statusForm;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private formBuilder: FormBuilder
  ) {
    this.statusForm = this.formBuilder.group({
      HP: 0,
    });
  }

  ngOnInit(): void {
    this.getPlant();
  }

  getId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  getPlant() {
    this.plantService
      .getPlant(this.getId())
      .subscribe((plant) => (this.plant = plant));
  }

  getSunlight() {
    return this.formatTime(this.plant.sunlight);
  }

  formatTime(time) {
    let ret = '';
    let days = Math.floor(time / (60 * 24));
    let hours = Math.floor(time / 60 - days * 24);
    let minutes = Math.floor(time - hours * 60 - days * 24 * 60);
    return days + 'd ' + hours + 'h ' + minutes + 'm';
  }

  onSubmitStatus(statusData) {
    console.log('Submitted');
  }

  addHP(num) {
    this.plant.HP += num;
    this.updatePlant();
  }

  updatePlant() {
    if (this.plant.HP <= 0) {
      this.plant.HP = 0;
      this.plant.alive = 'No';
      this.plant.isAlive = false;
      this.plant.mood = 'X_X';
    } else {
      this.plant.alive = 'Yes';
      this.plant.isAlive = true;

      if (this.plant.HP >= 70) {
        this.plant.mood = ':)';
      } else if (this.plant.HP >= 40) {
        this.plant.mood = ':|';
      } else if (this.plant.HP > 0) {
        this.plant.mood = ':(';
      }

      if (this.plant.HP >= 100) {
        this.plant.HP = 100;
        this.plant.mood = ':D';
      }
    }
    this.plantService.updatePlant(this.plant.id, this.plant);
  }
}
