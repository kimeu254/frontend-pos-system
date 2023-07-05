<script setup>
import { toRefs } from "vue";

const props = defineProps({
    colClass: String,
    label: String,
})

const { colClass, label } = toRefs(props)

</script>

<template>
    <div :class="colClass">
        <div class="card">
            <div class="card-header" v-if="label">
                {{label}}
            </div>
            <div class="card-body">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>