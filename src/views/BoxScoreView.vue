<template>
  <HeaderItem />
  <main>
    <BoxResults />
    <h2 v-if="!boxScore.length" style="display: flex; justify-content: center">
      Le match n'a pas commencé
    </h2>
    <section v-else class="box-score">
      <div class="box-score-header" v-if="homeTeamPlayers[0]">
        <img :src="getTeamLogo(homeTeamPlayers[0].team.abbreviation)" alt="Logo" class="logo" />
        <h3>
          {{ homeTeamPlayers[0].team.full_name }} / {{ homeTeamPlayers[0].game.home_team_score }}
        </h3>
      </div>
      <table class="home-team">
        <thead>
          <tr>
            <th>Player</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>MIN</th>
            <th>FG</th>
            <th>3P</th>
            <th>FT</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>STL</th>
            <th>BLK</th>
            <th>PF</th>
            <th>TO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in sortPlayers(homeTeamPlayers)" :key="index">
            <td>
              <span class="name"> {{ player.player.first_name }} {{ player.player.last_name }}</span
              ><span class="position">{{ player.player.position }}</span>
            </td>
            <td v-if="player.min !== '00'">{{ player.pts }}</td>
            <td v-if="player.min !== '00'">{{ player.reb }}</td>
            <td v-if="player.min !== '00'">{{ player.ast }}</td>
            <td v-if="player.min !== '00'">{{ player.min }}</td>
            <td v-if="player.min !== '00'" :title="(player.fg_pct * 100).toFixed(1) + '%'">
              {{ player.fgm }}/{{ player.fga }}
            </td>
            <td v-if="player.min !== '00'" :title="(player.fg3_pct * 100).toFixed(1) + '%'">
              {{ player.fg3m }}/{{ player.fg3a }}
            </td>
            <td v-if="player.min !== '00'" :title="(player.ft_pct * 100).toFixed(1) + '%'">
              {{ player.ftm }}/{{ player.fta }}
            </td>
            <td v-if="player.min !== '00'">{{ player.oreb }}</td>
            <td v-if="player.min !== '00'">{{ player.dreb }}</td>
            <td v-if="player.min !== '00'">{{ player.stl }}</td>
            <td v-if="player.min !== '00'">{{ player.blk }}</td>
            <td v-if="player.min !== '00'">{{ player.pf }}</td>
            <td v-if="player.min !== '00'">{{ player.turnover }}</td>
            <td v-else colspan="20">DNP</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div class="box-score-header" v-if="awayTeamPlayers[0]">
        <img :src="getTeamLogo(awayTeamPlayers[0].team.abbreviation)" alt="Logo" class="logo" />
        <h3 v-if="awayTeamPlayers[0]">
          {{ awayTeamPlayers[0].team.full_name }} / {{ awayTeamPlayers[0].game.visitor_team_score }}
        </h3>
      </div>
      <table class="away-team">
        <thead>
          <tr>
            <th>Player</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>MIN</th>
            <th>FG</th>
            <th>3P</th>
            <th>FT</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>STL</th>
            <th>BLK</th>
            <th>PF</th>
            <th>TO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in sortPlayers(awayTeamPlayers)" :key="index">
            <td>
              <span class="name"> {{ player.player.first_name }} {{ player.player.last_name }}</span
              ><span class="position">{{ player.player.position }}</span>
            </td>
            <td v-if="player.min !== '00'">{{ player.pts }}</td>
            <td v-if="player.min !== '00'">{{ player.reb }}</td>
            <td v-if="player.min !== '00'">{{ player.ast }}</td>
            <td v-if="player.min !== '00'">{{ player.min }}</td>
            <td v-if="player.min !== '00'" :title="(player.fg_pct * 100).toFixed(1) + '%'">
              {{ player.fgm }}/{{ player.fga }}
            </td>
            <td v-if="player.min !== '00'" :title="(player.fg3_pct * 100).toFixed(1) + '%'">
              {{ player.fg3m }}/{{ player.fg3a }}
            </td>
            <td v-if="player.min !== '00'" :title="(player.ft_pct * 100).toFixed(1) + '%'">
              {{ player.ftm }}/{{ player.fta }}
            </td>
            <td v-if="player.min !== '00'">{{ player.oreb }}</td>
            <td v-if="player.min !== '00'">{{ player.dreb }}</td>
            <td v-if="player.min !== '00'">{{ player.stl }}</td>
            <td v-if="player.min !== '00'">{{ player.blk }}</td>
            <td v-if="player.min !== '00'">{{ player.pf }}</td>
            <td v-if="player.min !== '00'">{{ player.turnover }}</td>
            <td v-else colspan="20">DNP</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchBoxScore } from '@/api/api'
import { getTeamLogo } from '@/utils/UtilsFunctions'
import HeaderItem from '@/components/HeaderItem.vue'
import BoxResults from '@/components/BoxResults.vue'
import type { Player } from '@/types/types'

const route = useRoute()
const gameId = computed(() => Number(route.params.id))
const boxScore = ref<Player[]>([])

onMounted(async () => {
  await setBoxScore()
  console.log(boxScore.value)
})

watch(gameId, async () => {
  await setBoxScore()
})

const setBoxScore = async () => {
  boxScore.value = await fetchBoxScore(gameId.value)
}

const homeTeamPlayers = computed(() =>
  boxScore.value.filter((player) => player.player.team_id === player.game.home_team_id)
)

const awayTeamPlayers = computed(() =>
  boxScore.value.filter((player) => player.player.team_id === player.game.visitor_team_id)
)

const sortPlayers = (players: Player[]) => {
  return players.sort((a, b) => {
    if (a.min === '00' && b.min === '00') {
      return 0
    } else if (a.min === '00') {
      return 1
    } else if (b.min === '00') {
      return -1
    } else {
      return Number(b.min) - Number(a.min)
    }
  })
}
</script>

<style scoped lang="scss">
a {
  grid-column: 1 / span 2;
}
main {
  grid-column: 1 / span 2;
}

hr {
  margin: 20px 0;
}

header {
  grid-column: 1 / span 2 !important;
}

.logo {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.box-results {
  margin: 0 auto;
}
.box-score {
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px;

  .home-team,
  .away-team {
    margin-top: 20px;
  }
  .box-score-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
  }

  th,
  td {
    padding: 8px;
    text-align: left;

    .name {
      color: #347fcf;
    }

    .position {
      margin-left: 0.25rem;
      font-weight: 900;
      font-size: 0.7rem;
    }
  }

  th {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  td[colspan='20'] {
    text-align: left;
    font-weight: bold;
  }
}
</style>
