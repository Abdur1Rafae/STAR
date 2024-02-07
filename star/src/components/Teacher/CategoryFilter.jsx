import React from 'react';

const CategoryFilter = ({ categoryName, categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="text-[10px] md:text-sm flex justify-between items-center">
            <div className="bg-LightBlue border border-black hover:border-gray-400 md:p-2 md:py-3">
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
