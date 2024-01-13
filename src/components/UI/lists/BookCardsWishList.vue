<template>
    <div class="flex flex-wrap gap-4">
        <book-card v-for="book in books" :key="book.id" :book="book" class="mt-4 flex flex-row"/>
    </div>
</template>

<script setup>
import BookCard from "../../UI/cards/BookCardWishList.vue";

const props = defineProps({
    books: {
        type: Array,
        required: true
    }
})
</script>