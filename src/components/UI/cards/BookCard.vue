<template>
    <div>
        <div class="max-w-full w-[350px] p-4 border-black border-[1px] rounded-[5px] cursor-pointer">
            <img :src="randomImage()" alt="image book"/>
            <div class="flex items-center justify-between mt-2">
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
import BookRatingStars from '../stars/BookRatingStars.vue';
import rulesForLife from "../../../assets/bookImages/12_rules_for_life.jpg";
import atomicHabits from "../../../assets/bookImages/Atomic Habits.jpg";
import badass from "../../../assets/bookImages/badass.jpg";
import bestSelf from "../../../assets/bookImages/Best Self.jpg";
import girlWashYourFace from "../../../assets/bookImages/Girl, Wash Your Face.jpg";
import habits from "../../../assets/bookImages/The 7 Habits of Highly Effective People.jpg";
import alchemist from "../../../assets/bookImages/The Alchemist.jpg";
import fourAgreements from "../../../assets/bookImages/The Four Agreements.jpg";
import subtleArt from "../../../assets/bookImages/The Subtle Art of Not Giving a F*ck.jpg";
import thinkingFastAndSlow from "../../../assets/bookImages/Thinking Fast and Slow.jpg";

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})

const bookImages = [rulesForLife, atomicHabits, badass, bestSelf, girlWashYourFace, habits, alchemist, fourAgreements, subtleArt, thinkingFastAndSlow];

const randomImage = () => bookImages[Math.floor(Math.random() * bookImages.length)];
</script>