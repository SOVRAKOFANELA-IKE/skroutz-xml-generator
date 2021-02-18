export const PORT = process.env.PORT || 4001
export const ENV = process.env.NODE_ENV || 'development'
export const DATABASE_URI = ENV === 'development' ? process.env.MONGO_DEV : process.env.MONGO_PROD
