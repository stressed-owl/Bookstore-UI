<template>
    <header>
        <div class="bg-black p-5">
            <main-links-list class="flex items-center justify-center !text-white"/>
        </div>
        <template class="p-4 flex items-center justify-between gap-[100px] max-w-[1540px] m-auto">
            <custom-logo-dark />
            <book-search />
            <div class="flex gap-7 items-center">
                <router-link to="/cart">
                    <div class="relative">
                        <img src="../../../../src/assets/shopping_cart_icon.svg"/>
                        <div>
                            <div class="w-[20px] h-[20px] rounded-[50%] bg-black absolute top-[-6px] right-[-3px] text-white flex items-center justify-center text-[12px] font-bold">
                                {{ store.cart.length }}
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/wishlist">
                    <img src="../../../../src/assets/list_icon.svg"/>
                </router-link>
            </div>
        </template>
        <catalog-links-list />
    </header>
</template>

<script setup>
import CustomLogoDark from '../logo/CustomLogoDark.vue';
import BookSearch from './BookSearch.vue';
import MainLinksList from '../links/MainLinksList.vue';
import CatalogLinksList from './CatalogLinksList.vue';
import { useBookStore } from '../../../store/store';

const store = useBookStore();
</script>