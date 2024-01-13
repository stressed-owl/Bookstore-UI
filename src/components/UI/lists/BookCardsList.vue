<template>
    <div class="flex flex-wrap justify-center gap-4">
        <book-card v-for="book in props.books" :book="book" />
    </div>
</template>

<script setup>
import BookCard from "../../UI/cards/BookCard.vue";

const props = defineProps({
    books: {
        type: Array,
        required: true
    }
})
</script>