export interface ListOrderOptions {
  coinPair: string;
  orderType?: string;
  statusList?: number[];
  hasFills?: boolean;
  fromID?: number;
  toID?: number;
  fromTimestamp?: string;
  toTimestamp?: string;
}

export interface WithdrawCoinCryptos {
  coin: string;
  description?: string;
  address: string;
  quantity: string;
  txFee: string;
  destinationTag?: number;

}