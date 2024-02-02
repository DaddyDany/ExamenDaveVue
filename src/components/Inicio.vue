<template>
  <div>
    <b-container>
      <b-breadcrumb :items="items"></b-breadcrumb>
    </b-container>
    <div class="container">
      <h1>Inicio de la aplicacion</h1>
      <b-link :to="{ name: 'formulario' }">
        <b-button variant="primary" class="btn-inicio"> Formulario </b-button>
      </b-link>
      <b-link :to="{ name: 'paginacion' }">
        <b-button variant="primary" class="btn-inicio"> Paginación </b-button>
      </b-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Inicio",
          active: true,
        },
      ],
    };
  },
};
</script>

<style></style>
