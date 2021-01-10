import axios from 'axios';
import qs from 'querystring';
import crypto from 'crypto';

import { ListOrderOptions, WithdrawCoinCryptos } from './options.interface'
import { parserAttr } from './parser';


const API_HOST = `https://www.mercadobitcoin.net`
const API_PATH = '/tapi/v3/'

export default class Api {
  tapiID!: string;
  tapiSecret!: string;

  constructor(tapiID: string, tapiSecret: string) {
    this.tapiID = tapiID;
    this.tapiSecret = tapiSecret;
  }

  getHash(uri: string): string {
    const hash = crypto
      .createHmac('sha512', this.tapiSecret)
      .update(uri)
      .digest('hex')
    return hash
  }

  getHeaders(tapiMAC: string) {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'TAPI-ID': this.tapiID,
      'TAPI-MAC': tapiMAC
    }
  }

  getURI(params: any = {}): string {
    return `${API_PATH}?${qs.stringify(params)}`
  }

  getTapiNonce() {
    return Math.round(new Date().getTime() / 1000);
  }

  async listSystemMessages(level: string) {
    return await this.makeRequest({ 'tapi_method': 'list_system_messages', level })
  }

  async getAccountInfo() {
    return await this.makeRequest({ 'tapi_method': 'get_account_info' })
  }

  async getOrder(coinPair: string, orderID: number) {
    return await this.makeRequest(
      {
        'tapi_method': 'get_order',
        coin_pair: coinPair,
        order_id: orderID
      }
    )
  }

  async listOrders(options: ListOrderOptions) {
    return await this.makeRequest(
      {
        'tapi_method': 'list_orders',
        ...parserAttr(options)
      }
    )
  }

  async listOrderbook(coinPair: string, full: boolean = false) {
    return await this.makeRequest(
      {
        'tapi_method': 'list_orderbook',
        ...parserAttr({ coinPair, full })
      }
    )
  }

  async placeBuyOrder(coinPair: string, quantity: string, limitPrice: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'place_buy_order',
        ...parserAttr({ coinPair, quantity, limitPrice })
      }
    )
  }

  async placeSellOrder(coinPair: string, quantity: string, limitPrice: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'place_sell_order',
        ...parserAttr({ coinPair, quantity, limitPrice })
      }
    )
  }

  async placeMarketBuyOrder(coinPair: string, cost: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'place_market_buy_order',
        ...parserAttr({ coinPair, cost })
      }
    )
  }

  async placeMarketSellOrder(coinPair: string, quantity: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'place_market_sell_order',
        ...parserAttr({ coinPair, quantity })
      }
    )
  }

  async cancelOrder(coinPair: string, orderID: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'cancel_order',
        ...parserAttr({ coinPair, orderID })
      }
    )
  }

  async getWithdrawal(coinPair: string, withdrawalID: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'get_withdrawal',
        ...parserAttr({ coinPair, withdrawalID })
      }
    )
  }

  async withdrawCoinBRL(description: string, quantity: string, accountRef: string) {
    return await this.makeRequest(
      {
        'tapi_method': 'withdraw_coin',
        ...parserAttr({ coin: 'BRL', description, quantity, accountRef })
      }
    )
  }

  async withdrawCoinCryptos(options: WithdrawCoinCryptos) {
    return await this.makeRequest(
      {
        'tapi_method': 'withdraw_coin',
        ...parserAttr(options)
      }
    )
  }

  async makeRequest(params: any = {}) {
    try {
      params = Object.assign(params, { tapi_nonce: this.getTapiNonce() })
      const uri = this.getURI(params);
      const url = API_HOST + API_PATH
      const tapiMAC = this.getHash(uri);
      const { data } = await axios.post(url, qs.stringify(params), { headers: this.getHeaders(tapiMAC) })
      return data
    } catch (error: any) {
      if (error.isAxiosError) {
        return error.response
      }
      return error
    }
  }
}