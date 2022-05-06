import React from 'react'
import { Link } from 'react-router-dom'
export default function HomePage() {
  return (
    <div>
        <h2>Aqui debe ir el home page!!!</h2>
        <Link to='/about'>about</Link>
    </div>
  )
}
