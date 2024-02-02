<template>
  <div>
    <b-container>
      <b-breadcrumb :items="links"></b-breadcrumb>
    </b-container>
    <div class="container">
      <h1>Hola desde la paginación</h1>

      <div class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>

        <b-table
          id="my-table"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          small
          :fields="fields"
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      links: [
        {
          text: "Inicio",
          to: { name: "inicio" },
        },
        {
          text: "Paginación",
          active: true,
        },
      ],
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "id",
          sortable: true,
        },
        {
          key: "brand",
          sortable: true,
        },
        {
          key: "model",
          sortable: true,
        },
        {
          key: "serie",
          sortable: true,
        },
        {
          key: "year",
          sortable: true,
        },
      ],
      items: [],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async obtenerDatos() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/vehiculos/page",
          {
            size: this.perPage,
            page: this.currentPage - 1,
          }
        );
        this.items = response.data.content.map((vehicle) => ({
          id: vehicle.id,
          brand: vehicle.brand,
          model: vehicle.model,
          serie: vehicle.serie,
          year: vehicle.year,
        }));
        this.rows = response.data.totalElements;
      } catch (error) {
        console.error("Chales:", error);
      }
    },
  },
  mounted() {
    this.obtenerDatos();
  },
};
</script>

<style></style>
