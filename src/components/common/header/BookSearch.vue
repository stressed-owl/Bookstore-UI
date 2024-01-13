<template>
    <div class="flex max-w-full w-[900px]">
        <input class="border-black border-[1px] rounded-sm outline-none py-4 px-2 max-w-full w-[900px]" type="search" v-model="store.searchedBook" placeholder="Search a book..."/>
    </div>
</template>

<script setup>
import { useBookStore } from '../../../store/store';

const store = useBookStore();
</script>