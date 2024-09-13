import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const user = useUser();
  if (user.value !== undefined) return;
  user.value = await fetchCurrentUser();
});
