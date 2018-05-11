// @flow

import sodium from 'sodium-universal'
import type { Readable } from 'stream'

export const hash = (
  input: Buffer,
  size: number = sodium.crypto_generichash_BYTES_MIN,
  key?: Buffer,
): Buffer => {
  const output = Buffer.allocUnsafe(size)
  sodium.crypto_generichash(output, input, key)
  return output
}

export const hashStream = (
  stream: Readable,
  size: number = 32,
): Promise<Buffer> => {
  const instance = sodium.crypto_generichash_instance(null, size)
  return new Promise((resolve, reject) => {
    stream
      .on('data', chunk => {
        instance.update(chunk)
      })
      .on('error', reject)
      .on('end', () => {
        const output = Buffer.allocUnsafe(size)
        instance.final(output)
        resolve(output)
      })
  })
}
