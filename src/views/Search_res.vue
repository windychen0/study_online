<template>
  <div>
    <layout>
      <div
        class="container max-w-5xl mx-auto mt-10 rounded-xl bg-gray-100 p-10"
      >
        <p class="text-2xl mb-2">搜索"{{route.query.q}}"的结果</p>
        <ul class="w-full">
          <li v-for="(item,index) in rData.list" :key="index" class="mt-2">
            <a
              href="javascript: void(0)"
              class="duration-300 hover:bg-blue-100 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200"
            >
              <dl
                class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center"
              >
                <div>
                  <dt class="sr-only">Title</dt>
                  <dd
                    class="group-hover:text-white leading-6 font-medium text-black"
                  >
                    {{item.name}}
                  </dd>
                </div>
                <div>
                  <dt class="sr-only">Category</dt>
                  <dd
                    class="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4"
                  >
                    {{item.description}}
                  </dd>
                </div>
                <div class="col-start-2 row-start-1 row-end-3">
                  <dt class="sr-only">Users</dt>
                  <dd
                    class="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2"
                  >
                    <img
                      x-for="user in item.users"
                      width="48"
                      height="48"
                      class="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                    />
                  </dd>
                </div>
              </dl>
            </a>
          </li>

          <div v-if="!rData.list.length" class="text-2xl text-center text-yellow-300">暂无搜索结果</div>
        </ul>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject, reactive } from "vue";
import layout from "../components/layout.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { layout },
  setup() {

    let route = useRoute();
    let api: any = inject("api");

    let rData = reactive({
      list: []
    });

    onMounted(async ()=>{
      let data = await api.searchCourse({name: route.query.q});
      rData.list = data.data
    })
    return { src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",route,rData };
  },
});
</script>