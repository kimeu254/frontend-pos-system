import {defineStore} from "pinia";
import axios from "axios";

export const useBrandStore = defineStore('brands', {
    state: () => ({
        brands: []
    }),

    actions: {
        setBrandsDetails(res) {
            this.$state.brands = res.data.brands
        },

        async fetchBrands()
        {
            let res = await axios.get('api/brands/all')
            this.setBrandsDetails(res)
        },

        clearBrands()
        {
            this.$state.brands = null
        }
    },
    persist: true
})