<template>
    <div class="mt-7">
        <div class="flex flex-col items-center justify-center max-w-[700px] m-auto">
            <h1 class="text-3xl font-bold">{{ book.name }}</h1>
            <p class="text-md mt-2 font-medium">Author: {{ book.author }}</p>
            <p class="text-md mt-1 font-medium">Genre: {{ book.genre }}</p>
            <p class="mt-6 text-center">{{ book.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useBookStore } from '../store/store';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useBookStore();

onBeforeMount(async () => {
    await store.fetchBooks();
})

const findBookByID = (id) => {
    return store.fetchedBooks.find(book => book.id.toString() === id);
}
const book = ref(findBookByID(route.params.id));
</script>