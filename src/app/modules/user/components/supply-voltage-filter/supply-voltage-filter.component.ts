import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-supply-voltage-filter',
  templateUrl: './supply-voltage-filter.component.html',
  styleUrls: ['./supply-voltage-filter.component.scss']
})
export class SupplyVoltageFilterComponent {

  @Output() supplyVoltageFilterEvent = new EventEmitter<string>();

  supplyVoltageSymbol: string = null;

  supplyVoltageFilter(supplyVoltage: string, supplyVoltageSymbol: string): void {
    this.supplyVoltageFilterEvent.emit(supplyVoltage);
    this.supplyVoltageSymbol = supplyVoltageSymbol;
  }

}
