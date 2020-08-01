import { Component, OnInit } from '@angular/core';
import {Producer} from '../../../../../shared/models/producer.model';
import {AddSeriesComponent} from '../components/add-series/add-series.component';
import {EditProducerComponent} from '../components/edit-producer/edit-producer.component';
import {AddProducerComponent} from '../components/add-producer/add-producer.component';
import {ProducerService} from '../../../../../core/http/producer.service';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogService} from '../../../../../core/services/confirmation-dialog.service';
import {SeriesService} from '../../../../../core/http/series.service';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit {
  producers$: Observable<Array<Producer>>;

  constructor(
    private producerService: ProducerService,
    private seriesService: SeriesService,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  public newProducer: Producer = {};

  ngOnInit(): void {
    this.loadProducers();
  }

  loadProducers(): void {
    this.producers$ = this.producerService.getAllProducers();
  }

  openModalAddProducer(): void {
    const modalRef = this.modalService.open(AddProducerComponent);
    modalRef.result
      .then((result) => {
        this.newProducer = result;
        this.producerService.addProducer(this.newProducer).subscribe(() => {
          this.loadProducers();
        });
      })
      .catch((result) => {});
  }

  openModalEditProducer(producer: Producer): void {
    const modalRef = this.modalService.open(EditProducerComponent);
    modalRef.componentInstance.producer = producer;
    modalRef.result
      .then((result) => {
        this.producerService
          .updateProducer(result, producer.id)
          .subscribe(() => {
            this.loadProducers();
          });
      })
      .catch((result) => {});
  }

  openModalAddSeries(producer: Producer): void {
    const modalRef = this.modalService.open(AddSeriesComponent);
    modalRef.componentInstance.producer = producer;
    modalRef.result
      .then((newSeriesRequest) => {
        this.seriesService.addSeries(newSeriesRequest)
          .subscribe(() => {
            this.loadProducers();
          });
      })
      .catch((result) => {});
  }

  public removeProducerWithConfirmationDialog(producerToRemove: Producer): void {
    this.confirmationDialogService
      .confirm(
        'Usuń Producenta',
        'Czy napewno chcesz usunąć producenta "' +
        producerToRemove.name +
        '" wraz z wszystkimi seriami i dodanymi falownikami?',
        'Usuń',
        'Anuluj',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.producerService
            .removeProducer(producerToRemove.id)
            .subscribe((producer) => {
              this.loadProducers();
            });
        }
      })
      .catch((result) => {});
  }
}
