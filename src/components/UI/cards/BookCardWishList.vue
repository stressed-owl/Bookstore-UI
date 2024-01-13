<template>
    <div>
        <div class="max-w-full w-[250px] p-4 text-center border-black border-[1px] rounded-[5px] cursor-pointer">
            <p class="font-bold text-xl">{{ book.name }}</p>
            <p class="text-md mt-1">{{ book.author }}</p>
            <div class="flex items-center justify-center gap-10 mt-6">
                <button @click="store.removeFromWishlist(book.id)" class="bg-black text-white px-4 py-2 font-medium">Remove</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from '../../../store/store';

const store = useBookStore();

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})
</script>