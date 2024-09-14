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
    to: "/admin",
    tooltip: { text: "Дашборд" },
    exact: true,
  },
  {
    label: "Движки",
    icon: "i-heroicons-inbox",
    to: "/admin/engines",
    tooltip: { text: "Движки" },
    exact: true,
  },
];
</script>

<template>
  <UDashboardLayout class="mt-16 overflow-auto">
    <UDashboardPanel class="sticky top-0 w-[75px] lg:w-[300px]">
      <UDashboardSidebar class="w-[75px] lg:w-[300px]">
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>
    <div class="p-4 w-full">
      <NuxtPage />
    </div>
  </UDashboardLayout>
</template>
