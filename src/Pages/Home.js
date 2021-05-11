import React, { useState } from 'react'
import {Container,Col,Row } from 'react-bootstrap';
import NavBar from '../Components/NavigationBar'
import Cashier from '../Components/Cashier'
import Inventory from '../Components/Inventory'
import SideNavItems from '../Components/SideNavItems'
import ToastMessage from '../Components/ToastMessage'
import { FaShoppingCart } from 'react-icons/fa';

const Home = () => {
    const [Items,setItems] = useState([]);
    const [category,setCategory] = useState("")
    const [showToast, setShowToast] = useState(false);
    const [openCashier, setOpenCashier] = useState(false);
  
    const toggleShow = () => {
        setShowToast(!showToast)
    };

    const onAddItem = (item) => {
        const data = [];
        const tempData = [];
        tempData.push(...Items)

        var found = false;
        for(var i = 0; i < tempData.length; i++) {
            if (tempData[i].id === item.id) {
                found = true;
                break;
            }
        }
        
    
        if(!found){
            data.push(...Items,item)
            returnShadow(item.id,item.Quantity)
            AnimateAdd(item.id,item.Quantity)
            
            
            var elements = document.getElementsByClassName("qty");
            for(var is = 0; is < elements.length; is++) {
                elements[is].value = 1;
             }
        }
        else{
            document.getElementById(`inventory-row-${item.id}`).setAttribute("style", "none")
            document.getElementById(`inventory-row-${item.id}`).setAttribute("style", "animation: mymove 1s 1");
            setTimeout(() => {document.getElementById(`inventory-row-${item.id}`).setAttribute("style", "none")},500);
            data.push(...Items)
        }
        setItems(data)
    }
    const AnimateAdd = (id,itemQuantity) => {
        var cartPosition = []
        var animationSpeed = 1;
        var i =0;
        for(i = 0;i < itemQuantity;i++){
            cartPosition = ({
                left : (window.scrollY + document.querySelector('#cart-icon').getBoundingClientRect().left + 100) -
                (window.scrollY + document.querySelector(`#item-shadow-${id}-${i}`).getBoundingClientRect().left),
                top : (window.scrollY + document.querySelector('#cart-icon').getBoundingClientRect().top)-
                (window.scrollY + document.querySelector(`#item-shadow-${id}-${i}`).getBoundingClientRect().top)
            })
            document.getElementById(`item-shadow-${id}-${i}`).setAttribute("style",
           `z-index:99999 !important;left: ${cartPosition.left}px !important;top: ${cartPosition.top}px !important;width:0px !important;height:0px !important;transition: all ${animationSpeed}s ease !important;`)
           animationSpeed = (animationSpeed/1.5)+.1;
        }
    }
    const returnShadow = (id,itemQuantity) => {
        Array.apply(null, { length: itemQuantity }).map((e, i) => (
        document.getElementById(`item-shadow-${id}-${i}`).setAttribute("style", 
        `z-index:-1 !important;left: 0px !important;top: 0px !important;width:286px !important;height:478px !important;`)
        )) 
    }

    const addCategory = (ctgry) => {
        setCategory(ctgry)
    }
    const deleteRow = (id) => {
        var datum = [];
        datum = Items.filter((item) => item.id !== id)
        setItems(datum);
    }
    const CashierHandler = () => {
        if(!openCashier){
          document.getElementById('cashier-container').setAttribute("style", "width: 33.3333333333% !important");
          setOpenCashier(true)
        }
        else{
          document.getElementById('cashier-container').setAttribute("style", "width: 0% !important");
          setOpenCashier(false)
        }
      }
      
    return (
        <Container>
        <Row>
            <Col className="SideNav" id="SideNav" sm={4}>
                <SideNavItems showToast={()=>{toggleShow()}}></SideNavItems>
            </Col>
            <Col className="cont">
                <ToastMessage toggleShow={()=>{toggleShow()}} showToast={showToast}/>
                <NavBar getCategory={addCategory}></NavBar>
                <div className="open-cashier" onClick={CashierHandler}>
                    <FaShoppingCart id="cart-icon"/>CART
                </div>
                <Inventory onClick={onAddItem} category={category}></Inventory>
            </Col>
            <Col sm={4} className="cashier-container" id="cashier-container">
                <Cashier deleteRow={deleteRow} items={Items} ></Cashier>
            </Col>
            
        </Row>
        </Container>
    )
}

export default Home
