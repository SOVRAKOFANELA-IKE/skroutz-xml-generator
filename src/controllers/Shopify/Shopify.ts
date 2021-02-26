/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { randomByte } from '../../utils/randomByte'
import { date } from '../../utils/date'
import { getAllProducts } from '../../utils/getAllProducts'
import xml2js from 'xml2js'
import fs from 'fs'

export class ShopifyController {
  public async get(_req: Request<ParamsDictionary>, res: Response): Promise<void> {
    try {
      res.set('Content-Type', 'text/xml')

      const url = 'https://sovrakofanela.myshopify.com/products/'
      const products = await getAllProducts()
      const builder = new xml2js.Builder()

      const arr: any = {
        mywebstore: {
          created_at: date(),
          products: {
            product: [],
          },
        },
      }

      products.reduce((_i: any, product: any) => {
        const productSizes = product.variants
          .filter((obj: any) => {
            return obj.inventory_quantity > 0
          })
          .map((e: any) => {
            return e.option1
          })

        const filteredSizesArray = productSizes
          .filter((obj: any, index: any, arr: any) => {
            return arr.map((mapObj: any) => mapObj).indexOf(obj) === index
          })
          .join(', ')

        return arr.mywebstore.products.product.push({
          id: product?.id,
          name: product?.title,
          link: `${url}${product.handle}`,
          image: product?.image?.src || product?.images[0]?.src,
          price_with_vat: product?.variants[0].price,
          manufacturer: product?.vendor,
          mpn: `${product?.variants[0].sku}/${randomByte()}`,
          ean: product?.variants[0]?.barcode
            ? product?.variants[0]?.barcode
            : product?.variants[1]?.barcode,
          instock: product?.variants[0]?.inventory_quantity > 0 ? 'Y' : 'N',
          availability: 'Παράδοση 1 - 3 ημέρες',
          size: filteredSizesArray,
          color: product?.options[1]?.values?.join(', '),
          category: product?.product_type.includes('_')
            ? product?.product_type.replace('_', ' - ')
            : product?.product_type,
          weight: '20',
        })
      })

      const xmlResult = builder.buildObject(arr)

      fs.writeFile('src/public/products.xml', xmlResult, () => {})
      res.status(200).send(xmlResult)

      // res.json({ product: products[70], arr })
    } catch (error) {
      res.json({ error: JSON.stringify(error) })
    }
  }
}
