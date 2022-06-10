import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBowlFood,
  faBreadSlice,
  faCookie,
  faChampagneGlasses,
  faDrumstickBite,
  faBacon,
  faCarrot,
  faAppleWhole,
  faJar,
} from '@fortawesome/free-solid-svg-icons'
import { Tile as TileProps } from '../../types'

export function Tile({ img, meal, title, user, originalSource }: TileProps) {
  const icon = getIconByCategory(meal)
  return (
    <div className="flex flex-col h-64 w-full xs:w-64 xs:m-2 rounded border bg-white shadow transform transition duration-300 xs:hover:shadow-md xs:hover:scale-105">
      <div className="flex items-center justify-center grow overflow-hidden relative">
        <figure className="h-48 w-full">
          {img ? (
            <img
              alt={`image of ${title}`}
              className="h-full w-full object-cover"
              src={img}
            />
          ) : (
            <div className="grow w-full flex justify-center items-center h-48 bg-gray-100">
              <FontAwesomeIcon
                className="opacity-20"
                icon={icon}
                style={{ width: '80px', height: '80px' }}
              />
            </div>
          )}
          {img && originalSource && (
            <figcaption
              className="absolute bottom-0 left-0 bg-gray-50 text-gray-400 text-xs whitespace-nowrap w-full"
              title={originalSource}
            >
              <a
                className="z-10"
                href={originalSource}
                rel="noopener"
                target="_blank"
              >
                {originalSource}
              </a>
            </figcaption>
          )}
        </figure>
      </div>
      <div className="p-3 w-full grow-0">
        <h3 className="text-sm truncate" title={title}>
          {title}
        </h3>
        <p className="text-xs text-gray-500">Submitted by: {user.name}</p>
      </div>
    </div>
  )
}

const getIconByCategory = (meal: string) => {
  switch (meal) {
    case 'appetizer':
      return faDrumstickBite
    case 'beverage':
      return faChampagneGlasses
    case 'breakfast_brunch':
      return faBacon
    case 'breakfast/brunch':
      return faBacon
    case 'bread':
      return faBreadSlice
    case 'dessert':
      return faCookie
    case 'main':
      return faBowlFood
    case 'side':
      return faCarrot
    case 'snack':
      return faAppleWhole
    case 'other':
      return faJar
    default:
      return faBowlFood
  }
}
