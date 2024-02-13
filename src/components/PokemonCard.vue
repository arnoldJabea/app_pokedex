<template>
  <div class="pokemon-card">
    <img :src="imageUrl" :alt="name" />
    <div class="pokemon-info">
      <h3>{{ name }}</h3>
      <p>Rareté: {{ rarity }}</p>
      <p>Pouvoir: {{ power }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rarity: {
      type: String,
      required: true,
    },
    power: {
      type: String,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return `src/data/images/${this.name.toLowerCase()}.png`;
    },
  },
};
</script>

<style scoped>
.pokemon-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s;
}

.pokemon-card:hover {
  transform: scale(1.1);
}

.pokemon-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.pokemon-card h3 {
  margin: 10px 0;
}

.pokemon-card p {
  margin: 5px 0;
}
</style>
