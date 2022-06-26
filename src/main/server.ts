import './config/module-alias'
import { MongoConnection } from '@/infra/database/mongodb/helpers'

import 'dotenv/config'

MongoConnection.getInstance().connect(process.env.MONGO_URL!).then(async () => {
  const { app } = await import('@/main/config/app')
  app.listen(process.env.PORT, () => console.log(`Server is running at ${process.env.APP_URL!}`))
}).catch(console.error)
