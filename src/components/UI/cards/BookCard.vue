<template>
    <div>
        <div class="max-w-full w-[350px] p-4 border-black border-[1px] rounded-[5px] cursor-pointer">
            <div class="flex items-center justify-between">
                <p class="font-bold text-xl">{{ book.name }}</p>
                <button @click="store.addToWishlist(book)" class="min-h-[48px] min-w-[48px] flex items-center justify-end">
                    <img src="../../../assets/bookmark_icon.svg" alt="bookmark icon">
                </button>
            </div>
            <book-rating-stars :rating="book.rating"/>
            <p class="mt-3">{{ book.author }}</p>
            <p>${{ book.price }}</p>
            <div class="flex items-center justify-center gap-2 mt-6">
                <button @click="store.addToCart(book)" class="bg-black text-white px-4 py-2 font-medium">Add to cart</button>
                <router-link class="bg-black text-white px-4 py-2 font-medium" :to="`${book.id}`">
                    See details
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from '../../../store/store';
import BookRatingStars from '../stars/BookRatingStars.vue';

const store = useBookStore();

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})
</script>