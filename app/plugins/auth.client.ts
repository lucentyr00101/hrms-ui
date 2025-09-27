export default defineNuxtPlugin(() => {
  const { initializeUser } = useUser();
  
  // Initialize user from stored auth token
  initializeUser();
});