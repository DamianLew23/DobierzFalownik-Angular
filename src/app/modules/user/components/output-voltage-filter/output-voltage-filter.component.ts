import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-output-voltage-filter',
  templateUrl: './output-voltage-filter.component.html',
  styleUrls: ['./output-voltage-filter.component.scss']
})
export class OutputVoltageFilterComponent {

  @Output() outputVoltageFilterEvent = new EventEmitter<string>();

  outputVoltageSymbol: string = null;

  outputVoltageFilter(outputVoltage: string, outputVoltageSymbol: string): void {
    this.outputVoltageFilterEvent.emit(outputVoltageSymbol);
    this.outputVoltageSymbol = outputVoltageSymbol;
  }
}
