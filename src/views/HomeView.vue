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
      <span v-if="loading" class="material-symbols-outlined loader">sports_basketball</span>
      <section v-else class="articles">
        <div class="latest">
          <h2 v-if="selectedSource">Dernières actus {{ '- ' + selectedSource }}</h2>
          <h2 v-else>Dernières actus</h2>
          <article class="article latest" v-for="article in latestArticle" :key="article.link">
            <ArticleCard :article="article" />
          </article>
        </div>
        <article class="article regular" v-for="article in regularArticles" :key="article.link">
          <ArticleCard :article="article" />
        </article>
      </section>
      <router-link to="/news/page/2">
        <LoadMoreBtn>
          Afficher la suite des actus
          <span class="material-symbols-outlined"> arrow_right_alt </span></LoadMoreBtn
        ></router-link
      >
      <section class="continu">
        <h2>Chrono</h2>
        <NewsFeed :allArticles="allArticles" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import HeaderItem from '@/components/HeaderItem.vue'
import NewsFeed from '@/components/NewsFeed.vue'
import BoxResults from '@/components/BoxResults.vue'
import SidebarFilters from '@/components/SidebarFilters.vue'
import LoadMoreBtn from '@/components/LoadMoreBtn.vue'
import { sources } from '@/assets/sources'
import type { Article } from '@/types/types'
import { fetchAllArticles } from '@/api/api'

const latestArticle = ref<Article[]>([])
const regularArticles = ref<Article[]>([])
const allArticles = ref<Article[]>([])
const loading = ref(true)
const selectedSource = ref<string>('')

onMounted(async () => {
  fetchAndSortArticles()
  const intervalDuration = 60 * 1000 // 1 minute
  setInterval(fetchAndSortArticles, intervalDuration)
})

const fetchAndSortArticles = async () => {
  loading.value = true
  const fetchedArticles = await fetchAllArticles()

  fetchedArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  const latest = fetchedArticles.slice(0, 1)
  const regular = fetchedArticles.slice(1, 8)

  loading.value = false
  allArticles.value = fetchedArticles

  regularArticles.value = regular
  latestArticle.value = latest
  selectedSource.value = ''
}

const filterArticles = (sourceName: string) => {
  selectedSource.value = sourceName

  latestArticle.value = allArticles.value
    .filter((article) => (sourceName === '' ? true : article.source === sourceName))
    .slice(0, 1)
  regularArticles.value = allArticles.value
    .filter((article) => (sourceName === '' ? true : article.source === sourceName))
    .slice(1, 8)

  if (selectedSource.value === '') {
    fetchAndSortArticles()
  }
}
</script>

<style lang="scss">
.dark-mode {
  a {
    color: var(--text-color);
  }
}

main {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  grid-row: 2;
  grid-column: 2;

  @media (max-width: 768px) {
    width: 100%;
  }
}

h2 {
  margin: 10px 0;
}

p {
  margin: 5px 0;
}

a {
  text-decoration: none;
  color: var(--text-color-light);
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.articles {
  gap: 1.5rem;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 425px) {
    margin-right: 0;
  }

  a:hover h2 {
    color: #007bff;
  }

  .regular {
    margin-top: 52px;

    .article-title {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }

    @media (max-width: 1200px) {
      .article-title {
        font-size: 1.4rem;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }
}

.article.latest {
  max-width: 500px;

  @media (max-width: 1200px) {
    max-width: 100%;
    width: 100%;
  }

  .article-title {
    font-size: 1.4rem;
  }

  p {
    font-size: 1.2rem;
  }
  .img-zoom {
    height: 300px;
  }
}

.continu {
  background-color: var(--background-secondary);
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 20px;
  height: fit-content;
  grid-row: 1;
  grid-column: 2;

  @media (max-width: 900px) {
    grid-row: 3;
    grid-column: 1;
  }
}

.home-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  margin: 10px;
}

@media (max-width: 1200px) {
  .article,
  .latest {
    max-width: 100%;

    .img-zoom {
      height: 300px;
    }
  }
}

@media (max-width: 900px) {
  .home-layout {
    grid-template-columns: 1fr;
    margin: 20px;
  }
  .continu {
    margin: 30px auto;
  }
}

@media (max-width: 850px) {
  .article,
  .latest,
  .regular {
    width: 100%;
    max-width: none;
  }
  .article .img-zoom {
    height: 320px;
  }
}

@media (max-width: 425px) {
  main {
    padding: 10px;
  }
  .home-layout {
    margin: 0;
  }
}

@media (max-width: 375px) {
  .articles {
    margin-right: 0;
  }
}

.loader {
  position: relative;
  animation: bouncy-loader 0.6s infinite alternate;
  font-size: 5rem;
  margin: 0 auto;
}
@keyframes bouncy-loader {
  0% {
    top: 0;
  }
  33% {
    top: 20px;
  }
  66% {
    top: 0;
  }
  100% {
    top: 20px;
  }
}
</style>
