<script lang="ts" setup>
import { authClient } from "../lib/auth-client";
import FormLogin from "../components/FormLogin.vue";
import FormSingIn from "../components/FormSingIn.vue";
import Button from "primevue/button";

const session = authClient.useSession();

function handleSubmitRegister(data: {
  username: string;
  email: string;
  password: string;
}) {
  authClient.signUp
    .email({
      name: data.username,
      email: data.email,
      password: data.password,
    })
    .then(({ data, error }) => {
      console.log({ data, error });
    });
}

function handleSubmitSingIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  authClient.signIn
    .email({
      email,
      password,
    })
    .then(({ data, error }) => {
      console.log({ data, error });
    });
}

function handleSingOut() {
  authClient.signOut({});
}
</script>

<template>
  <div class="flex flex-col justify-center items-center p-10 w-full">
    <section class="grid gap-10" v-if="!session.data">
      <FormLogin @submit="handleSubmitRegister" />
      <FormSingIn @submit="handleSubmitSingIn" />
    </section>
    <section class="grid" v-else>
      <main class="grid gap-1">
        <h1>Bienvenido {{ session.data.user.name }}</h1>

        Has iniciado sesión correctamente.

        <Button
          severity="contrast"
          label="Cerrar sesión"
          @click="handleSingOut"
        />
      </main>
    </section>
  </div>
</template>
