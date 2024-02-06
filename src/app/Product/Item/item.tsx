import Button from '@mui/material/Button';
import { Wrapper } from './item.styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import * as React from 'react';
import type { CartItemType } from '../page';

// type Props = {
//     item: CartItemType;
//     handleAddToCart: (clickedItem: CartItemType) => void;
// }

export default function Item(props:{
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}){
    return(
        <Wrapper>
        <img src={props.item.products.image} alt={props.item.products.title} />
        <div>
            <h3>{props.item.products.title}</h3>
            <p>{props.item.products.description}</p>
            <h3>${props.item.products.price}</h3>
        </div>
        <Button variant="outlined" onClick={()=>props.handleAddToCart(props.item)}><AddShoppingCartIcon/>Add to Cart</Button>
    </Wrapper>
    )
}
