<template>
  <span v-if="!games">Pas de matchs joués hier</span>
  <section v-else class="box-results">
    <span>NBA<br />Hier</span>
    <article v-for="game in games" :key="game.id" class="game">
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
            class="score"
            :class="{
              winner: game.home_team_score > game.visitor_team_score,
              loser: game.home_team_score < game.visitor_team_score
            }"
            >{{ game.home_team_score }}</span
          >
          <span
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchNbaGames } from '@/api/api'
import { getTeamLogo } from '@/utils/UtilsFunctions'
import type { Game } from '@/types/types'

const games = ref<Game[]>([])

onMounted(async () => {
  await fetchGames()
  console.log(games.value)
})

const fetchGames = async () => {
  const fetchedGames = await fetchNbaGames(new Date())
  games.value = fetchedGames
}
</script>

<style scoped lang="scss">
.box-results {
  display: flex;
  align-items: center;
  max-width: 90vw;

  @media (max-width: 768px) {
    max-width: 80vw;
  }

  overflow-x: auto;

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
</style>
