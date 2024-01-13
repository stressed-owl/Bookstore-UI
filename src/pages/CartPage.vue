<template>
    <div class="mt-7">
        <div v-if="store.cart.length > 0" class="flex justify-between max-w-[900px] m-auto">
            <div class="flex flex-col items-center">
                <book-cards-list class="flex flex h-[400px] w-[305px] overflow-x-hidden" :books="store.cart"/>
                <button v-if="store.cart.length > 1" @click="clearCart" class="bg-black text-white py-2 px-4 rounded-sm font-semibold mt-6">Remove all</button>
            </div>
            <div>
                <form action="/payment">
                    <div class="flex gap-4 items-center">
                        <label class="flex flex-col" for="name">
                            Name
                            <input v-model.trim="name" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="name" name="name" placeholder="Sam">
                        </label>
                        <label class="flex flex-col" for="name">
                            Surname
                            <input v-model.trim="surname" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="name" name="name" placeholder="Altman">
                        </label>
                    </div>
                    <div>
                        <label class="flex flex-col mt-4" for="card">
                            Card
                            <input v-model="card" @input="formattedCard" maxlength="19" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="card" name="card" placeholder="4111 4444 4444 4444">
                        </label>
                    </div>
                    <div class="flex gap-4 items-center">
                        <label class="flex flex-col mt-4" for="card">
                            Valid until
                            <input v-model="valid" @input="formattedValid" maxlength="5" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="card" name="card" placeholder="12/35">
                        </label>
                        <label class="flex flex-col mt-4" for="card">
                            CVV
                            <input v-model.number="cvv" maxlength="3" class="border-[1px] border-black py-4 px-2 rounded-sm mt-1" type="text" id="card" name="card" placeholder="000">
                        </label>
                    </div>
                </form>
                <div class="flex flex-col items-center mt-5">
                    <div class="flex flex-col gap-1 text-center">
                        <p>Discount: $0.00</p>
                        <p>Total: ${{ total }}</p>
                    </div>
                    <button @click="performCheckout" class="bg-black text-white py-2 px-4 rounded-sm font-semibold mt-6">Checkout</button>
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

const store = useBookStore();

const name = ref("");
const surname = ref("");

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

const cvv = ref("");

const total = computed(() => store.cart.reduce((sum, book) => sum + book.price, 0).toFixed(2));

const isFormSent = ref(false);

const performCheckout = async () => {
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
            orderID: orderID.value
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
        store.cart = [];
        return response.data;
    } catch (error) {
        console.log("ERROR", error);
    }
}

const clearCart = () => {
    store.cart = [];
}

const orderID = ref("");

const generateOrderID = () => {
    const min = 10000000;
    const max = 99999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    orderID.value = randomNumber;
}
</script>