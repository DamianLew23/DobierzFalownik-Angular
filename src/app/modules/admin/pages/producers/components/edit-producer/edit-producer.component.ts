import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Producer} from '../../../../../../shared/models/producer.model';
import {Series} from '../../../../../../shared/models/series.model';
import {SeriesService} from '../../../../../../core/http/series.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-edit-producer',
  templateUrl: './edit-producer.component.html',
  styleUrls: [ './edit-producer.component.scss' ]
})
export class EditProducerComponent implements OnInit{
  @Input() producer: Producer;

  series$: Observable<Series[]>;

  constructor(public activeModal: NgbActiveModal, private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.series$ = this.seriesService.getSeriesByProducerId(this.producer.id);
  }

  removeSeries(singleSeries: Series): void {
    this.seriesService.deleteSeries(singleSeries.id).subscribe();
    this.series$ = this.seriesService.getSeriesByProducerId(this.producer.id);
  }

  passBackProducer(): void {
    this.activeModal.close(this.producer);
  }

  closeActiveModal(): void {
    this.activeModal.dismiss();
  }


}
