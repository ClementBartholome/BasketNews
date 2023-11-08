<template>
  <SidebarFilters
    :sources="sources"
    :selectedSource="selectedSource"
    :fetchAllArticles="fetchAllArticles"
    :filterArticles="filterArticles"
  />
  <HeaderItem />
  <main>
    <BoxResults />
    <div class="home-layout">
      <section class="articles">
        <h2>Toutes les actus</h2>
        <article class="article full-list" v-for="article in displayedArticles" :key="article.link">
          <ArticleCard :article="article" />
        </article>
      </section>
      <section class="continu">
        <h2>En continu</h2>
        <NewsFeed :allArticles="allArticles" />
      </section>
    </div>
    <div class="pagination">
      <button
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '@/components/ArticleCard.vue'
import BoxResults from '@/components/BoxResults.vue'
import HeaderItem from '@/components/HeaderItem.vue'
import SidebarFilters from '@/components/SidebarFilters.vue'
import NewsFeed from '@/components/NewsFeed.vue'
import { sources } from '@/assets/sources'

import type { Article } from '@/types/types'
import { fetchAllArticles } from '@/api/api'

const allArticles = ref<Article[]>([])
const selectedSource = ref<string>('')
const loading = ref(true)
const articlesPerPage = 8

onMounted(async () => {
  sortArticles()
  const intervalDuration = 60 * 1000 // 1 minute
  setInterval(fetchAllArticles, intervalDuration)
})

const sortArticles = async () => {
  loading.value = true
  const fetchedArticles = await fetchAllArticles()
  fetchedArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  loading.value = false
  allArticles.value = fetchedArticles
  selectedSource.value = ''
}

const filterArticles = (sourceName: string) => {
  selectedSource.value = sourceName
  allArticles.value = allArticles.value.filter((article) =>
    sourceName === '' ? true : article.source === sourceName
  )
  if (selectedSource.value === '') {
    sortArticles()
  }
}

const route = useRoute()
const router = useRouter()
const currentPage = ref(Number(route.params.page) || 1)

const maxPageDisplay = 6

const pageNumbers = computed(() => {
  const totalArticles = allArticles.value.length

  const totalPages = Math.ceil(totalArticles / articlesPerPage)

  const startPage = Math.max(1, currentPage.value - Math.floor(maxPageDisplay / 2))

  const endPage = Math.min(totalPages, startPage + maxPageDisplay - 1)

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const goToPage = (page: number) => {
  currentPage.value = page
  router.push({ name: 'news-page', params: { page: page } })
}

const displayedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * articlesPerPage
  const endIndex = currentPage.value * articlesPerPage
  return allArticles.value.slice(startIndex, endIndex)
})
</script>

<style scoped lang="scss">
.articles {
  display: flex;
  flex-direction: column;

  .article {
    max-width: 700px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination button {
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #fff;
  color: #333;
  border-radius: 4px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

.pagination button:hover {
  background-color: #007bff;
  color: #fff;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
