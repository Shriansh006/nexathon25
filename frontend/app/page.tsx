import Link from 'next/link';
import React from 'react'

const Landing = () => {
  return (
    <div className='flex flex-col'>
        <span>Landing Page</span>

        <Link href={"/ide"}>IDE</Link>
        <Link href={"/publish"}>Publish</Link>
    </div>
  )
}

export default Landing;