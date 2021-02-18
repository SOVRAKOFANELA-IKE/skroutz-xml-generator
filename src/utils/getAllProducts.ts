/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

export const getAllProducts = async (sinceid: string | null): Promise<any> => {
  try {
    axios.defaults.headers.get['X-Shopify-Access-Token'] = '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'

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

    return results.data.products
  } catch (error) {
    console.log(error)
  }
}
