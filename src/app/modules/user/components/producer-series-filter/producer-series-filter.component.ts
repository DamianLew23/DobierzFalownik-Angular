import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Producer} from '../../../../shared/models/producer.model';
import {Series} from '../../../../shared/models/series.model';
import {ProducerService} from '../../../../core/http/producer.service';
import {SeriesService} from '../../../../core/http/series.service';

@Component({
  selector: 'app-producer-series-filter',
  templateUrl: './producer-series-filter.component.html',
  styleUrls: ['./producer-series-filter.component.scss']
})
export class ProducerSeriesFilterComponent implements OnInit {

  producers$: Observable<Producer[]>;
  series$: Observable<Series[]>;

  @Output() producerFilterEvent = new EventEmitter<Producer>();
  @Output() seriesFilterEvent = new EventEmitter<Series>();
  @Output() resetFiltersEvent = new EventEmitter();

  selectedProducer: Producer = {};
  selectedSeries: Series = {};
  isSeriesDisable = true;

  constructor(private producerService: ProducerService, private seriesService: SeriesService) {
  }

  ngOnInit(): void {
    this.producers$ = this.producerService.getAllProducers();
  }

  producerFilter(producer: Producer): void {
    this.selectedSeries = {};
    this.isSeriesDisable = false;
    this.producerFilterEvent.emit(producer);
    this.seriesFilterEvent.emit(this.selectedSeries);
    this.selectedProducer = producer;
    this.series$ = this.seriesService.getSeriesByProducerId(producer.id);
  }

  seriesFilter(series: Series): void {
    this.seriesFilterEvent.emit(series);
    this.selectedSeries = series;
  }

  resetFilters(): void {
    this.selectedProducer = {};
    this.selectedSeries = {};
    this.isSeriesDisable = true;
    this.producerFilterEvent.emit(null);
    this.seriesFilterEvent.emit(null);
    this.resetFiltersEvent.emit();
  }

}
