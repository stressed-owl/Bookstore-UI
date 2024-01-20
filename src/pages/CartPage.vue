<template>
    <div class="mt-7">
        <div v-if="store.cart.length > 0" class="flex justify-between max-w-[900px] m-auto">
            <div class="flex flex-col items-center">
                <book-cards-list class="flex flex h-[510px] w-[420px] overflow-x-hidden" :books="store.cart"/>
                <button v-if="store.cart.length > 1" @click="clearCart" class="bg-black text-white py-2 px-4 rounded-sm font-semibold mt-6">Remove all</button>
            </div>
            <div>
                <Form :validation-schema="schema" @submit="checkout">
                    <div class="flex gap-4 items-center">
                        <label class="flex flex-col" for="name">
                            Name
                            <Field v-model.trim="name" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="name" name="name" placeholder="Sam" />
                            <ErrorMessage name="name"/>
                        </label>
                        <label class="flex flex-col" for="surname">
                            Surname
                            <Field v-model.trim="surname" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="surname" name="surname" placeholder="Altman" />
                            <ErrorMessage name="surname"/>
                        </label>
                    </div>
                    <div>
                        <label class="flex flex-col mt-4" for="card">
                            Card
                            <Field v-model="card" @input="formattedCard" maxlength="19" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="card" name="card" placeholder="4111 4444 4444 4444" />
                            <ErrorMessage name="card"/>
                        </label>
                    </div>
                    <div class="flex gap-4 items-center">
                        <label class="flex flex-col mt-4" for="valid">
                            Valid until
                            <Field v-model="valid" @input="formattedValid" maxlength="5" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="valid" name="valid" placeholder="12/35" />
                            <ErrorMessage name="valid"/>
                        </label>
                        <label class="flex flex-col mt-4" for="cvv">
                            CVV
                            <Field v-model.number="cvv" maxlength="3" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="cvv" name="cvv" placeholder="000" />
                            <ErrorMessage name="cvv"/>
                        </label>
                    </div>
                    <div>
                        <label class="flex flex-col mt-4" for="coupon">
                            Coupon
                            <Field v-model="coupon" maxlength="15" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="coupon" name="coupon" placeholder="XRPBTCETH" />
                            <ErrorMessage name="coupon"/>
                        </label>
                    </div>
                </form>
                <div class="flex flex-col items-center mt-5">
                    <div class="flex flex-col gap-1 text-center">
                        <p>Discount: $0.00</p>
                        <p>Total: ${{ total }}</p>
                    </div>
                    <button class="bg-black text-white py-2 px-4 rounded-sm font-semibold mt-6">Checkout</button>
                </div>
            </div>
        </div>
        <div v-else-if="isFormSent" class="flex flex-col gap-1 items-center justify-center">
            <p>Thanks for order!</p>
            <p>Your order ID is <span class="font-bold">{{ orderID }}</span></p>
        </div>
        <div v-else class="flex flex-col items-center gap-1">
            <p class="font-semibold text-3xl">Empty cart</p>
            <p class="text-sm">Maybe it's time to buy something?</p>
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from "../store/store";
import BookCardsList from "../components/UI/lists/BookCardsCartList.vue";
import { ref, computed } from "vue";
import API from "../API/instance";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

const store = useBookStore();

const name = ref("");
const surname = ref("");
const cvv = ref("");
const orderID = ref("");
const coupon = ref("");
const isFormSent = ref(false);

const card = ref("");
const formattedCard = computed(() => {
    let cleanedInput = card.value.replace(/\s/g, '').slice(0, 16);
    let formattedInput = cleanedInput.replace(/(.{4})/g, '$1 ');
    card.value = formattedInput.trim();
})

const valid = ref("");
const formattedValid = computed(() => {
      let formatted = valid.value.replace(/\D/g, "");
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
      }
      valid.value = formatted;
    });

const total = computed(() => store.cart.reduce((sum, book) => sum + book.price, 0).toFixed(2));

const checkout = async () => {
    isFormSent.value = true;
    try {
        generateOrderID();
        const data = {
            name: name.value,
            surname: surname.value,
            card: card.value,
            valid: valid.value,
            cvv: cvv.value,
            products: JSON.stringify(store.cart),
            orderID: orderID.value,
            coupon: coupon.value
        };
        const response = await API.post("/order", data);
        setTimeout(() => {
            isFormSent.value = false;
        }, 300000);
        name.value = "";
        surname.value = "";
        card.value = "";
        valid.value = "";
        cvv.value = "";
        coupon.value = "";
        store.cart = [];
        return response.data;
    } catch (error) {
        console.log("ERROR", error);
    }
}

const clearCart = () => {
    store.cart = [];
}

const generateOrderID = () => {
    const min = 10000000;
    const max = 99999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    orderID.value = randomNumber;
}

const schema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    card: yup.string().required().max(15),
    valid: yup.string().required().max(5),
    cvv: yup.string().required().max(3),
    coupon: yup.string().max(15)
})
</script>