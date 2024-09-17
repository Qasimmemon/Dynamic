// import axios from "axios";
// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";

// function Product() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Use effect Call Hogya");
//     const url = "https://dummyjson.com/products";
//     axios
//       .get(url)
//       .then((res) => {
//         setProducts(res.data.products);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto">
//       {loading ? (
//         <h1 className="text-center text-3xl">Loading....</h1>
//       ) : (
//         <div>
//           <div className="flex flex-wrap -m-4 my-4">
//             {products.map((item) => (

//               <ProductCard item={item} key={item.id} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Product;
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip"; // Assuming you have a CategoryChip component for filtering

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState(`Beauty`);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("All"); // Price range state

  // Predefined price ranges
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "$500+", min: 500, max: Infinity },
  ];

  // Fetch products based on the chosen category
  useEffect(() => {
    console.log("Use effect Call Hogya");
    setLoading(true); // Set loading to true every time category changes
    const url =
      chosenCategory === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${chosenCategory}`;
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [chosenCategory]); // Dependency on chosenCategory

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        console.log(res.data); // Check what you receive here
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get the selected price range from the dropdown
  const selectedPriceRange = priceRanges.find((range) => range.label === priceRange);

  // Filter products based on search term and price range
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const withinPriceRange =
      item.price >= selectedPriceRange.min && item.price <= selectedPriceRange.max;
    return matchesSearch && withinPriceRange;
  });

  return (
    <div className="container mx-auto">
      {loading ? (
        <h1 className="loader text-center text-3xl mx-auto my-44 "></h1>
      ) : (
        <div>
          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap">
            <CategoryChip
              onClick={() => setChosenCategory("All")}
              isChosen={chosenCategory === "All"}
              category={{
                slug: "All",
                name: "All",
              }}
            />
            {categories.map((category) => {
              // Ensure the category name is valid and capitalize the first letter
              console.log("category=>", category)

              return (
                <CategoryChip
                  onClick={() => setChosenCategory(category.slug)}
                  isChosen={category === chosenCategory}
                  category={{
                    slug: category.slug || "unknown", // Use 'unknown' as fallback slug
                    name: category.name, // Properly formatted name
                  }}
                />
              );
            })}
          </div>

          <div className=" " style={{ marginLeft: '400px', }}>
            <div className="my-4 flex gap-4">
              <>

                <div className="input-container">
                  <input
                    className="input"
                    name="text"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                  <label className="label" htmlFor="input">
                    Search Products
                  </label>
                  <div className="topline" ></div>
                  <div className="underline" ></div>
                </div>
              </>




              <div className="flex items-center">
                <label className="mr-2">Price Range:</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border p-2"
                >
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4 my-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard item={item} key={item.id} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
