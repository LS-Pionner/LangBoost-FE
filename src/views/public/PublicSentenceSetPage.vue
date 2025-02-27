<template>
    <div class="container">  
        <!-- <div class="side-content">
        <router-link to="/new-sentence">문장추가</router-link>
        </div> -->

        <div class="contents">
            <h2>공용 문장 세트</h2>
            <PublicSentenceSetListComponent />
        </div>
    </div>
</template>
  
<script setup>
import PublicSentenceSetListComponent from '../../components/features/public/PublicSentenceSetListComponent.vue';
  
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
max-width: 50%;
padding: 20px;
box-sizing: border-box;
margin-top: 50px;
}

.side-content {
width: 100%;
max-width: 800px;
padding: 20px;
box-sizing: border-box;
display: flex;
justify-content: flex-end;
}
</style>
