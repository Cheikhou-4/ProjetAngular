import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PolygonService } from './polygon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  stocks: any[] = [];
  loading = false;

  constructor(private polygon: PolygonService) {}

  loadData() {
    this.loading = true;
    this.polygon.getTickers(50).subscribe({
      next: (data: any) => {
        this.stocks = data.results || [];
        this.loading = false;
      },
      error: () => {
        this.stocks = [];
        this.loading = false;
      }
    });
  }
}
