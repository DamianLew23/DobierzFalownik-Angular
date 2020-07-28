import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-power-filter',
  templateUrl: './power-filter.component.html',
  styleUrls: ['./power-filter.component.scss']
})
export class PowerFilterComponent {

  @Output() powerFilterEvent = new EventEmitter<PowerMinMax>();

  power: PowerMinMax = {};

  powerFilter(minPower: number, maxPower: number): void {
    this.power.minPower = minPower;
    this.power.maxPower = maxPower;
    this.powerFilterEvent.emit(this.power);
  }
}

export interface PowerMinMax {
  minPower?: number;
  maxPower?: number;
}
