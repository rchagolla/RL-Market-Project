import React from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'

function HomePage() {
  const user = useCurrentUser();

  return (
    <div>HomePage</div>
  )
}

export default HomePage