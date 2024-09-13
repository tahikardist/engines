<script setup>
useHead({
  title: "Список объектов",
});

const columns = [
  {
    key: "id",
    label: "#",
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

const page = ref(1);
const pageCount = ref(5);
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
          <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">Движки</h2>
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
