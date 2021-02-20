<template>
  <div>
    <layout>
        <div class="container max-w-5xl mx-auto mt-10 rounded-xl p-2">
          <video autoplay :src="src"></video>
        </div>
    </layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import layout  from "../components/layout.vue"

export default defineComponent({
  components: { layout },
  setup () {
      
    return { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }
  }
})
</script>