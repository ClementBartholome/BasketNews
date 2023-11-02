<template>
  <section>
    <div class="news-feed" v-for="article in slicedArticles" :key="article.link">
      <small>{{ formatDate(article.pubDate) }}</small>
      <h2 class="article-title">
        <a :href="article.link" target="_blank">{{ article.title }}</a>
      </h2>
      <div class="img-zoom">
        <img :src="article.image" alt="Miniature" />
      </div>
    </div>
    <button class="load-more" @click="toggleShowLess">
      {{ showLess ? 'Voir moins' : 'Afficher les actus NBA suivantes' }}
      <span class="material-symbols-outlined">
        {{ !showLess ? 'arrow_drop_down' : 'arrow_drop_up' }}
      </span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import { formatDate } from '@/utils/UtilsFunctions.ts'

const props = defineProps({
  allArticles: {
    type: Array as PropType<Article[]>,
    required: true
  }
})

const startIndex = ref(0)
const endIndex = ref(12)
const showLess = ref(false)

const slicedArticles = computed(() => props.allArticles.slice(startIndex.value, endIndex.value))

const toggleShowLess = () => {
  showLess.value = !showLess.value
  if (showLess.value) {
    endIndex.value += 6
  } else {
    endIndex.value = startIndex.value + 12
  }
}

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
