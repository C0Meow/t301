import { CartItemType } from "~/app/page";
import { Wrapper } from "./cartitem.styles";
import { Button } from "@mui/material";

type Props={
    item: CartItemType
    addToCart: (clickedItem: CartItemType)=> void;
    removeFromCart: (id: number)=> void;

}

const CartItem: React.FC<Props>=({item, addToCart, removeFromCart})=>{
    return(<Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='outlined'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='outlined'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>)
}

export default CartItem;