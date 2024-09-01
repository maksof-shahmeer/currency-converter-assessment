import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { HistoryTableComponent } from './history-table/history-table.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'table', component: HistoryTableComponent },
    { path: 'convert', component: ConverterComponent },
];
