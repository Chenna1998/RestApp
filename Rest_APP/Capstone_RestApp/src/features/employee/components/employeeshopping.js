import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import '../components/employeeshopping.css';

function EmployeeShopping() {
    const [itemList, setItemList] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [rewardPoints, setRewardPoints] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalCartPoints, setTotalCartPoints] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const fetchItems = () => {
        axios.get('http://localhost:8081/api/item/getAll', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => {
            setItemList(resp.data);
            setFilteredItems(resp.data);
        }).catch(err => {
            console.error('Error fetching items:', err);
        });
    };

    const fetchRewardPoints = () => {
        axios.get('http://localhost:8081/api/employee/rewardpoints', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => {
            setRewardPoints(resp.data);
        }).catch(err => {
            console.error('Error fetching reward points:', err);
        });
    };

    const updateChartData = useCallback(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const labels = itemList.map(item => item.name);
        const data = itemList.map(item => item.quantity);
        const backgroundColor = [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--pink-500')
        ];
        const hoverBackgroundColor = [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--purple-400'),
            documentStyle.getPropertyValue('--orange-400'),
            documentStyle.getPropertyValue('--cyan-400'),
            documentStyle.getPropertyValue('--pink-400')
        ];

        setChartData({
            labels,
            datasets: [
                {
                    data,
                    backgroundColor,
                    hoverBackgroundColor
                }
            ]
        });

        setChartOptions({
            cutout: '60%'
        });
    }, [itemList]);

    useEffect(() => {
        fetchItems();
        fetchRewardPoints();
    }, []);

    useEffect(() => {
        updateChartData();
    }, [itemList, updateChartData]);

    const addToCart = (item) => {
        if (item.quantity > 0) {
            const updatedCart = [...cart];
            const cartItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);

            if (cartItemIndex > -1) {
                updatedCart[cartItemIndex].quantity += 1;
            } else {
                updatedCart.push({ ...item, quantity: 1 });
            }

            setCart(updatedCart);
            setTotalCartPoints(totalCartPoints + item.points);
            const updatedItems = itemList.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
            setItemList(updatedItems);
            setFilteredItems(updatedItems);
        }
    };

    const removeFromCart = (item) => {
        const updatedCart = [...cart];
        const cartItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);

        if (cartItemIndex > -1) {
            if (updatedCart[cartItemIndex].quantity > 1) {
                updatedCart[cartItemIndex].quantity -= 1;
            } else {
                updatedCart.splice(cartItemIndex, 1);
            }

            setCart(updatedCart);
            setTotalCartPoints(totalCartPoints - item.points);
            const updatedItems = itemList.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            setItemList(updatedItems);
            setFilteredItems(updatedItems);
        }
    };

    const buyItems = () => {
        if (rewardPoints >= totalCartPoints) {
            const itemQuantities = cart.reduce((acc, item) => {
                acc[item.id] = (acc[item.id] || 0) + item.quantity;
                return acc;
            }, {});

            axios.post('http://localhost:8081/api/employee/item/post', itemQuantities, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                console.log(resp.data);
                setRewardPoints(rewardPoints - totalCartPoints);
                setCart([]);
                setTotalCartPoints(0);

                axios.put(`http://localhost:8081/api/update/employee/rewardpoints/${rewardPoints - totalCartPoints}`, {}, {
                    headers: {
                        'Authorization': 'Basic ' + localStorage.getItem('token')
                    }
                }).then(resp => {
                    console.log('Reward points updated:', resp.data);
                }).catch(err => {
                    console.error('Error updating reward points:', err);
                });
            }).catch(err => {
                console.error('Error purchasing items:', err);
            });
        } else {
            alert('Not enough reward points to buy the items in the cart.');
        }
    };

    const getSeverity = (quantity) => {
        if (quantity > 8) return 'success';
        if (quantity >= 4) return 'warning';
        return 'danger';
    };

    const quantityBodyTemplate = (rowData) => {
        return (
            <Tag value={rowData.quantity} severity={getSeverity(rowData.quantity)} />
        );
    };

    const actionBodyTemplate = (rowData) => {
        const isItemInCart = cart.some(cartItem => cartItem.id === rowData.id);
        return (
            <div className="action-buttons">
                <Button
                    label="Add to Cart"
                    onClick={() => addToCart(rowData)}
                    disabled={rowData.quantity === 0}
                    className="p-button-success p-mr-2"
                />
                <Button
                    label="Remove from Cart"
                    onClick={() => removeFromCart(rowData)}
                    className="p-button-danger"
                    disabled={!isItemInCart}
                />
            </div>
        );
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = itemList.filter(item => item.name.toLowerCase().includes(query));
        setFilteredItems(filtered);
    };

    const header = (
        <div className="table-header">
            <h3 className="table-title">Items</h3>
            <span>
                <InputText
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name"
                />
            </span>
        </div>
    );

    return (
        <div className="employee-shopping">
            <div className="card">
                <h3 className="title">Employee Shopping</h3>
                <div className="card-header">
                    <h4>Reward Points: {rewardPoints}</h4>
                </div>
                <div className="flex flex-column align-items-center justify-content-center">
                    <DataTable value={filteredItems} header={header} tableStyle={{ minWidth: '60rem' }} className="custom-datatable">
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="description" header="Description" sortable></Column>
                        <Column field="points" header="Points" sortable></Column>
                        <Column field="quantity" header="Quantity" body={quantityBodyTemplate} sortable></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                    <h4>Total Cart Points: {totalCartPoints}</h4>
                    <Button label="Buy Items" onClick={buyItems} disabled={totalCartPoints === 0} className="p-button-rounded p-button-success" />
                </div>
            </div>
            <div className="chart-container">
                <h3 className="chart-title">Items and Quantities</h3>
                <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>
        </div>
    );
}

export default EmployeeShopping;
