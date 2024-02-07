import React from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import TopicContainer from '../../components/Teacher/TopicContainer'

const Library = () => {
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Library"} button={"New Bank"}/>
                <div className='p-4 md:pl-8 md:pt-8 flex flex-col gap-4 overflow-hidden'>
                    <TopicContainer topic={"History of Computers"}/>
                    <TopicContainer topic={"History of Computers"}/>
                    <TopicContainer topic={"History of Computers"}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Library