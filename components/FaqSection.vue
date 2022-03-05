<template>
    <div class="collapse w-96 border rounded-box border-base-300 collapse-arrow w-full mb-8">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">{{ title }}</div>
        <div class="collapse-content">
            <p v-html="content">
             <!-- {{ content }} -->
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FaqSection',
  props: ['title', 'content']
}
</script>