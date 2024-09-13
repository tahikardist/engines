<script setup>
useHead({
  title: "Профиль",
});

definePageMeta({
  middleware: ["auth"],
});

let user = useUser();
</script>

<template>
  <ULandingHero :title="`Добро пожаловать, ${user.username}`" description="Вы вошли." />
</template>
