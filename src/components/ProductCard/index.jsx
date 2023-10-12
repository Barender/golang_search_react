function ProductCard({ products }) {
  return (
    <div className=" lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="relative mt-8">
        <div className="relative -mb-6 w-full overflow-x-auto pb-6">
          <ul
            role="list"
            className="w-max mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid grid-flow-col lg:gap-x-8 lg:space-x-0"
          >
            {products?.map((product) => (
              <li
                key={product.product_name}
                className="w-fit inline-flex  flex-col text-center bg-white rounded-lg shadow-lg p-4 mr-3"
              >
                <div className="group flex-col relative flex flex-wrap -mx-2 justify-center ">
                  <h3 className=" text-gray-900 text-md font-bold mt-2 whitespace-nowrap">
                    Brand : {product.brand_name}
                  </h3>
                  <div className="aspect-h-1 aspect-w-1   overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={product.imageSrc || "/images.png"}
                      alt={product.imageAlt}
                      className="max-w-[16rem] h-full w-full object-cover object-center group-hover:opacity-75 min-h-[8rem]"
                      height={32}
                    />
                  </div>
                  <div className="mt-6">
                    <p>Product(s):</p>
                    <h3 className="mt-1 font-semibold text-gray-900">
                      <a href={"#"}>
                        <span className="absolute inset-0" />
                        {product.name}
                        {product.product_name}
                      </a>
                    </h3>
                    <p className="mt-1 text-gray-900">{product.price}</p>
                  </div>
                </div>

                <h4 className="sr-only"></h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
