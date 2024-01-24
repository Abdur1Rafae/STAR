import React from 'react'
import MenuBar from '../components/MenuBar'
import SubHeader from '../components/SubHeader'

const Demo = () => {
  return (
    <div className='h-[1200px] bg-green-100'>
        <MenuBar/>
        <SubHeader/>
        <div className='sticky top-0 w-12 bg-red-100 h-12'>

        </div>
    </div>
  )
}

export default Demo