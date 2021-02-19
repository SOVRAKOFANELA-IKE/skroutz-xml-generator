/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

export const getAllProducts = async (): Promise<any> => {
  try {
    axios.defaults.headers.get['X-Shopify-Access-Token'] = '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'

    const products = []
    let sinceid = ''
    let breakLoop = false

    while (!breakLoop) {
      const results: any = await axios.get(
        'https://sovrakofanela.myshopify.com/admin/api/2021-01/products.json',
        {
          params: {
            limit: 250,
            status: 'active',
            since_id: sinceid,
          },
        }
      )
      const productLength = results.data.products.length - 1
      if (results.data.products[productLength]?.id) {
        sinceid = results.data.products[productLength].id
        for (let i = 0; i < productLength; i++) {
          products.push(results.data.products[i])
        }
      } else {
        breakLoop = true
        break
      }
    }
    console.log(products.length)

    return products
  } catch (error) {
    console.log(error)
  }
}