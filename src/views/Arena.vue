<template>
    <div class="arena">
      <h2>Arena</h2>
  
      <div v-if="deck.length === 0">
        <p>Vous n'avez pas de deck. Veuillez en créer un avant de lancer un combat.</p>
      </div>
  
      <div v-else>
        <div class="teams">
          <div class="team">
            <h3>Votre équipe</h3>
            <div v-for="(pokemon, index) in deck" :key="index">
              <PokemonCard
                :name="capitalize(pokemon.name)"
                :rarity="capitalize(pokemon.rarity)"
                :power="capitalize(pokemon.power)"
              />
            </div>
          </div>
          <div class="team">
            <h3>L'équipe adverse</h3>
            <div v-for="(pokemon, index) in opponents" :key="index">
              <PokemonCard
                :name="capitalize(pokemon.name)"
                :rarity="capitalize(pokemon.rarity)"
                :power="capitalize(pokemon.power)"
              />
            </div>
          </div>
        </div>
  
        <div class="battle">
          <h3>Résultat du combat</h3>
          <p v-if="winner === 'user'">Vous avez gagné ! Félicitations !</p>
          <p v-else-if="winner === 'opponent'">Vous avez perdu ! Dommage !</p>
          <p v-else>Vous avez fait match nul ! Bien joué !</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import PokemonCard from "../components/PokemonCard.vue";
    import data from "../data/json/pokemon.json";

    export default {
      name: 'ArenaView', // Change the component name to a multi-word format
      components: {
        PokemonCard,
      },
      data() {
        return {
          deck: [],
          opponents: [],
          winner: "",
        };
      },
      mounted() {
        this.loadDeck();
        this.generateOpponents();
        this.determineWinner();
      },
      methods: {
        loadDeck() {
          const savedDeck = localStorage.getItem("deck");
          if (savedDeck) {
            this.deck = JSON.parse(savedDeck);
          }
        },
        generateOpponents() {
          for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomPokemon = data[randomIndex];
            this.opponents.push(randomPokemon);
          }
        },
        determineWinner() {
          const userScore = this.calculateScore(this.deck);
          const opponentScore = this.calculateScore(this.opponents);
          if (userScore > opponentScore) {
            this.winner = "user";
          } else if (userScore < opponentScore) {
            this.winner = "opponent";
          } else {
            this.winner = "draw";
          }
        },
        calculateScore(team) {
          let score = 0;
          for (let pokemon of team) {
            switch (pokemon.rarity) {
              case "Common":
                score += 1;
                break;
              case "Uncommon":
                score += 2;
                break;
              case "Rare":
                score += 3;
                break;
              case "Rare Holo":
                score += 4;
                break;
            }
          }
          return score;
        },
        capitalize(str) {
          return str?.charAt(0).toUpperCase() + str?.slice(1);
        },
      },
    };
  </script>
  
  <style scoped>
    .arena {
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

    .teams {
      display: flex;
      justify-content: space-between;
      margin: 20px;
    }

    .team {
      width: 45%;
    }

    h3 {
      color: #00f;
      text-align: center;
    }

    .battle {
      margin: 20px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .arena {
        max-width: 90%;
      }

      .teams {
        flex-direction: column;
      }

      .team {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  </style>
  