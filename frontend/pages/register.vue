<script setup lang="ts">
import type { FormError } from "#ui/types";

useHead({
  title: "Авторизация",
});

definePageMeta({
  middleware: ["guest"],
});

let { register } = useAuth();

let error = ref("");

const fields = [
  {
    name: "username",
    type: "text",
    label: "Логин",
    placeholder: "Введите логин",
  },
  {
    name: "password",
    label: "Придумайте пароль",
    type: "password",
    placeholder: "Введите пароль",
  },
  {
    name: "password_confirmation",
    label: "Подтвердите пароль",
    type: "password",
    placeholder: "Подтвердите пароль",
  },
];

const validate = (state: any) => {
  const errors: FormError[] = [];
  if (!state.username) errors.push({ path: "username", message: "Это поле обязательно для заполнения." });
  if (!state.password) errors.push({ path: "password", message: "Это поле обязательно для заполнения." });
  if (!state.password_confirmation) errors.push({ path: "password_confirmation", message: "Это поле обязательно для заполнения." });
  if (state.password !== state.password_confirmation) errors.push({ path: "password_confirmation", message: "Пароли должны совпадать." });
  return errors;
};

async function onSubmit(data: any) {
  try {
    await register(data);
  } catch (err) {
    error.value = err.response._data.message;
  }
}
</script>

<template>
  <div class="flex justify-center py-8">
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        title="Регистрация"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
      >
        <template #validation>
          <UAlert v-if="error" color="red" icon="i-heroicons-information-circle-20-solid" :title="error" />
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>
