import React,{useState} from 'react'
import { Form,Card,Dropdown,Button,ButtonGroup } from 'react-bootstrap';
import { MdAddBox } from "react-icons/md";

const AddItems = () => {
    const [category, setCategory] = useState("Category")
    const getCategory = (categ) => {
        setCategory(categ)
    }
    return (
        <Card style={{ width: '18rem' }} className="add-new-item">
        <Card.Img variant="top" className="add-item-image" src="https://static.thenounproject.com/png/187803-200.png" />
        <Card.Body>
            <Card.Title><Form.Control type="text" placeholder="Item Description" id="item-description"></Form.Control></Card.Title>
                <Card.Text>
                    <Dropdown as={ButtonGroup} className="category-dropdown" >
                        <Button variant="secondary" className="category-dropdown-label" id="category-dropdown-label" >{category}</Button>
                        <Dropdown.Toggle split variant="secondary" className="category-dropdown-button" id="dropdown-split-basic"  />

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{getCategory("Any")}}>Any</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{getCategory("Electrical")}}>Electrical</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{getCategory("Plumbing")}}>Plumbing</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{getCategory("Roofing")}}>Roofing</Dropdown.Item>
                            <Dropdown.Item ><MdAddBox/> Add New Category</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Text>
                <Card.Text>
                In Stock : <Form.Control  type="number" id="item-stock" defaultValue={1} min="1"></Form.Control>
                </Card.Text>
                <Card.Text>
                Price : <Form.Control  type="number" id="item-price" defaultValue={1} min="1"></Form.Control>
                </Card.Text>
        </Card.Body>
    </Card>
    )
}

export default AddItems
