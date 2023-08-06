<script setup>
import AParfum from '../components/AParfum.vue'

</script>

<script>
export default {
  data() {
    return {
      parfums: [],
    }
  },
  methods: {
    async getParfums() {
      try {
        const response = await fetch('http://localhost:3000/icecreams')
        const icecreams = await response.json()
        this.parfums = icecreams
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getParfums()
  }
}
</script>

<template>
  <main>
    <AParfum 
      v-for="parfum in parfums"
      :name="parfum.name"
      :id="parfum.id"
    />
  </main>
</template>
