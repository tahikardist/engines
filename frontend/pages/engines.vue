<script setup>
useHead({
  titleTemplate: "%s | Движки",
});

definePageMeta({
  middleware: ["auth"],
});

const links = [
  {
    label: "Дашборд",
    icon: "i-heroicons-home",
    to: "/engines",
    exact: true,
  },
  {
    label: "Движки",
    icon: "i-heroicons-inbox",
    to: "/engines/items",
    exact: true,
  },
];
</script>

<template>
  <UDashboardLayout class="mt-16 overflow-auto">
    <UDashboardPanel class="sticky top-0" collapsible>
      <UDashboardSidebar class="w-[300px]">
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>
    <div class="p-4 w-full">
      <NuxtPage />
    </div>
  </UDashboardLayout>
</template>
