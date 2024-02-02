<template>
  <div>
    <b-container>
      <b-breadcrumb :items="items"></b-breadcrumb>
    </b-container>
    <div class="container">
        <h1>Hola desde el formulario</h1>
        <p v-if="errors.length">
            <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </p>

        <b-form @submit="onSubmit" ref="form" >
        <b-form-group id="input-group-1" label="Marca:" label-for="brand">
            <b-form-input
            id="brand"
            v-model="form.brand"
            type="text"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Modelo:" label-for="model">
            <b-form-input
            id="model"
            v-model="form.model"
            type="text"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2-5" label="Año de fabricación:" label-for="year">
            <b-form-input
            id="year"
            v-model="form.year"
            type="number"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Número de serie:" label-for="serialNumber">
            <b-form-input
            id="serialNumber"
            v-model="form.serialNumber"
            type="text"
            ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="mt-4" variant="primary">Submit</b-button>
        </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [
        {
          text: "Inicio",
          to: { name: "inicio" },
        },
        {
          text: "Formulario",
          active: true,
        },
      ],
      errors: [],
      form: {
        brand: "",
        model: "",
        year: "",
        serialNumber: "",
      }
    };
  },
methods: {
    onSubmit(e){
        e.preventDefault();
        this.errors = [];
        let brandAndModelValue = this.validateBrandAndModel(this.form.brand, this.form.model)
        let fabricationYearValue = this.validateFabricationYear(this.form.year);
        let serialNumberValue = this.validateSerialNumber(this.form.serialNumber);
        if (brandAndModelValue && fabricationYearValue && serialNumberValue ){
            alert("Datos capturados con exito")
            axios.post('http://localhost:8080/api/vehiculos', {
              brand: this.form.brand,
              model: this.form.model,
              serie: this.form.serialNumber,
              year: this.form.year,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            this.$refs.form.submit()
        }
    },
    validateBrandAndModel: function(brand, model){
        const regex = /^[a-zA-Z0-9\s]+$/;
        if(!regex.test(brand) || !regex.test(model)){
            this.errors.push('La marca y/o el modelo no son alfanumericos, recuerda que solo pueden contener letras y numeros, verifica los valores ingresados')
            return false;
        }
        return true
    },
    validateFabricationYear: function(fabricationYear){
        const actualYear = new Date().getFullYear();
        if (fabricationYear > actualYear) {
            this.errors.push("El año de fabricacion no puede ser mayor al año actual")
            return false
        }
        return true
    },
    validateSerialNumber: function(serialNumber){
        const regex = /^[a-zA-Z]{4}\d{3}-\d{2}[a-zA-Z]{2}$/;
        if(regex.test(serialNumber)){
            return true;
        }else{
            this.errors.push("El numero de serie no cumple con el formato XXXX000-00XX donde las X son letras y los 0 numeros")
            return false;
        }
    }
}
};
</script>
<style></style>
