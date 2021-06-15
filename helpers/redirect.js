export const getRedirectPath = (userType) => {
  switch (userType) {
    case 'admin_retail':
      return '/admin-retail/dashboard'
    case 'admin_store':
      return '/admin-store/dashboard'
    default:
      return '/'
  }
}
