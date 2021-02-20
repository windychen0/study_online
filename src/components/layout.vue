<template>
  <div>
    <header
      class="p-2 flex bg-black text-gray-100 justify-between items-center"
    >
      <div
        class="ml-10 cursor-pointer hover:text-white"
        @click="() => goHome()"
      >
        首页
      </div>
      <div>
        <el-input
          placeholder="搜索课程"
          v-model="search"
          class="input-with-select pr-10"
        >
          <template #append>
            <el-button
              icon="el-icon-search"
              @click="() => search_fn()"
            ></el-button>
          </template>
        </el-input>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "layout",
  setup() {
    let router = useRouter();
    let search = ref("");

    function search_fn() {
      router.push({
        path: "/search",
        query: {
          q: search.value,
        },
      });
    }

    function goHome() {
      router.push({
        path: "/home",
      });
    }

    return {
      search,
      search_fn,
      goHome,
    };
  },
});
</script>
