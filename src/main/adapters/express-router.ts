import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const expressRouterAdapter: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body })
  const json = [200, 201].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}

export const expressRedirectRouterAdapter: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.params })

  if (statusCode === 200) res.redirect(data)
}
