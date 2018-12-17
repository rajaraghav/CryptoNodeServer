export class WalletError extends Error {
    constructor (status, message, code) {
      super(message)
      this.status = status
      this.code = code
      this.message = message
      this.name = 'WalletError'
    }
  }
  