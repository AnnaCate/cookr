/**
 * @reference https://gist.github.com/kottenator/9d936eb3e4e3c3e02598?permalink_comment_id=2972387#gistcomment-2972387
 */
export function generatePageRange(
  currentPage: number,
  lastPage: number,
  delta = 2,
) {
  // creates array with base 1 index
  const range = Array(lastPage)
    .fill(lastPage)
    .map((_, index) => index + 1)

  return range.reduce((pages, page) => {
    // allow adding of first and last pages
    if (page === 1 || page === lastPage) {
      return [...pages, page]
    }

    // if within delta range add page
    if (page - delta <= currentPage && page + delta >= currentPage) {
      return [...pages, page]
    }

    // otherwise add 'gap if gap was not the last item added.
    if (pages[pages.length - 1] !== '...') {
      return [...pages, '...']
    }

    return pages
  }, [])
}
