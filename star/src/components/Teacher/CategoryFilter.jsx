import React from 'react';

const CategoryFilter = ({ categoryName, categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="sm:text-xs md:text-sm flex justify-between items-center">
            <div className="block appearance-none bg-LightBlue border border-black hover:border-gray-400 p-2 py-3 leading-tight">
                <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className='outline-none bg-LightBlue'
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
