import { expect, describe, it } from 'vitest'
import { formatTime, formatDate } from '../src/utils/UtilsFunctions'

// Format time
describe('formatTime', () => {
  it('formats the time correctly', () => {
    const testDate = new Date('2023-11-14T15:30:00')

    // Call the function
    const result = formatTime(testDate)

    // Assert the result
    expect(result).toBe('15:30')
  })
})

// Format date
describe('formatDate', () => {
  it('formats the date and time correctly', () => {
    const testDate = new Date('2023-11-14T15:30:00')
    const result = formatDate(testDate)
    expect(result).toBe('14/11/2023 à 15:30')
  })
})
