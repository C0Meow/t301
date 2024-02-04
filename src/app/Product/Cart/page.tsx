import CartItem from "../CartItem/page";
import { Wrapper } from "./cart.styles";
import { CartItemType } from "~/app/page";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void;
}

const Cart: React.FC<Props> =({cartItems, addToCart, removeFromCart})=>{
    return( <Wrapper>
                <h1>Your Shopping Cart</h1>
                    {cartItems.length === 0 ? <p>No Items in Cart. </p> : null}
                    {cartItems.map(item=>(
                        <CartItem
                            key={item.id}
                            item={item}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}     
                        />
                ))}
    </Wrapper>)
}

export default Cart;
