import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import './menu.css';
import './add_comment';


const Menu = () => {
    const [categories, setCategories] = useState([]);
    const getMaxRating = 5;


    useEffect(() => {
        getCategories();
    }, []);
    const getCategories = async () => {
        try {
            const response = await axios.get('/api/category/');
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    }
    const getRatingPercentage = (rating) => {
        return (rating / getMaxRating) * 100;
    };

return (
    <Row>
        <h3>Product list</h3>
        {categories.map((category) => (
            <div key={category.id}>
                <h2 style={{color: 'orangered'}}>{category.name}</h2>
                {category.products.map((prod) => (
                    <div key={prod.id} className="m-3 p-2">


                    <h5 key={prod.id}>{prod.name} - <strong>{prod.price}</strong> Lei<br /></h5>

                        Rating
                        <Row>
                            <Col lg='2' sm='4'>
                        <div className="rating-bar">
                <div
                  className="rating-fill"
                  style={{ width: `${getRatingPercentage(prod.reviews.length > 0 ?
                  (prod.reviews.reduce((totalStars, review) => totalStars + review.stars, 0) / prod.reviews.length).toFixed(1) :
                  0)}%` }}
                ></div>
                        </div>
                            </Col>
                        </Row>

                         <p>
                  {prod.reviews.length > 0 ?
                  (prod.reviews.reduce((totalStars, review) => totalStars + review.stars, 0) / prod.reviews.length).toFixed(1) :
                  'No rating yet'}
                         </p>

                        <>Ingrediente: </>
                        {prod.ingredients.map((ingr, index) => (
                        <span style={{color: 'firebrick'}}><small>{ingr.name}
                            {index < prod.ingredients.length - 1 && ', '}
                        </small></span>
                        ))}<br />

                        <div className='p-2'>
                        <>Comentarii:<br /></>
                        {prod.comments.map((com) => (
                            <span>{com.added} | {com.content}<br /></span>
                        ))}
                        </div>

                    </div>
                ))}
            </div>
        ))}
    </Row>
);
}

export default Menu;