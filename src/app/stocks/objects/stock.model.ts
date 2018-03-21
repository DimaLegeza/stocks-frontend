export interface StockModel {
  id?: number;
  name: string;
  lockVersion?: number;
  currentPrice: number;
  timestamp: number;
}
