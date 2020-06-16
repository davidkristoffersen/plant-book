import { Component, OnInit } from '@angular/core';

import { PLANTS } from '../const-plants';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css'],
})
export class PlantsComponent implements OnInit {
  plants = PLANTS;

  constructor() {}

  ngOnInit(): void {}
}
