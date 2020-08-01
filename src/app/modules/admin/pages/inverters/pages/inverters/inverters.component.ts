import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InverterDataSource} from '../../../../../../core/services/inverter.datasource';
import {Inverter} from '../../../../../../shared/models/inverter.model';
import {Observable} from 'rxjs';
import {Producer} from '../../../../../../shared/models/producer.model';
import {InverterFilterCriteria} from '../../../../../../shared/models/inverter-filter-criteria.model';
import {Series} from '../../../../../../shared/models/series.model';
import {MatPaginator} from '@angular/material/paginator';
import {InverterService} from '../../../../../../core/http/inverter.service';
import {ProducerService} from '../../../../../../core/http/producer.service';
import {ConfirmationDialogService} from '../../../../../../core/services/confirmation-dialog.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {tap} from 'rxjs/operators';
import {EditInverterComponent} from '../../components/edit-inverter/edit-inverter.component';
import {CopyInverterComponent} from '../../components/copy-inverter/copy-inverter.component';

@Component({
  selector: 'app-inverters',
  templateUrl: './inverters.component.html',
  styleUrls: ['./inverters.component.scss']
})
export class InvertersComponent implements AfterViewInit, OnInit {
  inverterDataSource: InverterDataSource;
  inverters$: Observable<Inverter[]>;
  producers$: Observable<Producer[]>;

  invertersFilterCriteria: InverterFilterCriteria = {};

  series: Array<Series> = [];
  isSeriesDisable = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private inverterService: InverterService,
    private producerService: ProducerService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.inverterDataSource = new InverterDataSource(this.inverterService);
    this.inverterDataSource.loadInverters();
    this.inverters$ = this.inverterDataSource.connect();
    this.producers$ = this.producerService.getAllProducers();
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

  producerFilter(producer: Producer): void {
    this.invertersFilterCriteria.producerSlug = producer.slug;
    this.invertersFilterCriteria.seriesSlug = null;
    this.isSeriesDisable = false;
    this.series = producer.series;
    this.inverterDataSource.loadInverters(this.invertersFilterCriteria);
  }

  seriesFilter(series: Series): void {
    this.invertersFilterCriteria.seriesSlug = series.slug;
    this.inverterDataSource.loadInverters(this.invertersFilterCriteria);
  }

  openModalEditInverter(inverter: Inverter): void {
    const modalRef = this.modalService.open(EditInverterComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inverter = inverter;
    modalRef.result
      .then((result) => {
        this.inverterService.updateInverter(result, inverter.id).subscribe(() => {
          this.inverterDataSource.loadInverters(this.invertersFilterCriteria);
        });
      })
      .catch(() => {});
  }

  openModalCopyInverter(inverter: Inverter): void {
    const modalRef = this.modalService.open(CopyInverterComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inverter = inverter;
    modalRef.result
      .then((result) => {
        this.inverterService.addInverter(result).subscribe(() => {
          this.inverterDataSource.loadInverters(this.invertersFilterCriteria);
        });
      })
      .catch(() => {});
  }

  public removeInverterWithConfirmationDialog(inverterToRemove: Inverter): void {
    this.confirmationDialogService
      .confirm(
        'Usuń Falownik',
        'Czy napewno chcesz usunąć falownik "' +
        inverterToRemove.producerName +
        ' ' +
        inverterToRemove.seriesName +
        ' ' +
        inverterToRemove.model +
        '"?',
        'Usuń',
        'Anuluj',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.inverterService.removeInverter(inverterToRemove.id).subscribe((inverter) => {
            this.inverterDataSource.loadInverters(this.invertersFilterCriteria);
          });
        }
      })
      .catch(() => {});
  }
}
