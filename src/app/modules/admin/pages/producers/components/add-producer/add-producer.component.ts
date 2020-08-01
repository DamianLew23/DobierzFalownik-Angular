import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Producer} from '../../../../../../shared/models/producer.model';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: [ './add-producer.component.scss' ]
})
export class AddProducerComponent implements OnInit {
  newProducer: Producer = {};

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  passBackProducer(): void {
    this.activeModal.close(this.newProducer);
  }

  closeActiveModal(): void {
    this.activeModal.dismiss();
  }
}
