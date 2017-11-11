/* global window, navigator */
import { Kite } from 'kite.js'

export const ROPE_SERVER = window.ROPE_SERVER || 'https://secure.rope.live'
export const ROPE_DEBUG = window.ROPE_DEBUG || Kite.DebugLevel.INFO
export const ENVIRONMENT = 'Browser'
export const USERAGENT = navigator.userAgent
export const REGION = 'browser-region'
