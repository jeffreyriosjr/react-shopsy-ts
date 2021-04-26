import { useState, useEffect } from 'react';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      let prods = await (
        await fetch('https://fakestoreapi.com/products')
      ).json();
      // console.log(prods)

      setProducts(prods);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div id='home'>
      <div className='row text-center'>
        <div className='col'>
          <h2>Home Page!</h2>
        </div>
      </div>
      <div className="row">
        <ul className="list-group">
          {products.map((product, index) => {
            return (
              <li className="list-group-item" key={index}>
              {product.title}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;