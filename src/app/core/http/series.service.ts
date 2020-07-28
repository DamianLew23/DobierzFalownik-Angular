import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Series} from '../../shared/models/series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  hostUrl = 'http://localhost:8080/api/series';

  constructor(private http: HttpClient) { }

  getSeriesByProducerId(producerId: number): Observable<Series[]> {
    return this.http.get<Series[]>(this.hostUrl, {
      params: new HttpParams().set('producerId', producerId.toString())
    });
  }
}
