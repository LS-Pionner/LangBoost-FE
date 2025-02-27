<template>
    <div class="sentenceset-item">
        <div class="sentenceset-title">
            <h3>{{ truncatedTitle }}</h3>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    sentenceSet: {
        type: Object,
        required: true
    },
});

const truncatedTitle = computed(() => {
    const title = props.sentenceSet.title;

    return title.length > 15 ? title.substring(0, 15) + '...' : title;
});

</script>

<style scoped>
.sentenceset-item {
  position: relative;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.sentenceset-item:hover {
  background-color: #ececec;
}

.sentenceset-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sentenceset-item h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

</style>