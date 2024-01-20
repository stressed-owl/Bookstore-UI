import { defineStore } from "pinia";
import API from "../API/instance";
import { ref } from "vue";

export const useBookStore = defineStore("books", () => {
    const foundBooks = ref(0);
    const fetchedBooks = ref([]);
    const searchedBook = ref("");
    const cart = ref([]);
    const wishlistBooks = ref([]);

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

    const addBookToWishlist = (book) => {
        wishlistBooks.value.push(book)
        const storedWishlistBooks = JSON.parse(localStorage.getItem('wishlist')) || []
        storedWishlistBooks.push(book)
        localStorage.setItem('wishlist', JSON.stringify(storedWishlistBooks))
    }
    
    const removeBookFromWishlist = (id) => {
        wishlistBooks.value = wishlistBooks.value.filter(book => book.id !== id)
        const storedWishlistBooks = JSON.parse(localStorage.getItem('wishlist')) 
        const updatedWishlistBooks = storedWishlistBooks.filter(book => book.id !== id)
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlistBooks))
    }

    return { 
        fetchBooks,
        fetchedBooks, 
        searchedBook,
        addToCart,
        addBookToWishlist,
        removeBookFromWishlist,
        cart,
        removeFromCart,
        wishlistBooks
    };
});