import { StockModel } from "./stock.model";

export interface PageModel {
  totalElements: number;
  content: StockModel[]
}
