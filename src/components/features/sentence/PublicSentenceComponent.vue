<template>
    <div class="sentence-item" @click="toggleMeaning">
        <div class="sentence-header">
            <h3 v-if="visibleMeaningId === null">{{ sentence.content }}</h3>
            <h3 v-else>{{ sentence.meaning }}</h3>
            <div class="sentence-button">
                <i class="fa-solid fa-up-right-and-down-left-from-center enlarge-button"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    sentence: {
        type: Object,
        required: true
    },
});

// 의미를 보여줄 문장 ID
const visibleMeaningId = ref(null);

// 문장 의미 토글 함수
const toggleMeaning = () => {
    visibleMeaningId.value = visibleMeaningId.value === null ? props.sentence.id : null;
}

</script>

<style scoped>
  .sentence-item {
    position: relative;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    /* cursor: pointer; */
}

.sentence-item:hover {
    background-color: #ececec;
}

.sentence-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sentence-item h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
    text-align: center;
    flex-grow: 1; /* 버튼과의 간격을 조절하기 위해 사용 */
}

.sentence-button {
    margin-left: 10px;
    font-size: 24px;
}

.enlarge-button {
    font-size: 18px;
    margin-right: 2px;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.enlarge-button:hover {
    color: white;
    background-color: #0056b3;
}

.more-button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.more-button:hover {
    color: white;
    background-color: #0056b3;
}

.sentence-footer {
    display: flex;
    justify-content: flex-end;
}
</style>