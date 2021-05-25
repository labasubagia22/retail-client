export default ({ store, redirect }) => {
  if (store.state.user.current.type !== 'admin_store') {
    return redirect('/')
  }
}
