<template>
    <div class="mt-7">
        <p class="text-center font-medium text-2xl">
            Total books in the wishlist:
            <span class="font-bold">{{ store.wishlistBooks.length }}</span>
        </p>
        <book-cards-wish-list class="mt-6" :books="store.wishlistBooks"/>
    </div>
</template>

<script setup>
import { watch } from "vue";
import { useBookStore } from "../store/store";
import BookCardsWishList from "../components/UI/lists/BookCardsWishList.vue";

const store = useBookStore();
const storedWishlistBooks = JSON.parse(localStorage.getItem('wishlist'))
if (storedWishlistBooks) {
    store.wishlistBooks = storedWishlistBooks;
}

watch(store.wishlistBooks, (newValue) => {
    localStorage.setItem("wishlist", JSON.stringify(newValue));
});
</script>
