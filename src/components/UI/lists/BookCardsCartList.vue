<template>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <book-card v-for="book in props.books" :key="book.id" :book="book">
            <template v-slot:card-upper>
                <button @click="store.addBookToWishlist(book)" class="min-h-[48px] min-w-[48px] flex items-center justify-end">
                    <img src="../../../assets/bookmark_icon.svg" alt="bookmark icon" />
                </button>
            </template>
            <template v-slot:card-bottom>
                <button @click="store.removeFromCart(book.id)" class="bg-black text-white px-4 py-2 font-medium">Remove</button>
            </template>
        </book-card>
    </div>
</template>

<script setup>
import { useBookStore } from '../../../store/store';
import BookCard from '../cards/BookCard.vue';

const store = useBookStore();

const props = defineProps({
    books: {
        type: Array,
        required: true
    }
})
</script>