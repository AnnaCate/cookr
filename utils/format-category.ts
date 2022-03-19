import startCase from 'lodash/startCase'

export function formatCategory(category: string): {
  value: string
  label: string
} {
  return {
    value: category,
    label: category
      .split('_')
      .map((word) => startCase(word))
      .join('/'),
  }
}
