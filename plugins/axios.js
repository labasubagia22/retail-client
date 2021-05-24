export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const token = store.state.user.current?.api_token
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })
}
