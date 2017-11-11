import os from 'os'
import { Kite, KiteApi } from 'kite.js'
import {
  ROPE_SERVER,
  ROPE_DEBUG,
  REGION,
  ENVIRONMENT,
  USERAGENT,
} from './constants'

export class RopeApi extends KiteApi {
  constructor(delegate, api) {
    super(delegate, {
      auth: false,
      methods: RopeApi.injectMethods(delegate, api),
    })
  }

  static DefaultSignature = 'Object, Function'

  static injectMethods(delegate, methods = {}) {
    const api = Object.keys(methods)
    const { signatures, docs } = RopeApi.getMeta(methods)

    methods['rope.identified'] = res => {
      if (res.environment) {
        delegate.environment = res.environment
      }
      delegate.emit('rope.identified', res)
      delegate.emit('rope.ready')
      delegate.logger.info(`Identified as ${res.id} now!`)
    }

    methods['rope.identify'] = (id, callback) => {
      const info = {
        api,
        docs,
        signatures,
        kiteInfo: delegate.getKiteInfo(),
      }

      if (USERAGENT) {
        info.useragent = USERAGENT
      }

      callback(null, info)
    }

    return methods
  }

  static getMeta(methods = {}) {
    let meta = {
      docs: {},
      signatures: {},
    }

    for (let name in methods) {
      let method = methods[name]
      if (method.docs) meta.docs[name] = method.docs
      meta.signatures[name] = method.args || RopeApi.DefaultSignature
    }

    return meta
  }
}

export class Rope extends Kite {
  static DefaultOptions = {
    url: ROPE_SERVER,
    logLevel: ROPE_DEBUG,
    transportClass: Kite.transport.SockJS,
    username: os.userInfo().username,
    environment: ENVIRONMENT,
    region: REGION,
    hostname: os.hostname(),
    autoConnect: true,
    autoReconnect: true,
  }

  constructor(name, api, options = {}) {
    options = Object.assign({}, Rope.DefaultOptions, options)
    options.name = name

    super(options)

    this.setApi(new RopeApi(this, api))
  }
}
