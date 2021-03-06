import * as React from 'react'

export function Footer() {
  return (
    <footer className="bg-gray-100 flex-grow-0 p-6 block" id="footer">
      <div className="text-center">
        <p>
          Website made with{' '}
          <span role="img" aria-label="heart emoji">
            ♥︎
          </span>{' '}
          by{' '}
          {/* <a
            href="http://www.github.com/annacate"
            target="_blank"
            rel="noopener noreferrer"
          > */}
          Anna K{/* </a> */}
        </p>
      </div>
    </footer>
  )
}
