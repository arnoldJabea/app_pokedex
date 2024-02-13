<template>
  <div id="app">
    <!-- Logo -->
    <img src="logo.png" alt="Pokémon logo" id="logo" />

    <!-- Options de recherche -->
    <div id="search-bar">
      <SearchOption
        label="Nom du pokémon :"
        type="text"
        v-model="name"
        placeholder="Entrez un nom"
      />
      <SearchOption
        label="Rareté du pokémon :"
        type="select"
        v-model="rarity"
        :options="['', 'Common', 'Uncommon', 'Rare', 'Rare Holo']"
      />
      <SearchOption
        label="Pouvoir du pokémon :"
        type="select"
        v-model="power"
        :options="['', 'Fire', 'Water', 'Grass', 'Lightning', 'Psychic', 'Fighting', 'Colorless']"
      />
    </div>

    <!-- Vues selon le routage -->
    <router-view></router-view>
  </div>
</template>

<script>
import SearchOption from "./components/SearchOption.vue";

export default {
  components: {
    SearchOption,
  },
  data() {
    return {
      name: "",
      rarity: "",
      power: "",
    };
  },
};
</script>

<style scoped>
#app {
  width: 80%;
  margin: 0 auto;
}

#logo {
  display: block;
  width: 300px;
  margin: 20px auto;
}

#search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

#search-bar label,
.search-option label {
  display: block;
}

body {
  font-family: Arial, sans-serif;
  background-color: #eee;
}

h1, h2, h3 {
  color: #f00;
}
</style>
