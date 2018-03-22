import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StocksRoutingModule } from './stocks-routing.module';
import { DetailsComponent } from './element/details.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StockMaterialModule } from './stock-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent
  ],
  imports: [
    StocksRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StockMaterialModule
  ],
  providers: []
})
export class StocksModule { }
