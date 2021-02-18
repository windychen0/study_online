<template>
  <div class="h-full">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, readonly } from 'vue'
import { useRouter } from 'vue-router'
import api from "./request";
import storage from './store';

export default defineComponent({
  setup () {
    const route = useRouter()

    provide("api",readonly(api));
    provide("storage",storage);
    
    return {}
  },
})
</script>
