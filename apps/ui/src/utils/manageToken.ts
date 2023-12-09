import Cookies from 'js-cookie'

export const manageToken = {
  key: 'token',

  set(token: string) {
    return Cookies.set(this.key, token)
  },
  get() {
    return Cookies.get(this.key)
  },
  remove() {
    return Cookies.remove(this.key)
  },
}
