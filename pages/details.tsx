import React from 'react'
import Link from 'next/link'
import { SearchBarComponent } from '../component/common/SearchBar'

const details = () => {
  return (
    <div>details
        <Link href="/">
            <a>
                Go to Home
            </a>
        </Link>
        <SearchBarComponent />

    </div>
  )
}

export default details