<template>
    <div class="mt-5">
        <div class="mt-10">
            <book-cards-list :books="newBooks" />
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from '../store/store';
import BookCardsList from '../components/UI/lists/BookCardsList.vue';
import { onBeforeMount, ref, watch } from 'vue';

const store = useBookStore();

const newBooks = ref([]);

onBeforeMount(async () => {
    await store.fetchBooks();
    updateFilteredBooks();
})

watch(() => store.searchedBook, updateFilteredBooks);

function updateFilteredBooks() {
    newBooks.value = store.fetchedBooks.filter(book => book.isNew === true);
}
</script>