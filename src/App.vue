<template>
  <div>
    <custom-header />
    <router-view class="max-w-[1440px] m-auto min-h-[70vh]"></router-view>
    <custom-footer />
  </div>
</template>

<script setup>
import CustomFooter from './components/common/footer/CustomFooter.vue';
import CustomHeader from './components/common/header/CustomHeader.vue';

</script>
