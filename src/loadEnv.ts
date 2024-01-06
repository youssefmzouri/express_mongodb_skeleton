import { config } from 'dotenv'

const envPath = process.env.TS_NODE_DEV === 'true' ? '.env.dev' : '.env'
config({ path: envPath })

export { }
