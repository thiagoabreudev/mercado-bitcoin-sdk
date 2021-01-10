import Api from './api'

export default (tapiID: string, tapiSecret: string) => new Api(tapiID, tapiSecret)