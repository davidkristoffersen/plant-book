import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

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
    this.getState();
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

  getSunlight() {
    return this.formatTime(this.plantState['sunlight']);
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

  onSubmitStatus(statusData) {
    console.log('Submitted');
  }

  addHP(num) {
    this.plantState['HP'] += num;
    this.updateHP();
  }

  updateHP() {
    if (this.plantState['HP'] <= 0) {
      this.plantState['HP'] = 0;
      this.plantState['alive'] = 'No';
      this.plantState['isAlive'] = false;
      this.plantState['mood'] = 'X_X';
    } else {
      this.plantState['alive'] = 'Yes';
      this.plantState['isAlive'] = true;

      if (this.plantState['HP'] >= 70) {
        this.plantState['mood'] = ':)';
      } else if (this.plantState['HP'] >= 40) {
        this.plantState['mood'] = ':|';
      } else if (this.plantState['HP'] > 0) {
        this.plantState['mood'] = ':(';
      }

      if (this.plantState['HP'] >= 100) {
        this.plantState['HP'] = 100;
        this.plantState['mood'] = ':D';
      }
    }
  }
}
