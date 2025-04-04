import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ProductInfoCard from "../components/productInfoCard";
import Navbar from "../components/navbar";
import CategoryBar from "../components/categoryBar";
import { useNavigate } from "react-router-dom";
import useGetProducts from "../hooks/useGetProducts";
import Footer from "../components/footer";
import { useContext } from "react";
import AppContext from "../context/appContext";

const HomePage = () => {
    
    const{setSearchText} = useContext(AppContext)
    const navigate = useNavigate();
    const openSearchPage = () => {
        navigate("/search");
    };

    const { products } = useGetProducts({isSearchTextDependent : false});
    
    
    let cnt = 0;
    const reqLength = 16;
    const filteredProducts = products.filter((elem, idx) => {
        if (Math.random() >= 0.5 || reqLength - cnt === products.length - idx) {
            if (cnt < reqLength) {
                cnt++;
                return true;
            } else return false;
        } else return false;
    });

    console.log(filteredProducts);
    const dummy = [0, 1, 2, 3]; // [...Array(4).keys()]
    return (
        <div className="homepage-root-container">
            <Navbar setSearchText={setSearchText} openSearchPage={openSearchPage} />
            <CategoryBar  />
            <div className="homepage-body">
                <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg"
                    className="carousal-image" 
                />
                <div className="products-cards-container">
                    {dummy.map((elem) => {
                        return <ProductInfoCard  data={filteredProducts.slice(elem * 4, elem * 4 + 4)} />;
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;