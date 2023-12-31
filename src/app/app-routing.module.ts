import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginComponent } from './pages/login/login.component';
import { JoinComponent } from './pages/join/join.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'catalogo/:idCategoria', component: CatalogoComponent },
  { path: 'catalogo/:idCategoria/:idSubcategoria', component: CatalogoComponent },
  { path: 'catalogo/:idCategoria/:idSubcategoria/:idProdotto', component: CatalogoComponent },
  { path: 'catalogo/:idCategoria/:idSubcategoria/:idProdotto/:idItem', component: CatalogoComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
