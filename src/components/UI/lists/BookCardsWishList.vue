<template>
    <div class="flex flex-wrap justify-center gap-4">
        <book-card v-for="book in books" :key="book.id" :book="book">
            <template v-slot:card-upper>
                <button @click="store.removeBookFromWishlist(book.id)" class="min-h-[48px] min-w-[48px] flex items-center justify-end">
                    <img src="../../../assets/delete_icon.svg" alt="bookmark icon" />
                </button>
            </template>
            <template v-slot:card-bottom>
                <button @click="store.addToCart(book)" class="bg-black text-white px-4 py-2 font-medium">Add to cart</button>
                <router-link class="bg-black text-white px-4 py-2 font-medium" :to="`${book.id}`">
                    See details
                </router-link>
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