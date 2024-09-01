import { Component } from '@angular/core';
import { HistoryTableComponent } from "../history-table/history-table.component";
import { ConverterComponent } from "../converter/converter.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HistoryTableComponent, ConverterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  conversionHistory: any[] = [];

  updateConversionHistory(newHistory: any) {
    this.conversionHistory = newHistory;
  }

}
