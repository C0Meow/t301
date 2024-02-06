import CartItem from "../CartItem/cartitem";
import { Wrapper } from "./cart.styles";
import type { CartItemType } from '../page';

// type Props = {
//     cartItems: CartItemType[];
//     addToCart: (clickedItem: CartItemType) => void;
//     removeFromCart: (id: number) => void;
//   };
  
// const Cart: React.FC<Props> =({cartItems, addToCart, removeFromCart})=>{
//     return( <Wrapper>
//                 <h1>Your Shopping Cart</h1>
//                     {cartItems.length === 0 ? <p>No Items in Cart. </p> : null}
//                     {cartItems.map(item=>(
//                         <CartItem
//                             key={item.id}
//                             item={item}
//                             addToCart={addToCart}
//                             removeFromCart={removeFromCart}     
//                         />
//                 ))}
//     </Wrapper>)
// }

// export default Cart;



export default function Cart(props: {
    cartItems: CartItemType[],
    addToCart: (clickedItem: CartItemType) => void,
    removeFromCart: (id: number) => void,
  }){
    return( <Wrapper>
        <h1>Your Shopping Cart</h1>
            {props.cartItems.length === 0 ? <p>No Items in Cart. </p> : null}
            {props.cartItems.map(item=>(
                <CartItem
                    key={item.products.id}
                    item={item}
                    addToCart={props.addToCart}
                    removeFromCart={props.removeFromCart}     
                />
        ))}
</Wrapper>)
};
