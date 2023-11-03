import axios from 'axios'
import * as cheerio from 'cheerio'
import { sources } from '@/assets/sources'

export const fetchAllArticles = async (
  latestArticle: any,
  regularArticles: any,
  allArticles: any,
  loading: any
) => {
  const fetchedArticles = []

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
          image = '/images/default_image.jpg'
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

  fetchedArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  const featured = fetchedArticles.slice(0, 1)
  const regular = fetchedArticles.slice(1, 8)

  latestArticle.value = featured
  regularArticles.value = regular
  allArticles.value = fetchedArticles
  loading.value = false

  return {
    featured,
    regular,
    allArticles: fetchedArticles
  }
}
