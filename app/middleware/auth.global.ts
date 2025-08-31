export default defineNuxtRouteMiddleware((to) => {
  // Get the auth_token cookie
  const authToken = useCookie('auth_token')

  // Define auth routes that don't require authentication
  const authRoutes = ['/auth/login']
  
  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.includes(to.path)

  // If user has auth_token and is trying to access auth routes, redirect to dashboard
  if (authToken.value && isAuthRoute) {
    return navigateTo('/dashboard')
  }

  // If user doesn't have auth_token and is not on an auth route, redirect to login
  if (!authToken.value && !isAuthRoute) {
    return navigateTo('/auth/login')
  }
})