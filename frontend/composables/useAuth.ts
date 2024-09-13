export type User = {
  id: number;
  username: string;
  password: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export const useUser = <T = User>() => {
  return useState<T | undefined | null>("user", () => undefined);
};

export const useAuth = <T = User>() => {
  const router = useRouter();
  let { apiUrl } = useRuntimeConfig().public;
  const user = useUser<T>();

  const isLoggedIn = computed(() => !!user.value);

  async function refresh(token?: string) {
    try {
      user.value = await fetchCurrentUser(token);
    } catch {
      user.value = null;
    }
  }

  async function login(credentials: LoginCredentials) {
    if (isLoggedIn.value) return;

    let res = await $fetch(apiUrl + "/auth/login", {
      method: "post",
      body: credentials,
    });

    let token = useCookie("token");
    token.value = res?.access_token as string;

    await refresh(token.value);
    window.location.href = "/";
  }

  async function logout() {
    if (!isLoggedIn.value) return;

    let token = useCookie("token");
    token.value = null;
    user.value = null;

    window.location.href = "/login";
  }

  return {
    user,
    isLoggedIn,

    login,
    logout,
    refresh,
  };
};

export const fetchCurrentUser = async <T = User>(initialToken?: string) => {
  let { apiUrl } = useRuntimeConfig().public;
  let token = useCookie("token", { default: () => initialToken });

  try {
    return await $fetch<T>(apiUrl + "/current-user", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};
