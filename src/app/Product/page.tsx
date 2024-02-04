"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge, Drawer, Grid } from "@mui/material";
import { useState } from "react";
import { api } from "~/trpc/react";
import { CartItemType } from "../page";
import { Wrapper } from "./Item/item.styles";
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Item from "./Item/page";
import { StyledButton } from "./product.styles";
import Cart from "./Cart/page";


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  export function LinearWithValueLabel() {
    const [progress, setProgress] = React.useState(10);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    );
  }

export default function StorePage(){
    const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch("https://fakestoreapi.com/products")).json();
    const {data, isLoading, error} = useQuery<CartItemType[]>(["products"], getProducts);
    console.log(data);

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    const getTotalItems = (items: CartItemType[]) =>
      items.reduce((ack: number, item)=> ack + item.amount, 0)
    ;
    const handleAddToCart = (clickedItem: CartItemType) => {
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
        }, [] as CartItemType[])
      );
    };

    if (isLoading) return <LinearWithValueLabel />;
    if (error) return <div>something went wrong...</div>
    
    return (
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
          <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
        </Drawer>
        <StyledButton onClick={()=>setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
            {data?.map(item => (
                <Grid item key={item.id} xs={12} sm={4}>
                    <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
            ))}
        </Grid>
      </Wrapper>
    )
  }