import React, { useEffect,useRef,useState } from 'react'
import { Table,Form,Button } from 'react-bootstrap';
import { MdRemoveCircle } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";

const Cashier = ({items,deleteRow=null}) => {
    const itemsEndRef = useRef(null)
    const [total, setTotal] = useState(0)

    const scrollToBottom = () => {
        itemsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [items]);

    const computeTotal = (e,id,price) => {
        var Total=0;
        if(items){
            items.map( item =>(
                Total += (item.id === id ? e.target.value : item.Quantity) * item.Price
            ))
        }
        setTotal(Total);
        if(e)
        {
            if(e.target.value < 1) deleteRow(id)
            document.getElementById(id).innerText = e.target.value * price
        }
    }
    useEffect(computeTotal, [items,deleteRow]);
    return (
        <div>
            <Table striped bordered hover>
            <thead className="tableHeader">
                <tr>
                <th></th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Price</th>
                <th>Sub-Total</th>
                </tr>
            </thead>
            <tbody>
                    {
                        items ?
                        items.map( item =>(
                            <tr key={item.id} id={`inventory-row-${item.id}`}>
                                <td className="delete-item" onClick={() => {deleteRow(item.id)}}>&nbsp;<MdRemoveCircle/></td>
                                <td className="quantity-item"><Form.Control type="number" defaultValue={item.Quantity} min="0" onChange={(e)=>{computeTotal(e,item.id,item.Price)}} ></Form.Control></td>
                                <td>{item.Description}</td>
                                <td>{item.Price}</td>
                                <td id={item.id}>{item.Quantity * item.Price}</td>
                            </tr>
                        )) : null
                    }
                    <tr>
                    <td className="total" colSpan="4">TOTAL</td>
                    
                    <td>{total}</td>
                    </tr>
                    <tr ref={itemsEndRef} className="ref" />
            </tbody>
            </Table>
            <div>
            <Button variant="primary" size="lg" block className="cashier-buy" id="cashier-buy">
                <GiPayMoney/>&nbsp;Pay Now
            </Button>
            </div>
        </div>
    )
}

export default Cashier
