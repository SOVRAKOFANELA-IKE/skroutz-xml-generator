import express, { Request, Response } from 'express'
import { shopifyController } from '../../controllers'

export const router = express.Router({
  strict: true,
})

router.get('/', (req: Request, res: Response) => {
  shopifyController.get(req, res)
})
