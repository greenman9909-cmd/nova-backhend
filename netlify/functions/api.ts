import { handle } from 'hono/netlify'
import { app } from '../../src/index'

export const handler = handle(app)
