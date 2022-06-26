import { Router } from 'express'

export default (router: Router): void => {
  router.get('/url', (req, res) => { res.send() })
}
