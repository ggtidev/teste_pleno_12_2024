import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string = '';
  @Input('show-button') showButton: boolean = true;
  @Input('button-text') buttonText: string = '';
  @Input('button-link') buttonLink: string = '';
  @Input('button-class') buttonClass: string = '';
  @Input('quantidade-registros') quantidadeRegistros: number | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
