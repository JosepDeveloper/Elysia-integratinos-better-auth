<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { authClient } from "../lib/auth-client";
import Button from "primevue/button";
import * as z from "zod";

const { data, error, isPending, isRefetching, refetch } =
  authClient.useSession();

const values = {
  username: "",
  email: "",
};

const schema = z.object({
  username: z.string().min(2).max(100),
  email: z.email(),
});

const errorMessage = {
  username: "",
  email: "",
};

const handleSubmit = (event: SubmitEvent) => {
  const values = Object.fromEntries(
    new FormData(event.target as HTMLFormElement),
  );

  const { data, success, error } = schema.safeParse(values);

  if (!success) {
    const { properties } = z.treeifyError(error);
    if (!properties) return;

    const { username, email } = properties;

    errorMessage.username = username?.errors[0] || "";
    errorMessage.email = email?.errors[0] || "";
  }

  console.log({ data });
};
</script>

<template>
  <div class="flex flex-col justify-center items-center p-10 w-full">
    <section class="grid gap-10" v-if="!data">
      <article class="grid gap-2">
        <h2>Registrarse</h2>
        <form @submit.prevent="handleSubmit" class="grid gap-4">
          <div>
            <InputText
              name="username"
              placeholder="Nombre de Usuario"
              v-model="values.username"
              inputmode="text"
            />
          </div>

          <div>
            <InputText
              name="email"
              placeholder="Correo Electronico"
              v-model="values.email"
              inputmode="email"
            />
          </div>

          <Button type="submit" label="Registrarse" severity="success" />
        </form>
      </article>

      <h2>Iniciar session</h2>
      <form></form>
    </section>
  </div>
</template>
