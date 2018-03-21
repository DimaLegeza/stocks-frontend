import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { PageModel } from "../objects/page.model";

@Injectable()
export class ListService {

  constructor(private httpClient: HttpClient) {}

  public loadStockPageWithSort(sort: string, order: string, page: number): Observable<PageModel> {
    const href = '/api/stocks';
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${page}&size=10`;
    return this.httpClient.get<PageModel>(requestUrl);
  }

  public loadStockPage(page: number): Observable<PageModel> {
    const href = '/api/stocks';
    const requestUrl = `${href}?page=${page}&size=10`;
    return this.httpClient.get<PageModel>(requestUrl);
  }

}
