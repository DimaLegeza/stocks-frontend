export interface StockModel {
  id?: number;
  name: string | null;
  lockVersion?: number;
  currentPrice: string | null;
  timestamp?: number;
}
