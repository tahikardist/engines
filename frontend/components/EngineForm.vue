<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

interface Props {
  initialValues: any;
}

let { initialValues = {} } = defineProps<Props>();

let emit = defineEmits(["submit"]);

let { apiUrl } = useRuntimeConfig().public;

let { data: engineTypes } = await useAsyncData(() => $apifetch("/engine-types"));

let schema = z.object({
  title: z.string().min(1, { message: "Поле обязательно к заполнению" }),
  description: z.string(),
  link: z.string().min(1, { message: "Поле обязательно к заполнению" }),
  img: z.string().min(1, { message: "Поле обязательно к заполнению" }),
  engineTypeId: z.number(),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  title: "",
  description: "",
  link: "",
  img: "/course_logo_placeholder.png",
  ...initialValues,
});

async function submit(event: FormSubmitEvent<Schema>) {
  emit("submit", event.data);
}

function onFileInput(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      state.img = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="submit">
      <UFormGroup label="Название" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="Описание" name="description">
        <UTextarea autoresize v-model="state.description" />
      </UFormGroup>

      <UFormGroup label="Ссылка на источник" name="link">
        <UInput v-model="state.link" />
      </UFormGroup>

      <UFormGroup label="Тип движка" name="link">
        <USelectMenu v-model="state.engineTypeId" value-attribute="id" option-attribute="title" :options="engineTypes" />
      </UFormGroup>

      <div>
        <p class="font-medium text-sm">Лого</p>
        <div class="flex items-center gap-4 mt-2">
          <div class="relative inline-flex size-24">
            <div class="block aspect-[1/1] overflow-hidden">
              <img
                class="h-full w-full object-cover rounded-2xl"
                :src="state.img.startsWith('/images') ? `${apiUrl}/${state.img}` : state.img"
              />
            </div>
          </div>
          <label class="py-1.5 px-3 text-gray-800 text-sm font-medium bg-sky-500 rounded cursor-pointer hover:bg-sky-700" for="file-input">
            Выбрать файл
          </label>
          <input id="file-input" class="hidden" type="file" @input="onFileInput" accept="image/*" />
        </div>
      </div>

      <div class="pt-4 flex gap-2 items-center">
        <UButton type="submit"> Сохранить </UButton>
        <UButton to="/admin/engines" color="gray" type="button"> Назад </UButton>
      </div>
    </UForm>
  </div>
</template>
