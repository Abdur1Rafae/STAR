import React from 'react'
import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';

const QuestionBanks = () => {
  return (
    <div className='flex flex-col gap-4'>
        <div className='md:w-3/4 w-full'>
            <SearchBar/>
        </div>
        <div className='flex flex-wrap gap-8'>
            <QuestionBankCard/>
            <QuestionBankCard/>
            <QuestionBankCard/>
            <QuestionBankCard/>
        </div>
    </div>
  )
}

export default QuestionBanks