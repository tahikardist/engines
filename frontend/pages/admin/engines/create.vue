<script setup lang="ts">
useHead({
  title: "Добавление объекта",
});

async function submit(data) {
  await $apifetch("/engines", {
    method: "post",
    body: {
      title: data.title,
      description: data.description,
      img: data.img,
      link: data.link,
      engineTypeId: data.engineTypeId,
    },
  });

  await refreshNuxtData("engines");
  await navigateTo("/admin/engines");
}
</script>

<template>
  <div>
    <EngineForm @submit="submit($event)" />
  </div>
</template>
