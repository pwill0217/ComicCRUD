// src/Components/Home.js
import React, { Component } from 'react';
import { ProductConsumer } from './Context';
import { Table, Button } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div className='container'>
                <h3>Yellow Bird Subscriptions</h3>
                <ProductConsumer>
                    {value => (
                        <Table size="sm" variant="dark" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Comics</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" value={value.id} onChange={(e) => value.updateValue(e, "id")} /></td>
                                    <td><input type="text" value={value.name} onChange={(e) => value.updateValue(e, "name")} /></td>
                                    <td><input type="text" value={value.comics} onChange={(e) => value.updateValue(e, "comics")} /></td>
                                    <td><input type="text" value={value.phoneNumber} onChange={(e) => value.updateValue(e, "phoneNumber")} /></td>
                                    <td>
                                        <Button size="sm" onClick={() => value.id ? value.onSave(value.id) : value.onAdd()}>
                                            {value.id ? "Save" : "Add New Row"}
                                        </Button>
                                    </td>
                                </tr>
                                {value.Alldata.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            {Array.isArray(product.comics)
                                                ? product.comics.join(', ')
                                                : product.comics}
                                        </td>
                                        <td>{product.phoneNumber}</td>
                                        <td>
                                            <Button size="sm" variant="primary" onClick={() => value.onEdit(product.id)}>Edit</Button> |
                                            <Button size="sm" variant="danger" onClick={() => value.onDelete(product.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </ProductConsumer>
            </div>
        );
    }
}
