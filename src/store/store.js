import { defineStore } from "pinia";
import API from "../API/instance";
import { ref } from "vue";

export const useBookStore = defineStore("books", () => {
    const foundBooks = ref(0);
    const fetchedBooks = ref([]);
    const searchedBook = ref("");
    const cart = ref([]);
    const wishlist = ref([]);

    const fetchBooks = async () => {
        try {
            const response = await API.get("/books");
            foundBooks.value = response.data.length;
            fetchedBooks.value = response.data;
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = (book) => {
        cart.value.push({ ...book });
    }

    const removeFromCart = (id) => {
        cart.value = cart.value.filter(book => book.id !== id);
    }

    const addToWishlist = (book) => {
        wishlist.value.push({ ...book });
        localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
    }

    const removeFromWishlist = (id) => {
        wishlist.value = wishlist.value.filter(book => book.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
    }

    return { 
        fetchBooks,
        fetchedBooks, 
        searchedBook,
        addToCart,
        cart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        wishlist,
    };
});