<template>
    <div class="mt-7">
        <p>Total books in the wishlist: {{ books.length }}</p>
        <book-cards-list :books="books"></book-cards-list>
    </div>
</template>

<script setup>
import { useBookStore } from '../store/store';
import BookCardsList from '../components/UI/lists/BookCardsWishList.vue';
import { ref } from 'vue';

const books = ref(JSON.parse(localStorage.getItem("wishlist")));
</script>