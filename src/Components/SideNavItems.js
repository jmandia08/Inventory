import React,{useState,useEffect} from 'react'
import { Navbar,Nav,Modal,Button,Card,Form } from 'react-bootstrap';
import {FaSortNumericUpAlt} from 'react-icons/fa'
import {CgExtensionAdd} from 'react-icons/cg'
import AddItems from './AddItems'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const db = firebase.firestore();

const SideNavItems = ({showToast=null}) => {
    const [items,setItems] = useState([]);
    const [itemShow, setItemShow] = useState(false);
    const [stockShow, setStockShow] = useState(false);
    const handleItemClose = () => {
        setItemShow(false);
    }
    const handleItemShow = () => {
        setItemShow(true);
        document.getElementById("sideNavOpener").click();
    }
    const handleStockClose = () => setStockShow(false);
    const handleStockShow = () => setStockShow(true);

    useEffect(() =>{
        const InventoryItems = db
                .collection('Inventory_Items')
                .limit(100)
                .onSnapshot(querySnapshot =>{
                    const data = querySnapshot.docs.map(doc =>({
                        ...doc.data(),
                        id:doc.id,
                    }));
                
                setItems(data);
            })

        return InventoryItems;
        
    },[]);
    const handleOnSubmit = () =>{
        if(db){
            
            db.collection('Inventory_Items').add({
                Description: document.getElementById("item-description").value,
                Category : document.getElementById("category-dropdown-label").innerText,
                Price : document.getElementById("item-price").value,
                Stocks : document.getElementById("item-stock").value,
            })
            handleItemClose();
            showToast();
        }
    }
    return (
        <Navbar bg="dark" variant="dark" className="flex-column">
            <Navbar.Brand className="menu-header">MENU</Navbar.Brand>
            
            <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link onClick={handleItemShow} className="navItems" id="navItems" eventKey="/AddItems"><div className="navItems-container"><CgExtensionAdd/>Add Items</div></Nav.Link>
                <Nav.Link onClick={handleStockShow} className="navItems" id="navItems" eventKey="/AddStocks"><div className="navItems-container"><FaSortNumericUpAlt/> Add Stocks</div></Nav.Link>
            </Nav>

            <>
                <Modal show={itemShow} onHide={handleItemClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Add Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddItems/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleItemClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleOnSubmit}>
                    Add Items
                    </Button>
                </Modal.Footer>
                </Modal>
            </>
            <>
                <Modal show={stockShow} onHide={handleStockClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Add Stocks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="stock-container">
                    {
                        items.map(item =>(
                            <Card key={item.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="http://www.shutupandtakemyyen.com/wp-content/uploads/2020/07/Bag-of-Mini-Totoro-Plushies-300x300.jpg" />
                                <Card.Body>
                                    <Card.Title>{item.Description}</Card.Title>
                                        <Card.Text className="item-info">
                                        In Stock : <Form.Control className="footer qty" type="number" defaultValue={item.Stocks} placeholder={0} min="0"></Form.Control>
                                        </Card.Text>
                                </Card.Body>
                            </Card>
                        ))  
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleStockClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleStockClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
                </Modal>
            </>
        </Navbar>
        
    )
}

export default SideNavItems
