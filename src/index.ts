import 'dotenv/config'
import express from 'express'
import { PORT } from './config/constants'
import { router } from './routes'
import path from 'path'

const app = express()
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', router)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`)
})
