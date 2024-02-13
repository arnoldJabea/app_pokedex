<template>
  <div class="deck-form">
    <form @submit.prevent="submitForm">
      <label>Ajouter un pokémon au deck :</label>
      <select v-model="selectedPokemon">
        <option v-for="pokemon in pokemons" :key="pokemon.id" :value="pokemon">
          {{ capitalize(pokemon.name) }}
        </option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import data from "../data/json/pokemon.json";

export default {
  props: {
    pokemons: {
      type: Array,
      default: () => data,
    },
  },
  data() {
    return {
      selectedPokemon: data[0],
    };
  },
  methods: {
    submitForm() {
      this.$emit("addPokemon", this.selectedPokemon);
    },
  },
  filters: {
    capitalize(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1);
    },
  },
};
</script>

<style scoped>
.deck-form {
  margin: 20px;
}

.deck-form label {
  display: block;
}

.deck-form select,
.deck-form button {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.deck-form button {
  background-color: #00f;
  color: #fff;
  cursor: pointer;
}
</style>
