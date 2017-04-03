import { Routes } from '@angular/router';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent} from './components/register';
import { NoContentComponent } from './components/no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
];

//, resolve: { data: DataResolver }