import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ListService } from "./list.service";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

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
  public displayedColumns = ['id', 'name', 'currentPrice', 'lastUpdated'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private listService: ListService) {}

  ngOnInit() {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.listService.loadStockPage(this.paginator.pageIndex);
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

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.listService.loadStockPage(this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.resultsLength = data.totalElements;
    //
    //       return data.content;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       return of([]);
    //     })
    //   ).subscribe(data => this.dataSource.data = data);
  }
}
