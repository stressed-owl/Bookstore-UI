<template>
    <div class="flex flex-col items-center mt-10">
        <div class="flex flex-col items-center">
            <h1 class="text-2xl font-bold">Contact us at any time</h1>
            <span class="mt-1 text-[15px] font-medium">We work 24/7</span>
        </div>
        <Form v-if="!isFormSent" :validation-schema="schema" @submit="submit" class="flex flex-col gap-4 mt-9 max-w-[300px]">
            <label class="flex flex-col" for="username">
                Username
                <Field v-model="username" class="border-[1px] border-black py-4 px-2 rounded-sm mt-4" type="text"
                    id="username" name="username" placeholder="Sam Altman" />
                <ErrorMessage name="username" class="text-red-500"/>
            </label>
            <label class="flex flex-col" for="phone">
                Phone number
                <Field v-model="phoneNumber" class="border-[1px] border-black py-4 px-2 rounded-sm mt-4" type="text"
                    id="phone" name="phone" placeholder="+38 044 123 45 67" />
                <ErrorMessage name="phone" class="text-red-500"/>
            </label>
            <label class="flex flex-col" for="email">
                Email
                <Field v-model="email" class="border-[1px] border-black py-4 px-2 rounded-sm mt-4" type="email" id="email"
                    name="email" placeholder="samaltman@open.ai" />
                <ErrorMessage name="email" class="text-red-500"/>
            </label>
            <label class="flex flex-col" for="message">
                Message
                <textarea v-model="message" class="p-4 mt-4 border-[1px] border-black resize-none rounded-sm"
                    placeholder="Contact message..." name="message" id="message" cols="30" rows="10"></textarea>
            </label>
            <button class="flex items-center justify-center bg-black p-4 text-white rounded-sm font-medium text-xl">
                Submit
            </button>
        </Form>
        <p v-else-if="isFormSent" class="text-xl font-medium text-center mt-5">
            Thanks for contacting us. <br />
            We will call you back as soon as possible.
        </p>
        <div v-else-if="isFormSentError" class="mt-5 text-xl font-medium text-center">
            <p>Something went wrong in submitting a form</p>
            <p>Please, try again</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../API/instance";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const isFormSent = ref(false);
const isFormSentError = ref(false);
const username = ref("");
const phoneNumber = ref("");
const email = ref("");
const message = ref("");

const schema = yup.object({
    email: yup.string().required().email(),
    username: yup.string().required(),
    phone: yup.string().required(),
});

const submit = async () => {
    try {
        const data = {
            name: username.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            message: message.value,
        };

        const response = await API.post("/contact", data);

        if (response.status === 200 || response.status === 201) {
            isFormSent.value = true;
            setTimeout(() => {
                isFormSent.value = false;
            }, 5000);
        } else {
            isFormSentError.value = true;
            setTimeout(() => {
                isFormSentError.value = false;
            }, 100000);
        }
        
        username.value = "";
        phoneNumber.value = "";
        message.value = "";
        email.value = "";
    } catch (error) {
        console.log("ERROR", error);
    }
};
</script>
