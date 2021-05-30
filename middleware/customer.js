export default ({ store, redirect }) => {
  if (store.state.user.current.type !== 'customer') {
    return redirect('/')
  }
}
