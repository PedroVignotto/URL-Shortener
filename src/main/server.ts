import './config/module-alias'
import { app } from '@/main/config/app'

import 'dotenv/config'

app.listen(process.env.PORT, () => console.log(`Server is running at ${process.env.APP_URL!}`))
