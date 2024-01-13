<template>
    <div class="flex">
        <span v-for="star in totalStars" :key="star" :class="{ 'text-yellow-500': star <= rating }">&#9733;</span>
    </div>
</template>
  
<script setup>
import { computed } from "vue";
const props = defineProps({
    rating: {
        type: Number,
        required: true
    },
    maxRating: {
        type: Number,
        default: 5
    }
})

const totalStars = computed(() => Array.from({ length: props.maxRating }, (_, index) => index + 1));
</script>  