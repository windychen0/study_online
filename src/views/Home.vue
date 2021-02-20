<template>
  <div>
    <layout>
      <div
        class="container flex max-w-5xl mx-auto mt-10 rounded-xl bg-gray-100 p-2"
      >
        <div class="h-full w-1/3 border-r pr-2">
          <div class="p-5 text-center" style="background: #faf7f5">
            <div class="flex justify-center">
              <img class="rounded-full" src="../img/p.png" alt="" />
            </div>
            <div class="text-center mb-2">
              {{ storage.get("userInfo").username }}
            </div>
            <div class="text-center text-white">
              <span
                class="duration-300 bg-yellow-400 rounded p-2 cursor-pointer hover:bg-yellow-300"
              >
                修改信息
              </span>
            </div>
          </div>

          <ul class="text-gray-400 px-2 mt-2">
            <li
              class="pl-10 p-2 rounded hover:bg-blue-100 bg-blue-100 text-white hover:text-white cursor-pointer"
            >
              我的课程
            </li>
            <li
              class="pl-10 p-2 rounded hover:bg-blue-100 hover:text-white cursor-pointer mt-1"
            >
              网站消息
            </li>
          </ul>
        </div>
        <div class="w-2/3 p-3">
          <ul>
            <li @click="()=>goPlay()">
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
                      测试课程
                    </dd>
                  </div>
                  <div>
                    <dt class="sr-only">Category</dt>
                    <dd
                      class="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4"
                    >
                      教师姓名
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
          </ul>
        </div>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import layout from "../components/layout.vue";

export default defineComponent({
  components: { layout },
  setup() {

    let storage: any = inject("storage");
    let router = useRouter();

    function goPlay(){
      router.push({
        path: "/play"
      })
    }

    return { storage,goPlay };
  },
});
</script>