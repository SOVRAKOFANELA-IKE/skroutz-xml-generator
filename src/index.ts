/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'
import express from 'express'
import { PORT } from './config/constants'
import { router } from './routes'
import path from 'path'
import cron from 'node-cron'
import fs from 'fs'
import xml2js from 'xml2js'
import { getAllProducts } from './utils/getAllProducts'
import { date } from './utils/date'
import { randomByte } from './utils/randomByte'

const app = express()
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', router)

cron.schedule('*/45 * * * *', async () => {
  try {
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
        size: product?.options[0]?.values?.join(', '),
        color: product?.options[1]?.values?.join(', '),
        category: product?.product_type.includes('_')
          ? product?.product_type.replace('_', ' - ')
          : product?.product_type,
      })
    })

    const xmlResult = builder.buildObject(arr)

    fs.writeFile('src/public/products.xml', xmlResult, () => {})
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`)
})
