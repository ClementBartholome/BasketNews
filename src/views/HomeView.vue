<template>
  <SidebarFilters
    :sources="sources"
    :selectedSource="selectedSource"
    :fetchAllArticles="fetchAllArticles"
    :filterArticles="filterArticles"
  />
  <main>
    <div class="headline">
      <div class="headline-content">
        <span class="material-symbols-outlined"> sports_basketball </span>
        <h1>Basket News</h1>
      </div>
      <DarkModeBtn />
    </div>
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
      <section class="continu">
        <h2>En continu</h2>
        <NewsFeed :allArticles="allArticles" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import * as cheerio from 'cheerio'
import ArticleCard from '@/components/ArticleCard.vue'
import DarkModeBtn from '@/components/DarkModeBtn.vue'
import NewsFeed from '@/components/NewsFeed.vue'
import SidebarFilters from '@/components/SidebarFilters.vue'

interface Article {
  title: string
  pubDate: Date
  link: string
  author: string
  image: string
  description: string
  source: string
}

const sources = [
  {
    name: 'BasketUSA',
    url: 'https://www.basketusa.com/feed/',
    logo: '../public/images/basketusa.webp'
  },
  { name: 'TrashTalk', url: 'https://trashtalk.co/feed/', logo: '../public/images/trashtalk.png' },
  {
    name: 'ESPN NBA',
    url: 'https://www.espn.com/espn/rss/nba/news',
    logo: '../public/images/espn.png'
  },
  {
    name: 'CBS Sports NBA',
    url: 'https://www.cbssports.com/rss/headlines/nba/',
    logo: '../public/images/cbs.webp'
  },
  {
    name: "L'Equipe",
    url: 'https://dwh.lequipe.fr/api/edito/rss?path=/Basket/',
    logo: '../public/images/lequipe.webp'
  },
  {
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/ProBasketball.xml',
    logo: '../public/images/nytimes.png'
  },
  {
    name: 'BasketEurope',
    url: 'https://www.basketeurope.com/feed/',
    logo: '../public/images/basketeurope.webp'
  }
]

const latestArticle = ref<Article[]>([])
const regularArticles = ref<Article[]>([])
const allArticles = ref<Article[]>([])
const loading = ref(true)
const selectedSource = ref<string>('')

onMounted(async () => {
  fetchAllArticles()
  setInterval(fetchAllArticles, 5 * 60 * 1000) // 5 minutes
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

const fetchAllArticles = async () => {
  const fetchedArticles: Article[] = []

  for (const source of sources) {
    try {
      const response = await axios.get(
        `https://api.rss2json.com/v1/api.json?rss_url=${source.url}`,
        {
          params: {
            api_key: 'r2a7tree6j7ddkzq3ofmrefdqnkbvogtqfmd1xtp'
          }
        }
      )

      const items = response.data.items.map((item: any) => {
        const description = item.description
        const $ = cheerio.load(description)
        const cleanedDescription = $.text()

        let image = item.enclosure ? item.enclosure.link : ''
        if (!image) {
          const imageMatch = description.match(/<img.*?src="(.*?)"/)
          image = imageMatch ? imageMatch[1] : ''
        }

        if (image.endsWith('.mp3')) {
          image = ''
        }

        if (image == '') {
          image = '../public/images/default_image.jpg'
        }

        return {
          title: item.title,
          pubDate: new Date(item.pubDate),
          link: item.link,
          author: item.author,
          image,
          description: cleanedDescription,
          source: source.name
        }
      })
      fetchedArticles.push(...items)
    } catch (error) {
      console.error(`Erreur lors de la récupération des articles de ${source.name}:`, error)
    }
  }

  fetchedArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
  console.log(fetchedArticles)
  const featured = fetchedArticles.slice(0, 1)
  const regular = fetchedArticles.slice(1, 8)

  selectedSource.value = ''
  latestArticle.value = featured
  regularArticles.value = regular
  allArticles.value = fetchedArticles
  loading.value = false
}
</script>

<style lang="scss">
.filter-button.active {
  background-color: #007bff;
  color: #fff;
}

:root {
  --text-color-light: #333;
  --background-color-light: #fff;

  --text-color-dark: #fff;
  --background-color-dark: #333;

  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

body {
  color: var(--text-color-light);
  background-color: var(--background-color-light);
}

.dark-mode {
  color: var(--text-color-dark);
  background-color: var(--background-color-dark);

  .continu .load-more,
  button {
    color: #fff;
  }

  .continu {
    background-color: rgba(110, 107, 107, 0.336);
  }
}

main {
  max-width: 1280px;
  margin: 0 auto;
}

.headline {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #ebebebd5;
  padding-bottom: 10px;
  text-transform: uppercase;
  .headline-content {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  button {
    display: flex;
    margin-left: auto;
  }
}

.articles {
  gap: 1.5rem;
  display: flex;
  flex-wrap: wrap;

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

.article {
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 290px;

  .img-zoom {
    height: 200px;
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
  color: #007bff;
}

a:hover {
  color: #0056b3;
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
      margin-top: 0;
      max-width: 160px;
      max-height: 50px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .img-zoom {
      height: 50px;
      width: 50px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
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
    color: #333333;
    cursor: pointer;
    &:hover {
      color: #2c84c1;
      border: 1px solid #95c2e1;
    }
  }
}

.home-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  margin: 10px;
}

@media (max-width: 980px) {
  .home-layout {
    grid-template-columns: 1fr;
    margin: 20px;
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
  .continu {
    margin: 30px auto;
  }
}

@media (max-width: 500px) {
  .home-layout {
    margin: 10px;
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
