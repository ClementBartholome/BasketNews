<template>
  <div class="img-zoom" v-if="article">
    <img :src="article.image" alt="Miniature" />
  </div>
  <h2 class="article-title" v-if="article">
    <a :href="article.link" target="_blank">{{ article.title }}</a>
  </h2>
  <p v-html="article.description" v-if="article"></p>
  <small v-if="article">{{ formatDate(article.pubDate) }} - {{ article.source }}</small>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { formatDate } from '@/utils/UtilsFunctions.ts'

const props = defineProps({
  article: Object as PropType<Article>
})

interface Article {
  title: string
  pubDate: Date
  link: string
  author: string
  image: string
  description: string
  source: string
}
</script>
