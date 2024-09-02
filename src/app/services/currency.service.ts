import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends AppService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  private conversionHistorySubject = new BehaviorSubject<any[]>(this.getItem('conversionHistory') || []);


  route = {
    fetch: () => {
      return this.get<any>(environment.apiUrl);
    }
  }
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  setItem<T>(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    this.conversionHistorySubject.next(value);
  }

  getConversionHistoryObservable() {
    return this.conversionHistorySubject.asObservable();
  }
  
  // Use this method to update local storage and notify subscribers
  saveConversionHistory(conversionHistory: any[]) {
    this.setItem('conversionHistory', conversionHistory);
  }

  
}
