import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeteoComponent } from './meteo/meteo';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MeteoComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-meteo');
}
