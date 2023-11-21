<template>
  <a v-if="article" :href="article.link" target="_blank">
    <div class="img-zoom" v-if="article">
      <img v-if="article.image" :src="article.image" alt="Miniature" />
      <img v-else :src="article.imageLink" alt="Miniature" />
    </div>
    <h2 class="article-title" v-if="article">
      {{ article.title }}
    </h2>
    <p v-html="article.description" v-if="article"></p>
  </a>
  <div class="flex-container">
    <small v-if="article">{{ formatDate(article.pubDate) }} - {{ article.source }}</small>
    <span
      v-if="user && user.bookmarks"
      class="material-symbols-outlined bookmark"
      :class="{ bookmarked: isBookmarked(article) }"
      @click="toggleBookmark(article)"
    >
      bookmark
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, watch, onMounted } from 'vue'
import { formatDate } from '@/utils/UtilsFunctions'
import type { Article } from '@/types/types'
import { addBookmarkArticle, removeBookmarkArticle } from '@/api/api'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = ref(userStore.getUser)

defineProps({
  article: Object as PropType<Article>
})

onMounted(() => {
  if (user.value) {
    userStore.getUserBookmarks(user.value.userId)
  }
})

watch(
  () => userStore.getUser,
  () => {
    user.value = userStore.getUser
  }
)

const toggleBookmark = async (article: any) => {
  if (isBookmarked(article)) {
    const bookmarkId = user.value.bookmarks.find(
      (bookmark: any) => bookmark.link === article.link
    ).id
    await removeBookmarkArticle(bookmarkId)
    await userStore.getUserBookmarks(user.value.userId)
    console.log(user.value)
  } else {
    article = {
      title: article.title,
      link: article.link,
      description: article.description,
      imageLink: article.image,
      pubDate: article.pubDate,
      userId: user.value.userId
    }
    await addBookmarkArticle(article)
  }

  // Trigger a re-render by updating the user's bookmarks
  userStore.getUserBookmarks(user.value.userId)
}

const isBookmarked = (article: any) => {
  return user.value.bookmarks.some((bookmark: any) => bookmark.link === article.link)
}
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
  .flex-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bookmark {
      cursor: pointer;

      &:hover {
        opacity: 0.7;
        transition: 0.3s all ease-in-out;
      }
    }
    .bookmarked {
      font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    }
  }
}

.article.full-list .img-zoom {
  height: 400px;
}
</style>
