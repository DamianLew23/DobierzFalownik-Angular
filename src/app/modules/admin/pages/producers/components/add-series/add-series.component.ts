import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Producer} from '../../../../../../shared/models/producer.model';
import {NewSeriesRequest} from '../../../../../../shared/models/new-series-request.model';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: [ './add-series.component.scss' ]
})
export class AddSeriesComponent {
  @Input() producer: Producer;

  newSeries: NewSeriesRequest = {};

  constructor(public activeModal: NgbActiveModal) {}


  passBackProducerWithSeries(): void {
    this.newSeries.producerId = this.producer.id;
    this.activeModal.close(this.newSeries);
  }

  closeActiveModal(): void {
    this.activeModal.dismiss();
  }
}
