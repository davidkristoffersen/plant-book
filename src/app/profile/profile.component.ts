import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

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
  edit: boolean;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.edit = false;
    this.getPlant().subscribe(
      (_) =>
        (this.statusForm = this.formBuilder.group(this.plant))
    );
  }

  getId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  getPlant() {
    return of(
      this.plantService
        .getPlant(this.getId())
        .subscribe((plant) => (this.plant = plant))
    );
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

  onSubmitStatus() {
    if (this.statusForm.valid) {
      console.log(['Form Submitted!', this.statusForm]);
      this.updatePlantValues(this.statusForm.value);
    }
    this.edit = false;
  }

  updatePlantValues(values) {
    this.plant = values;
    this.updatePlant();
  }

  onEdit() {
    this.edit = true;
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
