import type { CartItemType } from "../page";
import { Wrapper } from "./cartitem.styles";
import { Button } from "@mui/material";

// type Props={
//     item: CartItemType
//     addToCart: (clickedItem: CartItemType)=> void;
//     removeFromCart: (id: number)=> void;
// }


export default function CartItem(props:{
  item: CartItemType;
  addToCart: (clickedItem: CartItemType)=> void;
  removeFromCart: (id: number)=> void;
}){
  return(<Wrapper>
    <div>
      <h3>{props.item.products.title}</h3>
      <div className='information'>
        <p>Price: ${props.item.products.price}</p>
        <p>Total: ${(props.item.products.amount * props.item.products.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='outlined'
          onClick={() => props.removeFromCart(props.item.products.id)}
        >
          -
        </Button>
        <p>{props.item.products.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='outlined'
          onClick={() => props.addToCart(props.item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={props.item.products.image} alt={props.item.products.title} />
  </Wrapper>)
};