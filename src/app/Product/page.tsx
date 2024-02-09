"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge, Drawer, Grid } from "@mui/material";
import { useState } from "react";
import { Wrapper } from "./Item/item.styles";
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Item from "./Item/item";
import { StyledButton } from "./product.styles";
import Cart from "./Cart/cart";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";
import LinearWithValueLabel from "./linearwithvaluelabel";
import NavigationBar from "../LoggedIn/navbar";

// export type CartItemType={
//   id: number;
//   category: string;
//   description: string;
//   image: string;
//   price: number;
//   title: string;
//   amount: number;
// };

export type CartItemType = RouterOutputs["products"]["getAll"][number];
export type ItemProperty = CartItemType["products"];


export default async function StorePage(){
    //const getProducts = async (): Promise<CartItemType[]> =>
    //await (await fetch("https://fakestoreapi.com/products")).json();

    // const getProducts = async (): Promise<ProductsType[]> => await api.products.getAll.useQuery();
    
    
    const {data, isLoading, error} = api.products.getAll.useQuery();
    console.log(data);

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as ItemProperty[]);

    const getTotalItems = (items: ItemProperty[]) =>
      items.reduce((ack: number, item)=> ack + item.amount, 0)
    ;
    const handleAddToCart = (clickedItem: ItemProperty) => {
      setCartItems(prev => {
        // 1. Is the item already added in the cart?
        const isItemInCart = prev.find(item => item.id === clickedItem.id);
  
        if (isItemInCart) {
          return prev.map(item =>
            item.id === clickedItem.id
              ? { ...item, amount: item.amount + 1 }
              : item
          );
        }
        // First time the item is added
        return [...prev, { ...clickedItem, amount: 1 }];
      });
    };
    const handleRemoveFromCart = (id: number) => {
      setCartItems(prev =>
        prev.reduce((ack, item) => {
          if (item.id === id) {
            if (item.amount === 1) return ack;
            return [...ack, { ...item, amount: item.amount - 1 }];
          } else {
            return [...ack, item];
          }
        }, [] as ItemProperty[])
      );
    };

    if (isLoading) return <LinearWithValueLabel />;
    if (error) return <div>something went wrong...</div>
    
    return (
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
          <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
        </Drawer>
        <NavigationBar/>
        <StyledButton onClick={()=>setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
            {data?.map(item => (
                <Grid item key={item.products.id} xs={12} sm={4}>
                    <Item item={item.products} handleAddToCart={handleAddToCart} />
                </Grid>
            ))}
        </Grid>
      </Wrapper>
    )
  }