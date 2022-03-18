import React from 'react'
import { Tile as TileProps } from '../types'

export function Tile({ img, difficulty, meal, title, user }: TileProps) {
  return (
    <div className="h-64 w-64 m-2 rounded border bg-white shadow transform transition duration-300 hover:shadow-md hover:scale-105">
      <div className="relative">
        <div
          className="h-48 w-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm truncate-2nd">{title}</h3>
        <p className="text-xs text-gray-500">Submitted by: {user.name}</p>
      </div>
    </div>
  )
}
