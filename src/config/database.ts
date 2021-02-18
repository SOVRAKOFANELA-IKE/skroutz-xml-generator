import { ConnectionOptions, connect } from 'mongoose'
import { DATABASE_URI } from './constants'

const connectDB = async (): Promise<void> => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
    await connect(DATABASE_URI || 'mongodb://localhost:27017/test', options)
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected...')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
