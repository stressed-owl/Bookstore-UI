<template>
    <div class="bg-black p-4 flex items-center justify-center gap-6">
        <router-link class="text-white font-semibold" v-for="link in catalogLinks" :key="link.name" :to="link.path">
            {{ link.name }}
        </router-link>
    </div>
</template>

<script setup>
import { catalogLinks } from "../../../data/data";
</script>