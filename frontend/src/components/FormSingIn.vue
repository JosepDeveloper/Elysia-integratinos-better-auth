<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { z } from "zod";

const data = {
  email: "",
  password: "",
};

const emit = defineEmits<{
  (e: "submit", value: typeof data): void;
}>();

const schema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

const errorMessage = {
  email: "",
  password: "",
};

const handleSubmit = (event: SubmitEvent) => {
  const values = Object.fromEntries(
    new FormData(event.target as HTMLFormElement),
  );

  const { data, success, error } = schema.safeParse(values);

  if (!success) {
    const { properties } = z.treeifyError(error);
    if (!properties) return;

    const { email, password } = properties;

    errorMessage.email = email?.errors[0] || "";
    errorMessage.password = password?.errors[0] || "";

    console.log(errorMessage);
    return;
  }

  emit("submit", data);
};
</script>

<template>
  <article class="grid gap-2">
    <h2>Iniciar Sesion</h2>
    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <InputText
        name="email"
        type="email"
        placeholder="Email"
        v-model="data.email"
      />
      <InputText
        name="password"
        type="password"
        placeholder="Password"
        v-model="data.password"
      />

      <Button type="submit" label="Iniciar Sesion" severity="contrast" />
    </form>
  </article>
</template>
