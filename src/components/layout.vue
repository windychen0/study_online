<template>
  <div>
    <header class="">
        <ul>
            <li>1</li>
        </ul>
    </header>
        <main>
            <slot></slot>
        </main>
    <footer>

    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "layout",
  setup () {
    return {}
  }
})
</script>
