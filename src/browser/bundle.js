import { Rope, RopeApi } from '../index'

if (typeof window !== 'undefined' && window !== null) {
  window.Rope = window.Rope ? window.Rope : Rope
  window.RopeApi = window.RopeApi ? window.RopeApi : RopeApi
}
