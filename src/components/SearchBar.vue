<template>
    <q-input
        dense
        standout
        v-model="text"
        input-class="text-right"
        class="q-ma-md"
        style="width: 600px;"
    >
        <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
        </template>
    </q-input>
</template>
<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "SearchBar",
    setup() {
        return {
            text: "",
            search() {
                console.log(this.text);
                api.get("/search", {
                    params: {
                        text: this.text,
                    },
                });
            },
        };
    },
});
</script>