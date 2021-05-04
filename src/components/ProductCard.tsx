import React from 'react';
import { Link, useHistory } from 'react-router-dom';

interface CardProps {
    product: Product;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
    const history = useHistory();

            return (
             <div className="card h-100 product-card-hover justify-content-between flex-column d-flex">
                    
                    <span 
                    className='' 
                    onClick={() => history.push(`/products/${product.id}`)}>
                        {/* img-on-top */}
                    <div className="sh-card-img">
                        <div className="sh-bg-img" 
                        style={{ backgroundImage: `url(${product.image})` }}></div>
                    </div>

                    {/* {Card Body} */}
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </h5>
                      <div className='d-flex justify-content-between align-items-center'>
                        <strong>${product.price}</strong>
                        <span className="badge badge-warning">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    </span>

                    {/* {Card Footer} */}
                    <div className="card-footer">
                      <button className="btn btn-block btn-primary">Add to Cart</button>
                    </div>
                    </div>      
    );
};

export default ProductCard;