import { Routes } from '@angular/router';
import { MeteoComponent } from './meteo/meteo';
import { AboutComponent } from './about/about';

export const routes: Routes = [
	{ path: '', component: MeteoComponent },
	{ path: 'about', component: AboutComponent }
];
