import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import CategoryBar from '../components/categoryBar';
import Footer from '../components/footer';
import useGetProducts from '../hooks/useGetProducts';
import { useContext } from 'react';
import AppContext from '../context/appContext';

const SearchPage = (props) => {
    
    const { products, loading } = useGetProducts({isSearchTextDependent : true});
    const navigate = useNavigate()
    const handleProductInfo = (id) => {
        navigate(`/search/${id}`);
    };

    const {addToCart} = useContext(AppContext)

    return (
        <>
            <Navbar  />
            <CategoryBar  />
            {loading ? (
                <div className="product-loading">
                    <img src="../img/loading.gif" alt="Loading..." />
                    🙏🏻 Please Wait, Products 👜 are Loading...</div>
                
            ) : (
                <div className="products-container">
                    {products.map((elem) => (
                        <div key={elem.id} className="product-card" >
                            <img src={elem.thumbnail} alt={elem.title} className="product-image"onClick={() => handleProductInfo(elem.id)} />
                            <div className="product-info" >
                                <h2 className="product-title">{elem.title}</h2>
                                <p className="product-description">{elem.description}</p>
                                <div className="product-rating">
                                    {elem.rating} out of 5 stars
                                    <span className="rating-count">({elem.stock} in stock)</span>
                                </div>
                                <p className="product-price">${elem.price}</p>
                                <button onClick={()=>{addToCart(elem)}} className="add-to-cart-button"  >Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </>
    );
};

export default SearchPage;
