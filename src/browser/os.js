/* global window, navigator */

const os = {
  totalmem: () => 0,
  freemem: () => 0,
  platform: () => navigator.platform,
  homedir: () => '/browser',
  type: () => 'Browser',
  userInfo: () => {
    return { username: 'anonymous' }
  },
  hostname: () => window.location.href,
}

export default os
