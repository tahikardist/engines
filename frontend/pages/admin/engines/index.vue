<script setup>
useHead({
  title: "Список объектов",
});

let { apiUrl } = useRuntimeConfig().public;

const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "img",
    label: "Изображение",
  },
  {
    key: "title",
    label: "Название",
    sortable: true,
  },
  {
    key: "description",
    label: "Описание",
  },
  {
    key: "engineType",
    label: "Тип движка",
  },
  {
    key: "actions",
    label: "Действия",
  },
];

const search = ref("");
const sort = ref({ column: "id", direction: "asc" });

let { data: rows } = await useAsyncData(
  "engines",
  () =>
    $apifetch("/engines", {
      params: {
        sort: sort.value.column,
        order: sort.value.direction,
        q: search.value,
      },
    }),
  {
    watch: [search, sort],
  }
);

async function deleteItem(id) {
  if (confirm("Вы уверены, что хотите удалить эту запись?")) {
    await $apifetch("/engines/" + id, {
      method: "delete",
    });
    await refreshNuxtData("engines");
  }
}

const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => rows.value.length);
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value));

watch([search], () => {
  page.value = 1;
});
</script>

<template>
  <div class="pb-4">
    <div
      class="flex border border-zinc-200 dark:border-zinc-700 relative rounded-t-md rounded-b-md not-prose bg-white dark:bg-zinc-900 overflow-hidden"
    >
      <UCard
        class="w-full"
        :ui="{
          divide: 'divide-y divide-gray-200 dark:divide-gray-700',
          header: { padding: 'px-4 py-5' },
          body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
          footer: { padding: 'p-4' },
        }"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <div>
              <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">Движки</h2>
            </div>
            <div>
              <UButton to="/admin/engines/create" color="orange" class="!text-white">Добавить</UButton>
            </div>
          </div>
        </template>
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Поиск..." />
        </div>
        <UTable
          v-model:sort="sort"
          :columns
          :rows="rows.slice((page - 1) * pageCount, (page - 1) * pageCount + pageCount)"
          sort-asc-icon="i-heroicons-arrow-up"
          sort-desc-icon="i-heroicons-arrow-down"
          sort-mode="manual"
          :ui="{ td: { base: '' }, default: { checkbox: { color: 'gray' } } }"
          :empty-state="{ label: 'Записей нет' }"
        >
          <template #img-data="{ row }">
            <div>
              <img
                class="size-24 rounded-full object-cover aspect-[1/1]"
                :src="row.img.startsWith('/images') ? `${apiUrl}/${row.img}` : row.img"
                alt=""
              />
            </div>
          </template>
          <template #engineType-data="{ row }">
            <div>
              {{ row.engineType.title }}
            </div>
          </template>
          <template #description-data="{ row }">
            <div class="line-clamp-2">
              <span>
                {{ row.description }}
              </span>
            </div>
          </template>
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UTooltip text="Редактировать" :popper="{ placement: 'top' }">
                <UButton
                  :to="`/admin/engines/${row.id}/edit`"
                  icon="i-heroicons-pencil"
                  size="2xs"
                  color="orange"
                  variant="outline"
                  :ui="{ rounded: 'rounded-full' }"
                />
              </UTooltip>

              <UTooltip text="Удалить" :popper="{ placement: 'top' }">
                <UButton
                  @click="deleteItem(row.id)"
                  icon="i-heroicons-x-mark"
                  size="2xs"
                  color="red"
                  variant="outline"
                  :ui="{ rounded: 'rounded-full' }"
                />
              </UTooltip>
            </div>
          </template>
        </UTable>

        <template #footer>
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <span class="text-sm leading-5">
                Показано
                <span class="font-medium">{{ pageFrom }}</span>
                -
                <span class="font-medium">{{ pageTo }}</span>
                из
                <span class="font-medium">{{ pageTotal }}</span>
                записей
              </span>
            </div>

            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="pageTotal"
              :ui="{
                wrapper: 'flex items-center gap-1',
                rounded: '!rounded-full min-w-[32px] justify-center',
                default: {
                  activeButton: {
                    variant: 'outline',
                  },
                },
              }"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
