<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

function displayIcecreamInformations(icecreamName) {
  console.log(icecreamName)
}
</script>

<template>
  <div 
    class="greetings"
    @click="displayIcecreamInformations(name)"
  >
    <h1>{{ name }} ({{ id }})</h1>
  </div>
</template>
