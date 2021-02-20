import { reactive, ReactiveEffect } from 'vue';

const store: any = reactive({
  schoolList: {}
})

export default {
  set(key = "",value: any){
    store[key] = value;
    localStorage.setItem(key,JSON.stringify(value));
  },
  get(key = ""){
    return store[key] || (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null);
  }
}