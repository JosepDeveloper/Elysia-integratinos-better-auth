<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { z } from "zod";

const data = {
  username: "",
  email: "",
  password: "",
};

const emit = defineEmits<{
  (e: "submit", values: typeof data): void;
}>();

const schema = z.object({
  username: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8).max(100),
});

const errorMessage = {
  username: "",
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

    const { username, email, password } = properties;

    errorMessage.username = username?.errors[0] || "";
    errorMessage.email = email?.errors[0] || "";
    errorMessage.password = password?.errors[0] || "";
    return;
  }

  emit("submit", data);
};
</script>

<template>
  <article class="grid gap-2">
    <h2>Registrarse</h2>
    <form @submit.prevent="handleSubmit" class="grid gap-4">
      <div>
        <InputText
          name="username"
          placeholder="Nombre de Usuario"
          v-model="data.username"
          inputmode="text"
        />
      </div>

      <div>
        <InputText
          name="email"
          placeholder="Correo Electronico"
          v-model="data.email"
          inputmode="email"
        />
      </div>

      <div>
        <InputText
          name="password"
          placeholder="Contraseña"
          v-model="data.password"
          inputmode="text"
          type="password"
        />
      </div>

      <Button type="submit" label="Registrarse" severity="success" />
    </form>
  </article>
</template>
