<template>
    <div class="mt-5">
        <p class="text-center font-semibold">Found books: {{ bestsellers.length }}</p>
        <div class="mt-10">
            <book-cards-list :books="bestsellers" />
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from '../store/store';
import BookCardsList from '../components/UI/lists/BookCardsList.vue';
import { watch, ref, onBeforeMount } from 'vue';

const store = useBookStore();
const bestsellers = ref([]);

onBeforeMount(async () => {
    await store.fetchBooks();
    updateFilteredBooks();
})

watch(() => store.searchedBook, updateFilteredBooks);

function updateFilteredBooks() {
    bestsellers.value = store.fetchedBooks.filter(book => book.isBestseller === true);
}
</script>