import {Component, Input, OnInit} from '@angular/core';
import {Inverter} from '../../../../shared/models/inverter.model';

@Component({
  selector: 'app-inverter-display',
  templateUrl: './inverter-display.component.html',
  styleUrls: ['./inverter-display.component.scss']
})
export class InverterDisplayComponent {
  @Input()
  inverter: Inverter;

  @Input()
  index: number;
}
