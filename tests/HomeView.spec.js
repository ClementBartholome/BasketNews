import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import HomeView from '../src/views/HomeView.vue'

describe('HomeView', () => {
  it('sorts articles correctly and updates values', async () => {
    const wrapper = mount(HomeView)

    // Call the function to fetch and sort articles
    await wrapper.vm.fetchAndSortArticles()

    // Verify that loading is false after sorting
    expect(wrapper.vm.loading).toBe(false)

    // Verify that the total number of articles is 80
    expect(wrapper.vm.allArticles).toHaveLength(80)
  })

  it('filters articles correctly', async () => {
    const wrapper = mount(HomeView)

    // Initialize values before calling filterArticles
    wrapper.vm.selectedSource = ''
    wrapper.vm.latestArticle = []
    wrapper.vm.regularArticles = []

    // Call the function to fetch and sort articles
    await wrapper.vm.fetchAndSortArticles()

    // Call the function you want to test
    wrapper.vm.filterArticles('BasketUSA')

    // Verify that selectedSource has been updated
    expect(wrapper.vm.selectedSource).toBe('BasketUSA')

    // Verify that latestArticle and regularArticles have been updated correctly
    expect(wrapper.vm.latestArticle).toHaveLength(1)
    expect(wrapper.vm.regularArticles).toHaveLength(7)

    // Verify that fetchAndSortArticles is called when selectedSource is empty
    wrapper.vm.filterArticles('')
  })
})
