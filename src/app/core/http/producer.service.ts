import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Producer} from '../../shared/models/producer.model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  hostUrl = 'http://localhost:8080/api/producers';

  constructor(private http: HttpClient) { }

  getAllProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.hostUrl);
  }
}
