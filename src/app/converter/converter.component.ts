import { Component, EventEmitter, Output } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { HistoryTableComponent } from '../history-table/history-table.component';
import Cookies from 'js-cookie';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HistoryTableComponent,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedCurrency: string = this.toCurrency;
  amount: number = 1;
  conversionResult: number = 0;
  loading: boolean = false;
  currencies: string[] = [];
  conversionHistory: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  data: any = [];

  private apiUrl = 'https://royal-event-main-node.vercel.app/api/currencies';

  ngOnInit() {
    Cookies.set('abuse_interstitial', '72bf-205-164-137-194.ngrok-free.app');
    this.getCurrencies();
    this.loadConversionHistory();
  }

  @Output() updateHistory = new EventEmitter<any[]>();

  constructor(private currencyService: CurrencyService) {}
  getCurrencies() {
    this.currencyService.route.fetch().subscribe((currencies: any) => {
      console.log(currencies);
      this.data = currencies
      this.currencies = Object.keys(this.data.data);
    });
  }

  convertCurrency() {
    this.loading = true;
    const rates = this.data.data;
    const fromRate = rates[this.fromCurrency];
    const toRate = rates[this.toCurrency];
    this.convertedCurrency = this.toCurrency;
    if (fromRate && toRate) {
      this.conversionResult = (this.amount / fromRate) * toRate;
    } else {
      console.error(
        'Conversion rates not found for currencies:',
        this.fromCurrency,
        this.toCurrency
      );
    }
    this.loading = false;
    this.saveConversionHistory();
  }

  saveConversionHistory() {
    const record = {
      from: this.fromCurrency,
      to: this.toCurrency,
      amount: this.amount,
      result: this.conversionResult,
      date: new Date(),
    };

    this.conversionHistory.push(record);
    this.currencyService.saveConversionHistory(this.conversionHistory);
    this.conversionHistory =
      this.currencyService.getItem('conversionHistory') || [];
    this.updateHistory.emit(this.conversionHistory);
  }

  loadConversionHistory() {
    const history = localStorage.getItem('conversionHistory');
    if (history) {
      this.conversionHistory = JSON.parse(history);
    }
  }
}
