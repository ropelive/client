import os from 'os'
import { Kite } from 'kite.js'

export const ROPE_SERVER = process.env.ROPE_SERVER || 'https://secure.rope.live'
export const ROPE_DEBUG = process.env.ROPE_DEBUG || Kite.DebugLevel.DEBUG
export const ENVIRONMENT = `Node.js ${process.version} on ${os.type()}`
export const REGION = 'node-region'
