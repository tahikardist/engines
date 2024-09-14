<script setup lang="ts">
useHead({
  title: "Редактирование объекта",
});

let route = useRoute();

async function submit(data) {
  await $apifetch("/engines/" + route.params.id, {
    method: "put",
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

let { data: item } = await useAsyncData(() => $apifetch("/engines/" + route.params.id));
</script>

<template>
  <div>
    <EngineForm :initial-values="item" @submit="submit($event)" />
  </div>
</template>
