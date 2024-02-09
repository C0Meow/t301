import type { CartItemType, ItemProperty } from "../page";
import { Wrapper } from "./cartitem.styles";
import { Button } from "@mui/material";

// type Props={
//     item: CartItemType
//     addToCart: (clickedItem: CartItemType)=> void;
//     removeFromCart: (id: number)=> void;
// }


export default function CartItem(props:{
  item: ItemProperty;
  addToCart: (clickedItem: ItemProperty)=> void;
  removeFromCart: (id: number)=> void;
}){
  return(<Wrapper>
    <div>
      <h3>{props.item.title}</h3>
      <div className='information'>
        <p>Price: ${props.item.price}</p>
        <p>Total: ${(props.item.amount * props.item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='outlined'
          onClick={() => props.removeFromCart(props.item.id)}
        >
          -
        </Button>
        <p>{props.item.amount}</p>
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
    <img src={props.item.image} alt={props.item.title} />
  </Wrapper>)
};