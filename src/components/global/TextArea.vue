<script setup>
import { computed, toRefs } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    divClass: String,
    label: String,
    rows: String,
    input: String,
    placeholder: { type: String, default: '' },
    error: String
})
const { divClass, label, rows, input, placeholder, error } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})
</script>

<template>
    <div :class="divClass">
        <label class="form-label">
            {{ label }}
        </label>
        <textarea
                :placeholder="placeholder"
                :rows="rows"
                class="form-control"
                v-model="inputComputed">
        </textarea>
        <div v-if="error" class="text-danger">
            {{ error }}
        </div>
    </div>
</template>
