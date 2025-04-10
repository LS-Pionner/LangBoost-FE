<template>
    <div class="container">  
        <div class="contents">
            <div class="content-header">
                <h2>{{ sentenceSet?.title }}</h2>
            </div>
            <PublicSentenceListComponent
                :sentenceSetId="sentenceSetId"
                @sentenceSetRecieved="handleSentenceSetReceived"
            />
        </div>
    </div>
</template>

<script setup>
import PublicSentenceListComponent from '@/components/features/sentence/PublicSentenceListComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 동적 라우팅 시 받아오는 문장 세트 id
const sentenceSetId = route.params.sentenceSetId;
const sentenceSet = ref(null);  // 하위 컴포넌트로부터 받아온 문장 세트

const handleSentenceSetReceived = (sentenceSetData) => {
    sentenceSet.value = sentenceSetData;
}

</script>

<style scoped>
.container {
font-family: Arial, sans-serif;
background-color: #fafafa;
/* min-height: 100vh; */
display: flex;
flex-direction: column;
align-items: center;
}

.contents {
width: 100%;
max-width: 40%;
padding: 20px;
box-sizing: border-box;
margin-top: 50px;
}

.content-header {
    display: flex;
}
</style>