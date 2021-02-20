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
              <el-autocomplete
                v-model="form.school"
                :fetch-suggestions="querySearchAsync"
                placeholder="学校"
                @select="handleSelect"
                class="w-full"
              ></el-autocomplete>
            </div>

            <div class="my-3" v-if="!form.lor">
              <el-autocomplete
                v-model="form.college"
                :fetch-suggestions="querySearchAsync2"
                placeholder="院系"
                @select="handleSelect"
                class="w-full"
              ></el-autocomplete>
            </div>

            <div class="my-3" v-if="!form.lor">
              <input
                type="number"
                v-model="form.number"
                :placeholder="form.show_num_place"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div>

            <!-- <div class="my-3" v-if="!form.lor">
              <input
                id="school_input"
                type="text"
                v-model="form.school"
                placeholder="学校"
                class="border rounded w-full py-2 px-4 outline-none focus:shadow-outline"
              />
            </div> -->

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
import md5 from "md5";
import { useRouter } from "vue-router";

let form = reactive({
  account: "",
  password: "",
  lor: true,
  role: "student",
  loading: false,
  password_again: "",
  name: "",
  sex: "男",
  school: "",
  number: "",
  show_num_place: "学号",
  college: "",
});

export default defineComponent({
  components: {},
  setup() {
    let router = useRouter();
    let api: any = inject("api");
    let storage: any = inject("storage");
    let message: any = inject("message");

    let regs = {
      password: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
    };

    async function loginHandle() {
      if (!form.lor) {
        form.lor = true;
      } else {
        if (check(true)) {
          let data = await api.login({
            username: form.account,
            password: md5(form.password),
            role: form.role
          });

          message.success("登录成功!");

          storage.set("userInfo",{
            username: form.account,
            role: form.role
          })

          setTimeout(() => {
            router.push({
              path: "/home",
            });
          }, 300);
        }
      }
    }

    async function registerHandle() {
      if (form.lor) {
        form.lor = false;
        form.role == "admin" && (form.role = "student");
      } else {
        if (check(false)) {
          let data = await api.register({
            username: form.account,
            password: md5(form.password),
            role: form.role,
            name: form.name,
            sex: form.sex,
            number: form.number,
            schoolId: storage.get("school:" + form.school),
            collegeId: storage.get("school:" + form.college),
          });

          message.success("注册成功!");

          form.lor = true;
        }
      }
    }

    function keydown(e?: Event) {}
    // keydown();

    watch(
      () => form.lor,
      (n, o, c) => {},
      {
        deep: true,
      }
    );

    watch(
      () => form.role,
      (n: string, o, c) => {
        let obj = {
          student: "学号",
          teacher: "教师工号",
          assistant: "协助教师工号",
        };

        form.show_num_place = obj[n];
      },
      {
        deep: true,
      }
    );

    const querySearchAsync = async (queryString: string, cb: any) => {
      if (form.school == "") {
        return;
      }
      let res = await api.getSchool({ name: queryString });

      res.data.forEach((element: { name: string; id: number }) => {
        storage.set("school:" + element.name, element.id);
      });

      cb(res.data.map((it) => ({ value: it.name, id: it.id })));
    };

    const querySearchAsync2 = async (queryString: string, cb: any) => {
      if (form.college == "") {
        return;
      }
      let res = await api.getCollege({ name: queryString });

      res.data.forEach((element: { name: string; id: number }) => {
        storage.set("college:" + element.name, element.id);
      });

      cb(res.data.map((it) => ({ value: it.name, id: it.id })));
    };

    const handleSelect = (item: any) => {
      console.log(item);
    };

    function check(flag: boolean) {
      if (form.account.trim() == "") {
        message.warning("账号不能为空!");
        return false;
      }

      if (!regs.password.test(form.password)) {
        message.warning("请输入6-20位数字或字母,数字与字母至少1个");
        return false;
      }

      if (!flag) {
        if (form.password_again != form.password) {
          message.warning("两次输入密码不一致,请重新输入");
          return false;
        }

        if (form.name.trim() == "") {
          message.warning("姓名不能为空");
          return false;
        }

        if (!storage.get("school:" + form.school)) {
          message.warning("请输入正确的学校");
          return false;
        }

        if (!storage.get("college:" + form.college)) {
          message.warning("请输入正确的院系");
          return false;
        }

        if (form.number.trim() == "") {
          message.warning(form.show_num_place + "不能为空");
          return false;
        }
      }

      return true;
    }

    console.log(md5("1233"));
    return {
      form,
      api,
      Role,
      Sex,
      loginHandle,
      registerHandle,
      querySearchAsync,
      querySearchAsync2,
      handleSelect,
    };
  },
  beforeUnmount() {},
});
</script>

<style scoped>
li.active {
  background: skyblue;
  color: white;
}
</style>