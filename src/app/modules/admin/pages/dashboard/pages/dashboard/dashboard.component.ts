import { Component, OnInit } from '@angular/core';
import {Producer} from '../../../../../../shared/models/producer.model';
import {InverterDataSource} from '../../../../../../core/services/inverter.datasource';
import {Inverter} from '../../../../../../shared/models/inverter.model';
import {InverterService} from '../../../../../../core/http/inverter.service';
import {ProducerService} from '../../../../../../core/http/producer.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  inverterDataSource: InverterDataSource;
  inverters$: Observable<Array<Inverter>>;
  producers$: Observable<Array<Producer>>;

  constructor(private inverterService: InverterService, private producerService: ProducerService) {}

  ngOnInit(): void {
    this.producers$ = this.producerService.getAllProducers();
    this.inverterDataSource = new InverterDataSource(this.inverterService);
    this.inverterDataSource.loadInverters();
    this.inverters$ = this.inverterDataSource.connect();
  }

}
