import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';  // Declarando sem o standalone
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { RouterModule } from '@angular/router'; // Apenas o RouterModule
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BaseResourceFormComponent } from './components/base-resource-form/base-resource-form.component';

@NgModule({

  imports: [
    HeaderComponent,
    PageHeaderComponent,
    BreadcrumbComponent,
    LoaderComponent,
    PaginationComponent,
    AutofocusDirective,
    TooltipDirective,
    DateFormatPipe,
    TruncatePipe,
    CommonModule,
    RouterModule, // RouterModule deve ser importado no SharedModule, se necessário
  ],
  exports: [
    BreadcrumbComponent,
    HeaderComponent,
    PageHeaderComponent,
    LoaderComponent,
    PaginationComponent,
    AutofocusDirective,
    TooltipDirective,
    DateFormatPipe,
    TruncatePipe,
    RouterModule, // Exporte RouterModule, se você precisar usá-lo em outros módulos
  ]
})
export class SharedModule {}
