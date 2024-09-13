export default defineNuxtRouteMiddleware((to, from) => {
  let { isLoggedIn } = useAuth();

  if (isLoggedIn.value) {
    return navigateTo("/");
  }
});
