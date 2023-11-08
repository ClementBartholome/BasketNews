import axios from 'axios'
import * as cheerio from 'cheerio'
import { sources } from '@/assets/sources'

export const fetchAllArticles = async () => {
  const fetchedArticles = []
  console.log('Fetching articles...')

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
          image =
            'https://raw.githubusercontent.com/ClementBartholome/BasketNews/main/public/images/default_image.jpg'
        }

        if (source.name === 'BasketUSA') {
          const correctDate = new Date(item.pubDate)
          correctDate.setHours(correctDate.getHours() + 1)
          item.pubDate = correctDate
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
  console.log(fetchedArticles)
  return fetchedArticles
}

export const fetchNbaGames = async (currentDate: Date) => {
  const apiUrl = 'https://www.balldontlie.io/api/v1/games?'

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  const startDate = `${year}-${month}-${day}`

  const endDate = `${year}-${month}-${day}`

  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate
  })

  const response = await axios.get(apiUrl + params.toString())
  return response.data.data
}

export const fetchBoxScore = async (gameId: number) => {
  const apiUrl = `https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameId}&per_page=100`

  const response = await axios.get(apiUrl)
  return response.data.data
}
