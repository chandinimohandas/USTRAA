import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/Star';
import './../styles/product-card.css';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import { Button } from '@material-ui/core';

export default function ProductCard(props) {
  const { image, name, rating, weight, weightUnit, price, finalPrice, inStock } = props;
  return (
    <Card className="root">
      <CardActionArea>
        <CardMedia className="image" image={image} />
        <CardContent className="content">
          <div className="title">{name}</div>
          <div className="rating">{rating || ''}
            {rating && <StarIcon style={{ paddingLeft: 2, fontSize: 11 }} />}
          </div>
          <div className="weight">{weight ? `(${weight}${weightUnit})` : ''}</div>
          <div className="price">{`₹ ${price}`}</div>
          <div className="dash">{`₹ ${finalPrice}`}</div>
        </CardContent>
      </CardActionArea>
      <CardActions><Button className="cardButton" disabled={!inStock}>{inStock ? 'ADD TO CART' : 'OUT OF STOCK'}</Button></CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  weight: PropTypes.number,
  weightUnit: PropTypes.string,
  price: PropTypes.number,
  finalPrice: PropTypes.number,
  inStock: PropTypes.bool
};