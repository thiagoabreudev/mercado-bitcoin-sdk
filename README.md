# mercado-bitcoin-sdk

[![npm version](https://img.shields.io/npm/v/mercado-bitcoin-sdk?style=plastic)](https://www.npmjs.com/package/mercado-bitcoin-sdk)
[![license GPL](https://img.shields.io/github/license/thiagoabreudev/mercado-bitcoin-sdk?style=plastic)](https://www.gnu.org/licenses/)


SDK para consumo da API de negociação do Mercado Bitcoin

## Instalação

```bash
npm i mercado-bitcoin-sdk
```
---

## Métodos : Parâmetros:

- listSystemMessages: `(level: string)`
- getAccountInfo: `()`
- getOrder: `(coinPair: string, orderID: number)`
- listOrders: `(options: ListOrderOptions)`
  - `coinPair: string`;
  - `orderType?: string;`
  - `statusList?: number[];`
  - `hasFills?: boolean;`
  - `fromID?: number;`
  - `toID?: number;`
  - `fromTimestamp?: string;`
  - `toTimestamp?: string;`
- listOrderbook: `(coinPair: string, full: boolean = false)`
- placeBuyOrder: `(coinPair: string, quantity: string, limitPrice: string)`
- placeSellOrder: `(coinPair: string, quantity: string, limitPrice: string)`
- placeMarketBuyOrder: `(coinPair: string, cost: string)`
- placeMarketSellOrder: `(coinPair: string, quantity: string)`
- cancelOrder: `(coinPair: string, orderID: string)`
- getWithdrawal: `(coinPair: string, withdrawalID: string)`
- withdrawCoinBRL: `(description: string, quantity: string, accountRef: string)`
- withdrawCoinCryptos: `(options: WithdrawCoinCryptos)`
  - `coin: string;`
  - `description?: string;`
  - `address: string;`
  - `quantity: string;`
  - `txFee: string;`
  - `destinationTag?: number;`
---
## Exemplos:

```js
  const { MercadoBitcoin } = require('mercado-bitcoin-sdk')
  // Obter estas chaves  no portal do MBC
  const mbc = new MercadoBitcoin('{{TAPI-ID}}', '{{TAPI-SECRET}}')

  // Exemplos:
  const messages = await mbc.listSystemMessages('INFO')
  const accountInfo = await mbc.getAccountInfo();
  const order = await mbc.getOrder('BRLBTC', 15795);
  const orders = await mbc.listOrders('BRLBTC') // Verificar parametros possiveis
  const orderbook = await mbc.listOrderbook('BRLBTC');
  const buyOrder = await mbc.placeBuyOrder('BRLBTC', '0.001', '1200.001');
  const sellOrder = await mbc.placeSellyOrder('BRLBTC', '0.001', '1200.001');
  const marketBuyOrder = await mbc.placeMarketBuyOrder('BRLBTC', '0.01');
  const marketSellOrder = await mbc.placeMarketSellOrder('BRLBTC', '0.01');
  const canceledOrder = await mbc.cancelOrder('BRLBTC', 123456);
  const withdrawal = await mbc.getWithdrawal('BRL', 1234567);
  const withdrawBRL = await mbc.withdrawCoinBRL('{{Sua descricao}}', '300.50', '{{id da conta bancaria}}');
  const withdrawCryptos = await mbc.withdrawCoinCryptos('{{descricao}}', '{{address}}', '{{quantity}}', '{{tx_fee}}');

  // Acesse https://www.mercadobitcoin.com.br/trade-api/ para detalhes da trade API
```
---
> Obs: A implementação foi baseada nos endpoints da trade API do mercado bitcoin.
>
> Para mais detalhes acesse: https://www.mercadobitcoin.com.br/trade-api/
>


