import Vue from 'vue'
import { AxiosPromise } from 'axios'
declare module 'vue/types/vue' {
  interface Vue {
    $utils: any
    $axios: (...args: any) => AxiosPromise
  }
}
