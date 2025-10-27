export function authGuard(to, from, next) {
  const user = localStorage.getItem('user') // or token, depending on how you store it

  if (user) {
    next() // allow navigation
  } else {
    next('/login') // redirect to login
  }
}
