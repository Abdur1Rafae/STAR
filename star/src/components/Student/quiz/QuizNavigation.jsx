import React, { useEffect } from 'react';
import QuizStore from '../../../Stores/QuizStore';
import { ToggleStore } from '../../../Stores/ToggleStore';

const QuizNavigation = ({}) => {
  const showNav = ToggleStore(store => store.showNav)
 const filteredQuestions = QuizStore(store => store.filteredQuestions);
 const filterQuestions = QuizStore(store => store.filterQuestions)
 const currentQuestionIndex = QuizStore(store=> store.currentQuestionIndex)
 const setFilter = QuizStore(store => store.setFilter)
 const filter = QuizStore(store => store.filter)
 const changeQuestion = QuizStore(store => store.selectQuestionFromFiltered)

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value.toLowerCase();
    setFilter(selectedFilter);
  };

  useEffect(() => {
    filterQuestions();
  }, [filter]);

 return (
    <div className={`flex flex-col items-center w-full overflow-hidden ${showNav ? 'p-2 border-[1px]' : 'p-0 border-0'} bg-LightBlue rounded-md border-black shadow-md`}>
      <select name="cars" id="cars" className='mt-2 w-32 border-b-2 border-black h-8 bg-LightBlue font-semibold mb-4' onChange={handleFilterChange}>
          <option value="All">All Questions</option>
          <option value="Unanswered">Unanswered</option>
          <option value="Flagged">Flagged</option>
      </select>
      <div className="flex gap-2 flex-wrap">
          {filteredQuestions.map((question) => (
            <button className={`flex items-center justify-center h-8 w-8 ${currentQuestionIndex == question.number -1 ? 'bg-DarkBlue' : 'bg-slate-400' } text-white mb-4 p-2`} onClick={()=>changeQuestion(question.number)}>
              <h3 className="self-center">
                {question.number}
              </h3>
            </button>
          ))}
      </div>
    </div>
 );
};

export default QuizNavigation;
