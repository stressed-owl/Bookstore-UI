<template>
    <footer class="min-h-[350px] max-w-[1440px] m-auto flex flex-col justify-center items-center">
        <custom-logo-dark class="flex justify-center items-center"/>
        <main-links-list class="flex items-center justify-center text-black mt-4"/>
        <blockquote class="mt-10">
            <p>"I was raised by books. Books, and then my parents"</p>
            <p>—Elon Musk</p>
        </blockquote>
        <a class="flex gap-1 items-center justify-center mt-5" href="tel:+380444444444">
            <img src="../../../assets/phone_icon.svg"/>
            +380 44 444 44 44
        </a>
        <p class="text-[14.5px] mt-4">&copy; 2023 Bookstore. All Rights Reserved.</p>
    </footer>
</template>

<script setup>
import CustomLogoDark from '../logo/CustomLogoDark.vue';
import MainLinksList from '../links/MainLinksList.vue';
</script>