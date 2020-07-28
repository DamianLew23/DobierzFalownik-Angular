import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PowerMinMax} from '../../components/power-filter/power-filter.component';
import {Producer} from '../../../../shared/models/producer.model';
import {Series} from '../../../../shared/models/series.model';
import {InverterDataSource} from '../../../../core/services/inverter.datasource';
import {Observable} from 'rxjs';
import {Inverter} from '../../../../shared/models/inverter.model';
import {InverterService} from '../../../../core/http/inverter.service';
import {MatPaginator} from '@angular/material/paginator';
import {Meta} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';
import {InverterFilterCriteria} from '../../../../shared/models/inverter-filter-criteria.model';

@Component({
  selector: 'app-inverters-by-power',
  templateUrl: './inverters-by-power.component.html',
  styleUrls: ['./inverters-by-power.component.scss']
})
export class InvertersByPowerComponent implements OnInit, AfterViewInit {
  inverterDataSource: InverterDataSource;
  inverters$: Observable<Inverter[]>;
  invertersFilterCriteria: InverterFilterCriteria = {};

  power: PowerMinMax = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private inverterService: InverterService, private meta: Meta) { }

  ngOnInit(): void {
    this.inverterDataSource = new InverterDataSource(this.inverterService);
    this.inverterDataSource.loadInverters();
    this.inverters$ = this.inverterDataSource.connect();
    this.meta.updateTag({
      name: 'description',
      content: 'Program Doboru Falowników - Dobór Wg Mocy Silnika.'
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.loadInvertersPage())).subscribe();
  }

  loadInvertersPage(): void {
    this.inverterDataSource.loadInverters(
      this.invertersFilterCriteria,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  onSupplyVoltageFilterEvent(supplyVoltage: string): void {
    this.invertersFilterCriteria.supplyVoltageSymbolSlug = supplyVoltage;
    this.loadInvertersPage();
  }

  onOutputVoltageFilterEvent(outputVoltage: string): void {
    this.invertersFilterCriteria.outputVoltageSymbolSlug = outputVoltage;
    this.loadInvertersPage();
  }

  onPowerFilterEvent(powerMinMax: PowerMinMax): void {
    this.invertersFilterCriteria.powerMin = powerMinMax.minPower;
    this.invertersFilterCriteria.powerMax = powerMinMax.maxPower;
    this.power = powerMinMax;
    this.loadInvertersPage();
  }

  onProducerFilterEvent(producer: Producer): void {
    this.invertersFilterCriteria.producerSlug = producer.slug;
    this.loadInvertersPage();
  }

  onSeriesFilterEvent(series: Series): void {
    this.invertersFilterCriteria.seriesSlug = series.slug;
    this.loadInvertersPage();
  }

  onResetFiltersEvent(): void {
    this.invertersFilterCriteria.producerSlug = null;
    this.invertersFilterCriteria.seriesSlug = null;
    this.loadInvertersPage();
  }

}
