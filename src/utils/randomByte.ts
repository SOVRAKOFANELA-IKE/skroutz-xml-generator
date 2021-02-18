import crypto from 'crypto'

export const randomByte = (): string => {
  return crypto.randomBytes(2).toString('hex')
}
