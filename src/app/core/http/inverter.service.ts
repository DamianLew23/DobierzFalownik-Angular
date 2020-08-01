import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvertersPage} from '../../shared/models/inverters-page.model';
import {InverterFilterCriteria} from '../../shared/models/inverter-filter-criteria.model';
import {Inverter} from '../../shared/models/inverter.model';
import {TokenStorageService} from '../authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InverterService {
  hostUrl = 'http://localhost:8080/api/inverters';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }


  private static filterInverters(inverterFilterCriteria: InverterFilterCriteria): HttpParams {
    let params = new HttpParams();
    if (inverterFilterCriteria != null) {
      params =
        inverterFilterCriteria.producerSlug == null
          ? params.delete('producer')
          : params.append('producer', inverterFilterCriteria.producerSlug);
      params =
        inverterFilterCriteria.seriesSlug == null
          ? params.delete('series')
          : params.append('series', inverterFilterCriteria.seriesSlug);
      params =
        inverterFilterCriteria.supplyVoltageSymbolSlug == null
          ? params.delete('supplyVoltage')
          : params.append('supplyVoltage', inverterFilterCriteria.supplyVoltageSymbolSlug);
      params =
        inverterFilterCriteria.outputVoltageSymbolSlug == null
          ? params.delete('outputVoltage')
          : params.append('outputVoltage', inverterFilterCriteria.outputVoltageSymbolSlug);
      params =
        inverterFilterCriteria.currentMin == null
          ? params.delete('currentMin')
          : params.append('currentMin', inverterFilterCriteria.currentMin.toString());
      params =
        inverterFilterCriteria.currentMax == null
          ? params.delete('currentMax')
          : params.append('currentMax', inverterFilterCriteria.currentMax.toString());
      params =
        inverterFilterCriteria.powerMin == null
          ? params.delete('powerMin')
          : params.append('powerMin', inverterFilterCriteria.powerMin.toString());
      params =
        inverterFilterCriteria.powerMax == null
          ? params.delete('powerMax')
          : params.append('powerMax', inverterFilterCriteria.powerMax.toString());
    }
    return params;
  }

  getInvertersPage(
    filterCriteria: InverterFilterCriteria,
    pageNumber = 0,
    pageSize = 20,
    sort = 'id,asc'
  ): Observable<InvertersPage> {
    const filterParams = InverterService.filterInverters(filterCriteria);
    return this.http.get<InvertersPage>(this.hostUrl, {
      params: filterParams
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString())
        .set('sort', sort)
    });
  }

  addInverter(inverter: Inverter): Observable<Inverter> {
    return this.http.post(this.hostUrl, inverter, {
      headers: this.httpHeaders()
    });
  }

  updateInverter(inverter: Inverter, inverterId: number): Observable<Inverter> {
    return this.http.put(this.hostUrl + '/' + inverterId, inverter, {
      headers: this.httpHeaders()
    });
  }

  removeInverter(inverterId: number): Observable<Inverter> {
    return this.http.delete(this.hostUrl + '/' + inverterId);
  }

  private httpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.tokenStorageService.getToken());
    return headers;
  }

}
