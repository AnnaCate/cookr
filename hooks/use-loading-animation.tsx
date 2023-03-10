import React from 'react'

/**
 * @see https://codepen.io/aaroniker/pen/PoOvoaY
 */
export const useLoadingAnimation = () => {
	const ref = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		if (ref.current) {
			ref.current.classList.add('loading-animation')

			const style = getComputedStyle(ref.current)

			const lines = document.createElement('div')

			lines.classList.add('lines')

			const groupTop = document.createElement('div')
			const groupBottom = document.createElement('div')

			const svg = createSVG(
				ref.current.offsetWidth,
				ref.current.offsetHeight,
				Number.parseInt(style.borderRadius, 10),
			)

			groupTop.append(svg)
			groupTop.append(svg.cloneNode(true))
			groupTop.append(svg.cloneNode(true))
			groupTop.append(svg.cloneNode(true))

			groupBottom.append(svg.cloneNode(true))
			groupBottom.append(svg.cloneNode(true))
			groupBottom.append(svg.cloneNode(true))
			groupBottom.append(svg.cloneNode(true))

			lines.append(groupTop)
			lines.append(groupBottom)

			ref.current.append(lines)
		}
	}, [ref])

	const startLoading = () => {
		if (ref.current) ref.current.classList.add('start')
	}

	const endLoading = () => {
		if (ref.current) ref.current.classList.remove('start')
	}

	return { endLoading, ref, startLoading }
}

const createSVG = (width: number, height: number, radius: number) => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

	const rectangle = document.createElementNS(
		'http://www.w3.org/2000/svg',
		'rect',
	)

	svg.setAttributeNS(
		'http://www.w3.org/2000/svg',
		'viewBox',
		`0 0 ${width} ${height}`,
	)

	rectangle.setAttribute('x', '0')
	rectangle.setAttribute('y', '0')
	rectangle.setAttribute('width', '100%')
	rectangle.setAttribute('height', '100%')
	rectangle.setAttribute('rx', `${radius}`)
	rectangle.setAttribute('ry', `${radius}`)
	rectangle.setAttribute('pathLength', '10')

	svg.append(rectangle)

	return svg
}
