<script setup>
import { toRefs, computed} from "vue";

const emit = defineEmits(['update:input'])

const props = defineProps({
    divClass: String,
    label: String,
    input: String,
    placeholder: { type: String, default: ''},
    inputType: String,
    error: String
})

const { divClass, label, input, placeholder, inputType, error} = toRefs(props)

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
        <input :type="inputType" class="form-control" :placeholder="placeholder" v-model="inputComputed">
        <div v-if="error" class="text-danger">
            {{ error }}
        </div>
    </div>
</template>