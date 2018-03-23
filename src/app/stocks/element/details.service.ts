import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StockModel } from '../objects/stock.model';

@Injectable()
export class DetailsService {

  constructor(private httpClient: HttpClient) {}

  public getStock(id: number): Observable<StockModel> {
    const href = `/api/stocks/${id}`;
    return this.httpClient.get<StockModel>(href);
  }

  public save(name: string, price: string): Observable<StockModel> {
    const model: StockModel = {
      name: name,
      currentPrice: price
    };
    const href = '/api/stocks';
    return this.httpClient.post<StockModel>(href, model);
  }

  public update(name: string, price: string, oldStock: StockModel): Observable<StockModel> {
    const model: StockModel = {
      id: oldStock.id,
      name: name,
      currentPrice: price,
      lockVersion: oldStock.lockVersion,
      timestamp: oldStock.timestamp
    };
    const href = `/api/stocks/${model.id}`;
    return this.httpClient.put<StockModel>(href, model);
  }

}
