<template>
  <div class="pokemon-detail">
    <h1>{{ capitalize(pokemon.name) }}</h1>
    <img :src="pokemon.imageUrl" :alt="pokemonAltText" id="pokemon-image" />

    <h2>Statistiques</h2>
    <div class="stats-chart">
      <canvas ref="statsChart"></canvas>
    </div>

    <h2>Performance contre d'autres types</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Performance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in pokemon.types" :key="type.id">
          <td>{{ capitalize(type.name) }}</td>
          <td>{{ type.performance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PokemonView",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pokemonAltText: "Image de " + this.pokemon.name,
    };
  },
  mounted() {
    this.renderStatsChart();
  },
  methods: {
    renderStatsChart() {
      const ctx = this.$refs.statsChart.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "HP",
            "Attack",
            "Defense",
            "Special Attack",
            "Special Defense",
            "Speed",
          ],
          datasets: [
            {
              label: "Stats",
              data: Object.values(this.pokemon.stats),
            },
          ],
        },
      });
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
.pokemon-detail {
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  color: #f00;
  text-align: center;
}

img {
  display: block;
  width: 100%;
  height: auto;
  margin: 20px auto;
  object-fit: cover;
  transition: transform 0.5s;
}

img:hover {
  transform: scale(1.2);
}

h2 {
  color: #00f;
}

.stats-chart {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

@media (max-width: 768px) {
  .pokemon-detail {
    max-width: 90%;
  }
}
</style>
