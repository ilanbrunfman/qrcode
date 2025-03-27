<script setup>
import { ref, computed, onMounted} from 'vue'
// components
import Wrapper from '@/components/wrapper/Wrapper.vue'

// import './_pageNotFound.scss'

// onMounted(() => {
//     console.log('test')
// })

const value = ref({
    name: 'ilan',
})
</script>

<template src="./PageNotFound.html" />
<style src="./PageNotFound.scss" />