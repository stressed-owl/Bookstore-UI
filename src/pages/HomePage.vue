<template>
    <div>
        <div class="flex items-center justify-center">
            <img src="../assets/home_banner.webp" alt="banner">
        </div>
        <p class="text-center font-semibold mt-5">Found books: {{ filteredBooks.length }}</p>
        <div class="mt-10">
            <book-cards-list :books="filteredBooks" />
        </div>
    </div>
</template>

<script setup>
import BookCardsList from '../components/UI/lists/BookCardsList.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useBookStore } from '../store/store';

const store = useBookStore();

const filteredBooks = ref([]);

onBeforeMount(async () => {
    await store.fetchBooks();
    updateFilteredBooks();
});

watch(() => store.searchedBook, updateFilteredBooks);

function updateFilteredBooks() {
    filteredBooks.value = store.fetchedBooks.filter(book =>
        book.name.toLowerCase().includes(store.searchedBook.toLowerCase())
    );
}
</script>