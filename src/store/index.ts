import { reactive, ReactiveEffect } from 'vue';

const store: any = reactive({
  schoolList: {}
})

export default {
  set(key = "",value: any){
    store[key] = value;
  },
  get(key = ""){
    return store[key];
  }
}