import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<number[]>([]);
  data$ = this.dataSubject.asObservable();

  updateData(newData: number[]) {
    this.dataSubject.next(newData);
  }


}
