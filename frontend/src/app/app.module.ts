import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importando RouterModule
import { SharedModule } from './shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app.routes'; // Supondo que suas rotas estejam em app.routes.ts

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(appRoutes), // Configuração das rotas
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatBadgeModule,
    BrowserAnimationsModule, // necessário para animações do toastr
    ToastrModule.forRoot({
      timeOut: 3000, // duração da notificação
      positionClass: 'toast-top-right', // posição da notificação
      preventDuplicates: true, // previne notificações duplicadas
      progressBar: true, // barra de progresso
      progressAnimation: 'increasing', // animação da barra de progresso
    }),
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
})
export class AppModule { }

