<template>
  <div class="h-full bg-gray-300">
    <div class="flex items-center justify-center h-full">
      <div
        class="flex relative rounded overflow-hidden duration-300"
        :class="{ 'max-w-3xl': form.lor }"
        :style="{ 'min-height': form.lor ? 'auto' : '800px' }"
        v-loading="form.loading"
      >
        <div
          class="bg-white w-1/2 p-8 ease-linear absolute h-full transform-gpu"
          :class="{
            'left-full -translate-x-full': !form.lor,
            'left-0': form.lor,
          }"
        >
          <h1 class="text-gray-700 text-3x2 text-center my-4">
            欢迎来到在线学习系统! 请{{ form.lor ? "登录" : "注册" }}
          </h1>
          <div class="text-gray-600">
            <div class="my-3">
              <input
                type="text"
                v-model="form.account"
                placeholder="账号"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div>
            <div class="my-3">
              <input
                type="password"
                v-model="form.password"
                placeholder="密码"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div>
            <div class="my-3" v-if="!form.lor">
              <input
                type="password"
                v-model="form.password_again"
                placeholder="确认密码"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div>
            <div class="my-3" v-if="!form.lor">
              <input
                type="text"
                v-model="form.name"
                placeholder="姓名"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div>
            <!-- <el-button-group>
              <el-button v-for="key of Role" type="primary" icon="el-icon-edit" :key="key">{{key}}</el-button>
            </el-button-group> -->
            <div class="my-3 flex justify-center" v-if="!form.lor">
              <label class="mr-5 cursor-pointer"
                ><input
                  type="radio"
                  name="sex"
                  value="男"
                  class="mr-0.5 cursor-pointer"
                  v-model="form.sex"
                />男</label
              >
              <label class="cursor-pointer"
                ><input
                  type="radio"
                  name="sex"
                  value="女"
                  class="mr-0.5 cursor-pointer"
                  v-model="form.sex"
                />女</label
              >
            </div>

            <div class="my-3" v-if="!form.lor">
              <input
                id="school_input"
                type="text"
                v-model="form.school"
                placeholder="学校"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div>

            <div class="my-3 flex justify-between">
              <label class="cursor-pointer"
                ><input
                  type="radio"
                  name="role"
                  value="student"
                  class="mr-0.5 cursor-pointer"
                  v-model="form.role"
                />学生</label
              >
              <label class="cursor-pointer"
                ><input
                  type="radio"
                  name="role"
                  value="assistant"
                  class="mr-0.5 cursor-pointer"
                  v-model="form.role"
                />助教</label
              >
              <label class="cursor-pointer"
                ><input
                  type="radio"
                  name="role"
                  value="teacher"
                  class="mr-0.5 cursor-pointer"
                  v-model="form.role"
                />教师</label
              >
              <label v-if="form.lor" class="cursor-pointer"
                ><input
                  type="radio"
                  name="role"
                  value="admin"
                  class="mr-0.5 cursor-pointer"
                  v-model="form.role"
                />管理员</label
              >
            </div>

            <div class="my-6 flex">
              <button
                class="hover:bg-blue-100 hover:border-blue-100 duration-300 border rounded w-1/2 py-2"
                @click.stop="registerHandle()"
              >
                注册{{ form.lor ? " →" : "" }}
              </button>
              <button
                class="border rounded w-1/2 py-2 border-blue-300 hover:border-blue-100 hover:bg-blue-100 duration-300 bg-blue-300 text-white ml-2"
                @click.stop="loginHandle()"
              >
                {{ !form.lor ? "← " : "" }}登录
              </button>
            </div>
            <!-- <div class="my-3 text-center text-xs text-gray-500">
              &copy;2019 Acme Corp. All rights reserved.
            </div> -->
          </div>
        </div>

        <div>
          <img
            src="../img/architecture-1869211_1280.jpg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, nextTick, reactive, watch } from "vue";
import { Role, Sex } from "../type";

let form = reactive({
      account: "",
      password: "",
      lor: false,
      role: "student",
      loading: false,
      password_again: "",
      name: "",
      sex: "男",
      school: "",
      schoolList: [{
        name: "测试",
        id: 1
      },
      {
        name: "测试2",
        id: 2
      },
      {
        name: "测试3",
        id: 3
      }],
});

export default defineComponent({
  components: {},
  setup() {
    let api: any = inject("api");
    let storage: any = inject("storage");
    function loginHandle() {
      if (!form.lor) {
        form.lor = true;
      } else {

      }
    }

    function registerHandle() {
      if (form.lor) {
        form.lor = false;
        form.role == "admin" && (form.role = "student");
      } else {
      }
    }

    function keydown(e?: Event) {
      
    }
    // keydown();

    watch(
      () => form.lor,
      (n, o, c) => {
        
      },
      {
        deep: true,
      }
    );

    watch(
      () => form.school,
      async (n, o, c) => {
        let res = await api.getSchool({name: n});
        console.log(res)
        res.data.forEach((element: { name: string;id: number }) => {
          storage.set(element.name,element.id);
        });
        form.schoolList = res.data;
      },
      {
        deep: true,
      }
    );

    return { form, api, Role, Sex, loginHandle, registerHandle };
  },
  beforeUnmount(){
    
  },
});
</script>

<style scoped>
  li.active{
    background: skyblue;
    color: white;
  }
</style>