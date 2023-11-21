<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo"></div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="filter-buttons menu">
      <button
        class="filter-button button"
        @click="filterArticles('')"
        :class="{ active: selectedSource === '' }"
        title="Voir tous les articles"
      >
        <span class="material-symbols-outlined">sports_basketball</span>
        <span class="text"> Tous</span>
      </button>
      <button
        v-for="source in sources"
        :key="source.name"
        class="filter-button button"
        @click="filterArticles(source.name)"
        :class="{ active: selectedSource === source.name }"
        :title="source.name"
      >
        <img :src="source.logo" class="material-symbols-outlined logo" alt="Logo" />
        <span class="text">
          {{ source.name }}
        </span>
      </button>

      <button class="filter-button button" @click="filterArticles('Signets')">
        <span class="material-symbols-outlined bookmarks"> bookmarks </span>
        <span class="text"> Signets</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { Source } from '@/types/types'

defineProps({
  sources: { type: Array as PropType<Source[]>, required: true },
  selectedSource: String,
  filterArticles: { type: Function, required: true },
  fetchAllArticles: { type: Function, required: true }
})

const savedIsExpanded = localStorage.getItem('is_expanded')
const is_expanded = ref(savedIsExpanded === 'true')

const toggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem('is_expanded', is_expanded.value.toString())
}
</script>

<style lang="scss" scoped>
.filter-button.active {
  background-color: #007bff;
  color: #fff;
}
.logo {
  height: 32px;
  width: 32px;

  @media (max-width: 425px) {
    height: 26px;
    width: 26px;
  }
}

.bookmarks {
  font-size: 32px;
  cursor: pointer;
}

aside {
  display: flex;
  flex-direction: column;
  grid-column: 1;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  position: fixed;
  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-symbols-outlined {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;

        @media (max-width: 425px) {
          font-size: 1.5rem;
        }
      }

      &:hover {
        .material-symbols-outlined {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    @media (max-width: 425px) {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .button {
      width: 100%;
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-symbols-outlined {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;

        @media (max-width: 425px) {
          font-size: 1.6rem;
        }
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-symbols-outlined,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-symbols-outlined,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-symbols-outlined {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    z-index: 99;
  }

  @media (max-width: 425px) {
    width: calc(2rem + 8px);

    .menu .button {
      padding: 0.5rem;
    }
  }
}
</style>
