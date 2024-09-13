<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

let { isLoggedIn, user, logout } = useAuth();

const items = [
  [
    {
      user,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Профиль",
      to: "/profile",
      icon: "i-heroicons-user",
    },
  ],
  [
    {
      label: "Выйти",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: logout,
    },
  ],
];

const links = computed(() =>
  !isLoggedIn.value
    ? [
        {
          label: "Войти",
          icon: "i-heroicons-user",
          to: "/login",
        },
      ]
    : [
        {
          label: "Движки",
          to: "/engines",
        },
      ]
);
</script>

<template>
  <UHeader :ui="{ container: '!max-w-full' }" :links>
    <template #logo>
      <span>Движки</span>
    </template>

    <template #center>
      <div></div>
    </template>

    <template #right>
      <UHeaderLinks class="hidden lg:flex mr-4" :links />
      <UDropdown
        v-if="isLoggedIn"
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account="{ item }">
          <div class="text-left">
            <p>
              Вы вошли как
              {{ item.user.value.username }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdown>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links />
    </template>
  </UHeader>
</template>
