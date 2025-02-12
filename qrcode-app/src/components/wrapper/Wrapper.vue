<script setup>
import './_wrapper.scss'
</script>

<template>
    <div :class="['']">

        <main>
            <slot name="body" />
        </main>
    </div>

</template>