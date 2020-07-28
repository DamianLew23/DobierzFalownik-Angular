import {DataSource} from '@angular/cdk/collections';
import {Inverter} from '../../shared/models/inverter.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {InverterService} from '../http/inverter.service';
import {InverterFilterCriteria} from '../../shared/models/inverter-filter-criteria.model';
import {catchError, finalize, map, tap} from 'rxjs/operators';

export class InverterDataSource implements DataSource<Inverter>{

  private inverterSubject = new BehaviorSubject<Inverter[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private invertersCountSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public invertersCount$ =  this.invertersCountSubject.asObservable();

  constructor(private inverterService: InverterService) {}

  loadInverters(
    invertersFilterCriteria?: InverterFilterCriteria,
    pageNumber?: number,
    pageSize?: number,
    sort?: string
  ): void {
    this.loadingSubject.next(true);
    this.inverterService
    .getInvertersPage(invertersFilterCriteria, pageNumber, pageSize, sort)
    .pipe(tap((res) => this.invertersCountSubject.next(res['totalElements'])))
    .pipe(map((res) => res['content']))
    .pipe(
      catchError(() => of([])),
    finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((inverters) => this.inverterSubject.next(inverters));
  }

  connect(): Observable<Inverter[]> {
    return this.inverterSubject.asObservable();
  }

  disconnect(): void {
    this.inverterSubject.complete();
    this.loadingSubject.complete();
    this.invertersCountSubject.complete();
  }


}
