import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddShortenURLController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/url', adapt(makeAddShortenURLController()))
}
