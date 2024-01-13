<template>
    <div class="mt-5">
        <p class="text-center font-semibold">Found books: {{ bestPrices.length }}</p>
        <div class="mt-10">
            <book-cards-list :books="bestPrices" />
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from '../store/store';
import BookCardsList from '../components/UI/lists/BookCardsList.vue';
import { watch, ref, onBeforeMount } from 'vue';

const store = useBookStore();
const bestPrices = ref([]);

onBeforeMount(async () => {
    await store.fetchBooks();
    updateFilteredBooks();
})

watch(() => store.searchedBook, updateFilteredBooks);

function updateFilteredBooks() {
    bestPrices.value = store.fetchedBooks.filter(book => book.isBestPrice === true);
}
</script>