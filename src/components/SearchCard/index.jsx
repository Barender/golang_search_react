import { useContext } from "react";
import ProductCard from "../ProductCard";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Context, actions } from "../../context";

function SearchCard({ searchProducts }) {
  const { dispatch } = useContext(Context);

  const deleteSearch = (searchTitle) => {
    dispatch({ type: actions.DELETE_SEARCH, payload: { searchTitle } });
  };

  return (
    <div className="flex flex-wrap justify-center">
      {searchProducts.map((searchItems, index) => (
        <div key={index} className="w-full mb-5 max-w-[56rem]">
          <div className="flex align-middle bg-gray-100 p-2">
            <h2 className="text-lg font-bold">
              {JSON.stringify(searchItems.searchTitle)}
            </h2>
            <TrashIcon
              onClick={() => deleteSearch(searchItems.searchTitle)}
              className="w-6 ml-4"
            />
          </div>

          <ProductCard products={searchItems.products} />
        </div>
      ))}
    </div>
  );
}

export default SearchCard;
