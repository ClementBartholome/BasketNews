<template>
  <section class="box-results">
    <span
      class="yesterday"
      v-html="isArrowRight ? 'NBA<br />Hier' : 'NBA<br />Aujourd\'hui'"
    ></span>
    <span v-if="!games.length" class="no-games">Pas de matchs NBA joués hier</span>
    <article v-else v-for="game in games" :key="game.id" class="game">
      <router-link :to="`/boxscore/${game.id}`">
        <div class="column">
          <img :src="getTeamLogo(game.home_team.abbreviation)" alt="Logo" class="logo" />
          <img :src="getTeamLogo(game.visitor_team.abbreviation)" alt="Logo" class="logo" />
        </div>
        <div class="column">
          <span class="team">{{ game.home_team.abbreviation }}</span>
          <span class="team">{{ game.visitor_team.abbreviation }}</span>
        </div>
        <div class="column">
          <span
            v-if="game.status === 'Final'"
            class="score"
            :class="{
              winner: game.home_team_score > game.visitor_team_score,
              loser: game.home_team_score < game.visitor_team_score
            }"
            >{{ game.home_team_score }}</span
          >
          <span v-else class="game-time">{{ extractTime(game.status) }}</span>
          <span
            v-if="game.status === 'Final'"
            class="score"
            :class="{
              winner: game.visitor_team_score > game.home_team_score,
              loser: game.visitor_team_score < game.home_team_score
            }"
            >{{ game.visitor_team_score }}</span
          >
        </div>
      </router-link>
    </article>
    <button class="change-day" @click="toggleArrow">
      <span class="material-symbols-outlined">{{
        isArrowRight ? 'arrow_forward' : 'arrow_back'
      }}</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchNbaGames } from '@/api/api'
import { getTeamLogo } from '@/utils/UtilsFunctions'
import type { Game } from '@/types/types'

const games = ref<Game[]>([])
const isArrowRight = ref(true)

onMounted(async () => {
  await fetchYesterdayGames()
})

const fetchYesterdayGames = async () => {
  const date = new Date()
  const yesterday = new Date(date.setDate(date.getDate() - 1))
  const fetchedGames = await fetchNbaGames(yesterday)
  games.value = fetchedGames
}

const toggleArrow = () => {
  isArrowRight.value = !isArrowRight.value
  if (isArrowRight.value) {
    fetchYesterdayGames()
  } else {
    fetchTodayGames()
  }
}

const fetchTodayGames = async () => {
  const todayGames = await fetchNbaGames(new Date())
  games.value = todayGames
}

const extractTime = (status: string) => {
  if (status) {
    const rawTime = status.slice(11, 16)
    const time = new Date(`2000-01-01T${rawTime}:00Z`)
    time.setHours(time.getHours())

    return time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }
  return ''
}
</script>

<style scoped lang="scss">
.box-results {
  display: flex;
  align-items: center;
  max-width: 90vw;
  height: 140px;
  border-radius: 10px;
  overflow-x: auto;
  padding: 10px;
  background: var(--background-secondary);

  @media (max-width: 768px) {
    max-width: 80vw;
  }

  .yesterday {
    color: var(--text-color);
    border-right: 1px solid;
    padding-right: 10px;
  }

  .no-games {
    color: var(--text-color);
    font-size: 1.2rem;
    font-weight: bold;
    margin: 10px;
  }

  &::-webkit-scrollbar {
    height: 5px;

    &-track {
      background: #f1f1f1;
    }

    &-thumb {
      background: #888;
      border-radius: 5px;
    }
  }
}

.game a {
  margin: 10px;
  padding: 10px;
  gap: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 150px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    color: inherit;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .logo {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }
    .score {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 5px 0;
    }

    .winner {
      color: var(--text-color);
      font-weight: bold;
    }

    .loser {
      color: gray;
    }

    .team {
      font-size: 1.2rem;
      margin: 5px 0;
    }
  }
}

.change-day {
  margin-left: auto;
  color: var(--text-color);
}
</style>
