import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyService } from '../services/currency.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [MatTableModule,NgIf],
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css'],
  providers: [CurrencyService],
})
export class HistoryTableComponent implements OnChanges {
  displayedColumns: string[] = ['date', 'to', 'from', 'amount', 'result'];
  dataSource: any[] = [];
  @Input() conversionHistory: any[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversionHistory']) {
      this.dataSource = this.sortByDate(this.conversionHistory);
    }
  }

  getData() {
    const history = this.currencyService.getItem<any[]>('conversionHistory');
    if (history) {
      this.dataSource = this.sortByDate(history);
    }
  }

  ngOnInit() {
    this.getData();
  }

  private sortByDate(data: any[]): any[] {
    return data.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort in descending order (most recent first)
    });
  }

  formatDate(dateString: string) {
    const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  }
}
