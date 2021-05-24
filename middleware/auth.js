export default ({ store, redirect }) => {
  store.dispatch('user/loadCurrent')

  if (!store.state.user.current) {
    return redirect('/login')
  }

  if (store.state.user.current.type === 'admin_retail') {
    return redirect('/admin-retail')
  }
}
