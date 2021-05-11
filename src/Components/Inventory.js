import React, { useEffect,useState } from 'react'
import { Card,Button,Form } from 'react-bootstrap';
import { FaShoppingCart,FaBox } from "react-icons/fa";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
    apiKey: "AIzaSyDqf0m5t5dUvoKbIuSB8Xmi7EUOPHK17j8",
    authDomain: "luscaner-inventory.firebaseapp.com",
    projectId: "luscaner-inventory",
    storageBucket: "luscaner-inventory.appspot.com",
    messagingSenderId: "472402396081",
    appId: "1:472402396081:web:55cc54cbc21d5d6655b390"
});
const db = firebase.firestore();
//const storage = firebase.storage();

const Inventory = ({onClick=null,category=null}) => {
    const [items,setItems] = useState([]);
    const [itemQuantity,setItemQuantity] = useState(1);

    useEffect(() =>{
        const InventoryItems = db
                .collection('Inventory_Items')
                .limit(100)
                .onSnapshot(querySnapshot =>{
                    const data = querySnapshot.docs.map(doc =>({
                        ...doc.data(),
                        id:doc.id,
                    }));
                
                var datum = [];
                if(category !== null){
                    datum = data.filter((data) => data.Category.includes(category))
                }
                setItems(datum);
            })

        return InventoryItems;
        
    },[category]);
    const setQuantity = e => {
        setItemQuantity(e.target.value)
    }
    const addItem = (event,item) => {
        event.nativeEvent.stopImmediatePropagation();
        if(itemQuantity > 0){
            item.Quantity = itemQuantity;
            onClick(item)
        }
        else{
            alert("Please specify quantity")
        }
    }
    
    const sidenavAccess = () => {
        document.getElementById('SideNav').setAttribute("style", "width: 0px !important");
    }
    
    return (
        <div className="inventory-container" onClick={sidenavAccess}>
            {items.map(item => (
                <Card key={item.id} style={{ width: '18rem' }}>
                    {
                        Array.apply(null, { length: itemQuantity }).map((e, i) => (
                             <FaBox className="item-shadow" key={i} id={`item-shadow-${item.id}-${i}`}/>
                          ))  
                    }
                    <Card.Img variant="top" src="http://www.shutupandtakemyyen.com/wp-content/uploads/2020/07/Bag-of-Mini-Totoro-Plushies-300x300.jpg" />
                    <Card.Body>
                        <Card.Title>{item.Description}</Card.Title>
                            <Card.Text>
                            Category : {item.Category}
                            </Card.Text>
                            <Card.Text className="item-info">
                            In Stock : {item.Stocks}
                            </Card.Text>
                            <Card.Text className="item-info">
                            Price : {item.Price}
                            </Card.Text>
                        <Form.Control onChange={setQuantity} className="footer qty" id="qty" type="number" defaultValue={itemQuantity} min="1"></Form.Control>
                        <Button onClick={event => {addItem(event,item)}} className="footer but" variant="warning"><FaShoppingCart/> Add to Cart </Button>
                    </Card.Body>
                </Card>
            ))
            
            }
            </div>
    )
}

export default Inventory
