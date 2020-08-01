import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Producer} from '../../shared/models/producer.model';
import {TokenStorageService} from '../authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  hostUrl = 'http://localhost:8080/api/producers';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getAllProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.hostUrl);
  }

  addProducer(producer: Producer): Observable<Producer> {
    return this.http.post(this.hostUrl, producer, {
      headers: this.httpHeaders()
    });
  }

  updateProducer(producer: Producer, producerId: number): Observable<Producer> {
    return this.http.put(this.hostUrl + '/' + producerId, producer, {
      headers: this.httpHeaders()
    });
  }

  removeProducer(producerId: number): Observable<Producer> {
    return this.http.delete(this.hostUrl + '/' + producerId, {
      headers: this.httpHeaders()
    });
  }

  private httpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.tokenStorageService.getToken());
    return headers;
  }
}
