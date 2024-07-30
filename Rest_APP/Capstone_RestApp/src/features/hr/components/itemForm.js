import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../components/itemform.css'; 
import axios from 'axios';

const ItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [points, setPoints] = useState('');
    const [items, setItems] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { itemName, description, quantity, points };
        setItems([...items, newItem]);
        setItemName('');
        setDescription('');
        setQuantity('');
        setPoints('');

        let data ={
            'name' : itemName,
            'description': description,
            'quantity': quantity,
            'points': points
        }
        axios.post('http://localhost:8081/api/items/add',
            data,
            {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            }
        ).then(resp=>{
            console.log(resp.data)
        }).catch(err=>{
            console.log(err)
        })

    };

    return (
        <div className="form-container">
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-row same-row">
                        <div className="field">
                            <FloatLabel>
                                <InputText
                                    id="itemname"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                                <label htmlFor="itemname">Item Name</label>
                            </FloatLabel>
                        </div>
                        <div className="field">
                            <FloatLabel>
                                <InputText
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label htmlFor="description">Description</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <div className="form-row same-row">
                        <div className="field">
                            <FloatLabel>
                                <InputNumber
                                    id="quantity"
                                    value={quantity}
                                    onValueChange={(e) => setQuantity(e.value)}
                                    mode="decimal"
                                    showButtons={true}
                                    integerOnly={true}
                                    useGrouping={false}
                                />
                                <label htmlFor="quantity">Quantity</label>
                            </FloatLabel>
                        </div>
                        <div className="field">
                            <FloatLabel>
                                <InputNumber
                                    id="points"
                                    value={points}
                                    onValueChange={(e) => setPoints(e.value)}
                                    mode="decimal"
                                    showButtons={true}
                                    integerOnly={true}
                                    useGrouping={false}
                                />
                                <label htmlFor="points">Points Required</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <Button type="submit" label="Submit" className="submit-button" />
                </form>
            </div>

            <div className="table-container">
                {items.length > 0 && (
                    <div className="card">
                        <DataTable value={items} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="itemName" header="Item Name" sortable style={{ width: '25%' }}></Column>
                            <Column field="description" header="Description" sortable style={{ width: '25%' }}></Column>
                            <Column field="quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
                            <Column field="points" header="Points Required" sortable style={{ width: '25%' }}></Column>
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemForm;
