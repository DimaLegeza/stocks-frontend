import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, Validators } from '@angular/forms';
import { StockModel } from '../objects/stock.model';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { DetailsService } from './details.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stock-details',
  templateUrl: './details.component.html',
  providers: [
    DetailsService
  ]
})
export class DetailsComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private queryParamsSub: Subscription;
  public existingStock: StockModel;
  private editParam?: string;
  public id?: number;
  public debugOpened = false;
  public nameFormControl = new FormControl('', [ Validators.required ]);
  public priceFormControl = new FormControl('', [ Validators.required, Validators.pattern('[0-9]*\\.?[0-9]+') ]);

  constructor(private route: ActivatedRoute,
              private detailsService: DetailsService,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .pipe(
        switchMap(params => {
          const id = params['id'];
          return forkJoin(
            of(id),
            id
              ? this.detailsService.getStock(id)
              : of({name: null, currentPrice: null})
          );
        })
      )
      .subscribe(([id, stock]) => {
        this.id = id;
        this.existingStock = stock;
        this.resetForm();
      });

    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      this.editParam = params['edit'];
      if (!this.isEdit()) {
        this.resetForm();
      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }

  public isEdit(): boolean {
    return this.id && this.editParam && this.editParam === 'true';
  }

  public isNew(): boolean {
    return !this.id && !this.isEdit();
  }

  public saveStock(update: boolean) {
    (update
      ? this.detailsService.update(this.nameFormControl.value, this.priceFormControl.value, this.existingStock)
      : this.detailsService.save(this.nameFormControl.value, this.priceFormControl.value)
    )
      .subscribe(stock => {
          this.existingStock = stock;
          this.snackBar.open('Stock successfully saved', 'Close', {
            duration: 2000
          });
          this.router.navigate(['/stocks/' + stock.id]);
        }
      );
  }

  public openDebugInfo() {
    this.debugOpened = !this.debugOpened;
  }

  private resetForm() {
    if (this.existingStock) {
      this.nameFormControl.setValue(this.existingStock.name);
      this.priceFormControl.setValue(this.existingStock.currentPrice);
    }
  }
}
