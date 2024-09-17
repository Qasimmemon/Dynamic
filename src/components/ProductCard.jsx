function ProductCard({ item }) {
    const { thumbnail, category, title, price } = item;
  
    return (
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow ">
        <div className="card">
          <div className="card-image">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={thumbnail}
            />
          </div>
          <h3 className="card-body">{category}</h3>
          <p className="card-title">{title}</p>
          <p className="text-gray-300">
            <b>${price}</b>
          </p>
          <button>Add to cart</button>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  