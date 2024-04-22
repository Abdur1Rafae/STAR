import React from 'react';

const CategoryFilter = ({ categoryName, categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="text-sm flex justify-between items-center h-6">
            <div className="bg-LightBlue border border-black rounded-sm hover:border-gray-400 h-6">
                <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className='outline-none bg-LightBlue rounded-md h-5'
                >
                    <option value={categoryName}>{categoryName}</option>
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
