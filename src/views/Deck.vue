<template>
  <div class="deck">
    <h2>Deck</h2>

    <div v-if="deck.length === 0">
      <p>Votre deck est vide.</p>
    </div>

    <div v-else>
      <div v-for="(pokemon, index) in deck" :key="index" class="pokemon">
        <p>{{ capitalize(pokemon.name) }}</p>
        <button @click="removePokemon(index)">Supprimer</button>
      </div>
    </div>

    <div v-if="deck.length < 5">
      <deck-form @addPokemon="addPokemon"></deck-form>
    </div>

    <div v-else>
      <p>Votre deck est complet.</p>
    </div>
  </div>
</template>

<script>
import DeckForm from "../components/DeckForm.vue";
// import data from "../data/json/pokemon.json";

export default {
  name: 'DeckView',
  components: {
    DeckForm,
  },
  data() {
    return {
      deck: []
    };
  },
  mounted() {
    this.loadDeck();
  },
  methods: {
    addPokemon(pokemon) {
      if (this.deck.length < 5 && !this.deck.includes(pokemon)) {
        this.deck.push(pokemon);
        this.saveDeck();
      }
    },
    removePokemon(index) {
      this.deck.splice(index, 1);
      this.saveDeck();
    },
    loadDeck() {
      const savedDeck = localStorage.getItem('deck');
      if (savedDeck) {
        this.deck = JSON.parse(savedDeck);
      }
    },
    saveDeck() {
      localStorage.setItem('deck', JSON.stringify(this.deck));
    }
  },
  filters: {
    capitalize(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1);
    },
  },
}
</script>

<style scoped>
.deck {
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  color: #f00;
  text-align: center;
}

.pokemon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #00f;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 768px) {
  .deck {
    max-width: 90%;
  }
}
</style>
