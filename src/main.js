import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import AboutUs from "./pages/AboutUs.vue";
import ContactUs from "./pages/ContactUs.vue";
import NewPage from "./pages/NewPage.vue";
import CartPage from "./pages/CartPage.vue";
import BestSellers from "./pages/BestSellers.vue";
import BestPrices from "./pages/BestPrices.vue";
import AutographBooks from "./pages/AutographBooks.vue";
import WishListPage from "./pages/WishListPage.vue";
import BookDetailsPage from "./pages/BookDetailsPage.vue";
import './style.css';
import App from './App.vue';
import { createPinia } from "pinia";

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/about",
        component: AboutUs
    },
    {
        path: "/contact_us",
        component: ContactUs
    },
    {
        path: "/new_books",
        component: NewPage
    },
    {
        path: "/bestsellers",
        component: BestSellers
    },
    {
        path: "/best_prices",
        component: BestPrices
    },
    {
        path: "/cart",
        component: CartPage
    },
    {
        path: "/autograph_books",
        component: AutographBooks
    },
    {
        path: "/wishlist",
        component: WishListPage
    },
    {
        path: "/:id",
        name: 'book-details',
        component: BookDetailsPage
    }
];

const pinia = createPinia();
const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(pinia);
app.use(router);
app.mount('#app');
