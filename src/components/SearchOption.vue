<template>
    <div class="search-option">
      <label>{{ label }}</label>
      <input v-if="type === 'text'" :type="type" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder">
      <select v-else :value="value" @input="$emit('input', $event.target.value)">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: ""
      },
      options: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>
  
  <style scoped>
  .search-option {
    margin: 10px;
  }
  
  .search-option label {
    display: block;
  }
  
  .search-option input, .search-option select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  