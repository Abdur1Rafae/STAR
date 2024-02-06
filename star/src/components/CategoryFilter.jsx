import React from 'react';

const CategoryFilter = ({ categoryName, categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="relative sm:text-xs md:text-sm flex justify-between items-center bg-#F4F9FD">
            <div className="block appearance-none bg-white border border-black hover:border-gray-400  p-2 rounded shadow leading-tight">
            <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className='outline-none'
            >
                <option value="">{categoryName}</option>
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
