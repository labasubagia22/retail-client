export const getRedirectPath = (userType) => {
  switch (userType) {
    case 'admin_retail':
      return '/admin-retail'
    case 'admin_store':
      return '/admin-store'
    default:
      return '/'
  }
}
