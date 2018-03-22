export interface StockModel {
  id?: number;
  name: string | null;
  lockVersion?: number;
  currentPrice: number | null;
  timestamp?: number;
}
