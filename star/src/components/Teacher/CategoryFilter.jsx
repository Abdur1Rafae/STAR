import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, assigning}) => {
    return (
        <div className="text-sm flex justify-between items-center h-8 max-w-12 overflow-hidden border-black border  hover:border-gray-400">
            <div className="bg-LightBlue rounded-sm h-8">
                <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className='outline-none bg-LightBlue rounded-md h-7'
                >
                    {
                        assigning ? 
                        <option value={'All'}>
                            All
                        </option>
                        : ''
                    }
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                    
                </select>

            </div>
        </div>
    );
};

export default CategoryFilter;
