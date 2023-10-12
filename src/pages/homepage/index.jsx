import { useContext, useRef, useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import SearchCard from "../../components/SearchCard";
import { Context, actions } from "../../context";

const Homepage = () => {
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef();

  const handleSubmit = async (e) => {
    const search = searchInput.current.value;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/getFilteredProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
        }
      );
      const { product } = await response.json();

      const filteredProducts = product.filter((item) => {
        const searchWords = search.toLowerCase().split(" ");
        let matchCount = 0;

        if (searchWords.length < 2) {
          return Object.values(item).some((value) => {
            return value.toLowerCase().includes(searchWords[0]);
          });
        }

        for (let i = 0; i < searchWords.length - 1; i++) {
          for (let j = i + 1; j < searchWords.length; j++) {
            const word1 = searchWords[i];
            const word2 = searchWords[j];

            if (
              (item.brand_name.toLowerCase().includes(word1) &&
                item.product_name.toLowerCase().includes(word2)) ||
              (item.brand_name.toLowerCase().includes(word2) &&
                item.product_name.toLowerCase().includes(word1)) ||
              (item.brand_name.toLowerCase().includes(word1) &&
                item.category.toLowerCase().includes(word2)) ||
              (item.brand_name.toLowerCase().includes(word2) &&
                item.category.toLowerCase().includes(word1)) ||
              (item.brand_name.toLowerCase().includes(word1) &&
                item.location.toLowerCase().includes(word2)) ||
              (item.brand_name.toLowerCase().includes(word2) &&
                item.location.toLowerCase().includes(word1)) ||
              (item.product_name.toLowerCase().includes(word1) &&
                item.category.toLowerCase().includes(word2)) ||
              (item.product_name.toLowerCase().includes(word2) &&
                item.category.toLowerCase().includes(word1)) ||
              (item.product_name.toLowerCase().includes(word1) &&
                item.location.toLowerCase().includes(word2)) ||
              (item.product_name.toLowerCase().includes(word2) &&
                item.location.toLowerCase().includes(word1)) ||
              (item.category.toLowerCase().includes(word1) &&
                item.location.toLowerCase().includes(word2)) ||
              (item.category.toLowerCase().includes(word2) &&
                item.location.toLowerCase().includes(word1))
            ) {
              matchCount++;
            }
          }
        }

        return matchCount >= 2;
      });

      dispatch({
        type: actions.APPEND_SEARCH,
        payload: { searchTitle: search, products: filteredProducts },
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: actions.APPEND_SEARCH,
        payload: { searchTitle: search, products: [] },
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="pb-24 pt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SearchCard searchProducts={state.searches} />
      )}
      <div className="p-6 pl-16 lg:ml-72 bg-white text-gray-600 focus-within:text-gray-400 fixed left-0 right-0 bottom-0">
        <div className="mb-2 text-lg font-bold">New Search (+)</div>
        <div className="flex">
          <input
            type="search"
            name="search"
            className="w-full py-2 h-12 text-sm border-gray-900 pl-5 rounded-[2rem] ring-offset-0 focus:shadow-none bg-white  focus:border-black focus:shadow-black  focus:text-gray-900"
            placeholder="Search..."
            ref={searchInput}
            autoComplete="off"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-1 w-fit"
            disabled={loading}
          >
            <MagnifyingGlassCircleIcon
              className="bg-slate-900 rounded-[2rem]"
              width={35}
              stroke="white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
