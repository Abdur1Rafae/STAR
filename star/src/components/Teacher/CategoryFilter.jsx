import React from 'react';

const CategoryFilter = ({ categoryName, categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="text-sm flex justify-between items-center md:h-8 h-12">
            <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 md:h-8 h-12">
                <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className='outline-none bg-LightBlue rounded-md md:h-7 h-11'
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
