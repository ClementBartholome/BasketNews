<template>
  <a v-if="article" :href="article.link" target="_blank">
    <div class="img-zoom" v-if="article">
      <img :src="article.image" alt="Miniature" />
    </div>
    <h2 class="article-title" v-if="article">
      {{ article.title }}
    </h2>
    <p v-html="article.description" v-if="article"></p>
    <small v-if="article">{{ formatDate(article.pubDate) }} - {{ article.source }}</small>
  </a>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { formatDate } from '@/utils/UtilsFunctions'
import type { Article } from '@/types/types'

defineProps({
  article: Object as PropType<Article>
})
</script>

<style lang="scss">
.article {
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 400px;
  width: 100%;

  .img-zoom {
    height: 250px;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 10px;

    img {
      height: 100%;
      width: 100%;
      transition: 0.3s all ease-in-out;
      object-fit: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  h1 {
    text-align: center;
    margin: 20px 0;
  }
}

.article.full-list .img-zoom {
  height: 400px;
}
</style>
