import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConverterComponent } from "./converter/converter.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle"

import {MatTableModule} from '@angular/material/table'
import { HistoryTableComponent } from "./history-table/history-table.component";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConverterComponent,MatSlideToggleModule, MatTableModule, HistoryTableComponent,  NgbModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'currency-converter';
}
