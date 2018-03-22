import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PageModel } from '../objects/page.model';

@Injectable()
export class ListService {

  constructor(private httpClient: HttpClient) {}

  public loadStockPage(page: number, sort: string | null, order: string | null, filter: string | null): Observable<PageModel> {
    const href = '/api/stocks';
    let requestUrl = `${href}?page=${page}&size=10`;
    if (sort) {
      requestUrl += `&sort=${sort},${order}`;
    }
    if (filter) {
      requestUrl += `&q=name:${filter}`;
    }
    return this.httpClient.get<PageModel>(requestUrl);
  }

}
