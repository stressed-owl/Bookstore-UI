<template>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <book-card v-for="book in props.books" :book="book" />
    </div>
</template>

<script setup>
import BookCard from "../../UI/cards/BookCardCart.vue";

const props = defineProps({
    books: {
        type: Array,
        required: true
    }
})
</script>