export interface Pair {
  lastPrice: number;
  name: string;
  tradeAmountDecimals: number;
  priceDecimals: number;
  maxVariationRatio: string;
  minCost: string;
  high24: string;
  low24: string;
  vol24: string;
  vol24Base: string;
  change24Percentage: number;
  lastWeekPrices: number[];
  localeName: string;
  zones: { id: string; label: string; name: string }[];
  imageUrl: string;
  active: boolean;
}
