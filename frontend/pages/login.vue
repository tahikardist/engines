<script setup lang="ts">
import type { FormError } from "#ui/types";

useHead({
  title: "Авторизация",
});

definePageMeta({
  middleware: ["guest"],
});

let { login } = useAuth();

let error = ref(false);

const fields = [
  {
    name: "username",
    type: "text",
    label: "Логин",
    placeholder: "Введите ваш логин",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "Введите ваш пароль",
  },
];

const validate = (state: any) => {
  const errors: FormError[] = [];
  if (!state.username) errors.push({ path: "username", message: "Это поле обязательно для заполнения." });
  if (!state.password) errors.push({ path: "password", message: "Это поле обязательно для заполнения." });
  return errors;
};

async function onSubmit(data: any) {
  try {
    await login(data);
  } catch (err) {
    error.value = true;
  }
}
</script>

<template>
  <div class="flex justify-center py-8">
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        title="Авторизация"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
      >
        <template #password-hint>
          <NuxtLink to="/" class="text-primary font-medium">Забыли пароль?</NuxtLink>
        </template>
        <template #validation>
          <UAlert v-if="error" color="red" icon="i-heroicons-information-circle-20-solid" title="Неверно введен логин или пароль" />
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>
