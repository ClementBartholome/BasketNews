<template>
  <SidebarFilters
    :sources="sources"
    :selectedSource="selectedSource"
    :fetchAllArticles="fetchAllArticles"
    :filterArticles="filterArticles"
  />
  <main>
    <HeaderItem />
    <div class="home-layout">
      <section class="articles">
        <div class="featured">
          <h2>En direct</h2>
          <article class="article featured" v-for="article in latestArticle" :key="article.link">
            <ArticleCard :article="article" />
          </article>
        </div>
        <span v-if="loading" class="material-symbols-outlined loader">sports_basketball</span>
        <article
          class="article regular"
          v-else
          v-for="article in regularArticles"
          :key="article.link"
        >
          <ArticleCard :article="article" />
        </article>
      </section>
      <router-link to="/news">
        <LoadMoreBtn>
          Afficher la suite des actus
          <span class="material-symbols-outlined"> arrow_right_alt </span></LoadMoreBtn
        ></router-link
      >
      <section class="continu">
        <h2>En continu</h2>
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
  fetchAllArticles(latestArticle, regularArticles, allArticles, loading)
  const intervalDuration = 60 * 1000 // 1 minute
  setInterval(fetchAllArticles, intervalDuration)
})

const filterArticles = (sourceName: string) => {
  selectedSource.value = sourceName

  latestArticle.value = allArticles.value
    .filter((article) => (sourceName === '' ? true : article.source === sourceName))
    .slice(0, 1)
  regularArticles.value = allArticles.value
    .filter((article) => (sourceName === '' ? true : article.source === sourceName))
    .slice(1, 8)
}
</script>

<style lang="scss">
.dark-mode {
  .continu {
    background-color: rgba(110, 107, 107, 0.336);
  }

  a {
    color: var(--text-color);
  }
}

main {
  max-width: 1280px;
  width: 80%;
  margin: 0 auto;
  position: absolute;
  z-index: -1;
  left: 20vw;
}

.articles {
  gap: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: 20px;

  .regular {
    margin-top: 52px;

    .article-title {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
}

.featured {
  max-width: 500px;

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

a:hover {
  color: #007bff;
}

button {
  background: none;
  border: none;
  cursor: pointer;

  .light_mode::before {
    content: '🌞';
  }

  .dark_mode::before {
    content: '🌙';
  }

  .dark-mode &.dark_mode::before {
    color: white;
  }
}

.continu {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
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
  .featured {
    max-width: 100%;

    .img-zoom {
      height: 300px;
    }
  }
}

@media (max-width: 980px) {
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
  .featured,
  .regular {
    width: 100%;
    max-width: none;
  }
  .article .img-zoom {
    height: 320px;
  }
}

@media (max-width: 500px) {
  .home-layout {
    margin: 10px;
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
