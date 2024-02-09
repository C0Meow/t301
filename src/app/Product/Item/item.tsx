import Button from '@mui/material/Button';
import { Wrapper } from './item.styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import * as React from 'react';
import type { CartItemType, ItemProperty } from '../page';

// type Props = {
//     item: CartItemType;
//     handleAddToCart: (clickedItem: CartItemType) => void;
// }

export default function Item(props:{
    item: ItemProperty;
    handleAddToCart: (clickedItem: ItemProperty) => void;
}){
    return(
        <Wrapper>
        <img src={props.item.image} alt={props.item.title} />
        <div>
            <h3>{props.item.title}</h3>
            <p>{props.item.description}</p>
            <h3>${props.item.price}</h3>
        </div>
        <Button variant="outlined" onClick={()=>props.handleAddToCart(props.item)}><AddShoppingCartIcon/>Add to Cart</Button>
    </Wrapper>
    )
}
