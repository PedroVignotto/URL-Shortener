import { expressRouterAdapter as adapt, expressRedirectRouterAdapter as adaptRedirect } from '@/main/adapters'
import { makeAddShortenURLController, makeRedirectToOriginalURLController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/url', adapt(makeAddShortenURLController()))
  router.get('/:code', adaptRedirect(makeRedirectToOriginalURLController()))
}
