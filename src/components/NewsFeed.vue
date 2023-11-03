<template>
  <section>
    <div class="news-feed" v-for="article in slicedArticles" :key="article.link">
      <small>{{ formatTime(article.pubDate) }}</small>
      <h2 class="article-title">
        <a :href="article.link" target="_blank">{{ article.title }}</a>
      </h2>
      <div class="img-zoom">
        <img :src="article.image" alt="Miniature" />
      </div>
    </div>
    <LoadMoreBtn @click="toggleShowLess">
      {{ showLess ? 'Voir moins' : 'Afficher les actus NBA suivantes' }}
      <span class="material-symbols-outlined">
        {{ !showLess ? 'arrow_drop_down' : 'arrow_drop_up' }}
      </span>
    </LoadMoreBtn>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import { formatTime } from '@/utils/UtilsFunctions'
import type { Article } from '@/types/types'
import LoadMoreBtn from '@/components/LoadMoreBtn.vue'

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
    endIndex.value += 10
  } else {
    endIndex.value = startIndex.value + 12
  }
}
</script>

<style scoped lang="scss">
.news-feed {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  small {
    font-size: 0.7rem;
  }
  .article-title {
    font-size: 0.8rem;
    font-weight: 400;
    margin-top: 0;
    max-width: 190px;
    max-height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 375px) {
      max-width: 210px;
    }
  }
  .img-zoom {
    height: 50px;
    width: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;

    @media (max-width: 375px) {
      display: none;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;

      transition: 0.3s all ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.load-more {
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #cecece;
  font-size: 14px;
  padding: 8px;
  margin-top: 10px;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    color: #2c84c1;
    border: 1px solid #95c2e1;
  }
}
</style>
