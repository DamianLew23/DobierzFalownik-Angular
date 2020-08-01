import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Series} from '../../shared/models/series.model';
import {NewSeriesRequest} from '../../shared/models/new-series-request.model';
import {TokenStorageService} from '../authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  hostUrl = 'http://localhost:8080/api/series';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getSeriesByProducerId(producerId: number): Observable<Series[]> {
    return this.http.get<Series[]>(this.hostUrl, {
      params: new HttpParams().set('producerId', producerId.toString()),
      headers: this.httpHeaders()
    });
  }

  addSeries(addSeriesRequest: NewSeriesRequest): Observable<Series> {
    return this.http.post(this.hostUrl, addSeriesRequest, {
      headers: this.httpHeaders()
    });
  }

  deleteSeries(seriesId: number): Observable<void> {
    return this.http.delete<void>(this.hostUrl + '/' + seriesId, {
      headers: this.httpHeaders()
    });
  }

  private httpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.tokenStorageService.getToken());
    return headers;
  }
}
