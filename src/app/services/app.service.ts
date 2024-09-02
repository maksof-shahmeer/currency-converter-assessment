import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(protected http: HttpClient) {}

  protected get<T>(url: string) {
    return this.http.get<T>(url);
  }
}
