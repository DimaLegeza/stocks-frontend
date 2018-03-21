import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ListService } from './list.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'stock-list',
  templateUrl: './list.component.html',
  providers: [
    ListService
  ]
})
export class ListComponent implements OnInit {
  public isLoadingResults = true;
  public resultsLength: number;
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['id', 'name', 'currentPrice', 'timestamp', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.sort.active) {
            return this.listService.loadStockPageWithSort(this.sort.active, this.sort.direction, this.paginator.pageIndex);
          } else {
            return this.listService.loadStockPage(this.paginator.pageIndex);
          }
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
}
