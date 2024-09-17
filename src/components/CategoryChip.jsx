function CategoryChip({ category, isChosen, onClick }) {
    
    return (
      <div
        onClick={onClick}
        className={`cursor-pointer px-4 py-2 rounded-full ${
          isChosen ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {category.name}
        
      </div>
    );
  }
  
  export default CategoryChip;
  