/**
 * @reference https://gist.github.com/kottenator/9d936eb3e4e3c3e02598?permalink_comment_id=2972387#gistcomment-2972387
 */
export function generatePageRange(
  currentPage: number,
  lastPage: number,
  delta = 2,
): (string | number)[] {
  // creates array with base 1 index
  const range: number[] = Array(lastPage)
    .fill(lastPage)
    .map((_, index) => index + 1)

  return range.reduce((prevVal, currVal) => {
    // allow adding of first and last pages
    if (currVal === 1 || currVal === lastPage) {
      return [...prevVal, currVal]
    }

    // if within delta range add page
    if (currVal - delta <= currentPage && currVal + delta >= currentPage) {
      return [...prevVal, currVal]
    }

    // otherwise add 'gap if gap was not the last item added.
    if (prevVal[prevVal.length - 1] !== '...') {
      return [...prevVal, '...']
    }

    return prevVal
  }, [] as (string | number)[])
}
