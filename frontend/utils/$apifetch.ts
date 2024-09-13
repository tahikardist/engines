import { $fetch } from "ofetch";

export const $apifetch = $fetch.create({
  async onRequest({ options }) {
    const { apiUrl } = useRuntimeConfig().public;
    let token = useCookie("token").value;

    let headers: any = {
      accept: "application/json",
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    options.headers = headers;
    options.baseURL = apiUrl;
  },
  async onResponseError({ response }) {
    const status = response.status;
    if ([500].includes(status)) {
      console.error("[Server Error]", response.statusText, response._data);
    }
  },
});
