<template>
    <!-- Cartes des pokémons -->
    <transition-group name="fade">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id">
        <PokemonCard
          :name="capitalize(pokemon.name)"
          :rarity="capitalize(pokemon.rarity)"
          :power="capitalize(pokemon.power)"
        />
      </div>
    </transition-group>

    <!-- Icônes de navigation -->
    <div id="pagination">
      <i class="fas fa-angle-left" @click="prevPage"></i>
      <span>{{ page }} / {{ maxPage }}</span>
      <i class="fas fa-angle-right" @click="nextPage"></i>
    </div>
</template>

<script>
import PokemonCard from "../components/PokemonCard.vue";
// import SearchOption from "../components/SearchOption.vue";
import data from "../data/json/pokemon.json";

export default {
  name: "PokedexView",
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemons: data,
      name: "",
      rarity: "",
      power: "",
      page: 1,
      limit: 6,
      logoSrc: "logo.png",
      logoAlt: "Pokémon logo",
    };
  },
  computed: {
    filteredPokemons() {
      return this.pokemons
        .filter((pokemon) => {
          return pokemon.name
            .toLowerCase()
            .includes(this.name.toLowerCase().trim());
        })
        .filter((pokemon) => {
          return this.rarity ? pokemon.rarity === this.rarity : true;
        })
        .filter((pokemon) => {
          return this.power ? pokemon.power.includes(this.power) : true;
        })
        .slice((this.page - 1) * this.limit, this.page * this.limit);
    },
    maxPage() {
      return Math.ceil(
        this.pokemons
          .filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(this.name.toLowerCase().trim());
          })
          .filter((pokemon) => {
            return this.rarity ? pokemon.rarity === this.rarity : true;
          })
          .filter((pokemon) => {
            return this.power ? pokemon.power.includes(this.power) : true;
          }).length / this.limit
      );
    },
  },
  methods: {
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page < this.maxPage) {
        this.page++;
      }
    },
    capitalize(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1);
    },
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

#pagination {
  margin-top: 20px;
  text-align: center;
}

#pagination i {
  cursor: pointer;
  margin: 0 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
