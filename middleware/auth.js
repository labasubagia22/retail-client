export default ({ store, redirect }) => {
  store.dispatch('user/loadCurrent')

  if (!store.state.user.current) {
    return redirect('/login')
  }
}
