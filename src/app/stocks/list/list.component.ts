import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ListService } from './list.service';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-stock-list',
  templateUrl: './list.component.html',
  providers: [
    ListService
  ]
})
export class ListComponent implements OnInit, OnDestroy {
  private sortSub: Subscription;
  private filterSub: Subscription;
  private filterValueChange: EventEmitter<string> = new EventEmitter();
  private filterValue: string;
  public isLoadingResults = true;
  public resultsLength: number;
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['id', 'name', 'currentPrice', 'timestamp', 'edit'];
  public filterKeyUp = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.sortSub = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.filterSub = this.filterKeyUp.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterValue = value;
      this.filterValueChange.emit(value);
    });


    merge(this.sort.sortChange, this.paginator.page, this.filterValueChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.listService.
                loadStockPage(this.paginator.pageIndex, this.sort.active, this.sort.direction, this.filterValue);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy() {
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
    if (this.sortSub) {
      this.sortSub.unsubscribe();
    }
  }

}
