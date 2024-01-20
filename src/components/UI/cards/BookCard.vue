<template>
    <div>
        <div class="max-w-full w-[350px] p-4 border-black border-[1px] rounded-[5px] cursor-pointer">
            <div class="flex items-center justify-between">
                <p class="font-bold text-xl">{{ book.name }}</p>
                <slot name="card-upper"></slot>
            </div>
            <book-rating-stars :rating="book.rating"/>
            <p class="mt-3">{{ book.author }}</p>
            <p>${{ book.price }}</p>
            <div class="flex items-center justify-center gap-2 mt-6">
                <slot name="card-bottom"></slot>
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