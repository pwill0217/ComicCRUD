import React, { Component } from 'react';
import { rowData } from './AppData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        Alldata: rowData,
        id: '',
        name: '',
        comics: '',
        phoneNumber: '',
        updateEdit: []
    };

    getRecord = (id) => {
        return this.state.Alldata.find(item => item.id === id);
    };

    onEdit = (id) => {
        const selectedRecord = this.getRecord(id);
        if (selectedRecord) {
            this.setState({
                id: selectedRecord.id,
                name: selectedRecord.name,
                comics: selectedRecord.comics,
                phoneNumber: selectedRecord.phoneNumber,
            });
        }
    };

    updateValue = (e, test) => {
        this.setState({ [test]: e.target.value });
    
        const tempArray = [
            this.state.id,
            test === "name" ? e.target.value : this.state.name,
            test === "comics" ? e.target.value : this.state.comics,
            test === "phoneNumber" ? e.target.value : this.state.phoneNumber
        ];
    
        this.setState({
            updateEdit: tempArray
        });
    };
    
    onAdd = () => {
        const { name, comics, phoneNumber } = this.state;
    
        // Ensure comics is an array
        const comicsArray = Array.isArray(comics) ? comics : [comics];
    
        const newId = Math.max(...this.state.Alldata.map(item => item.id)) + 1;
    
        const newRecord = {
            id: newId,
            name,
            comics: comicsArray,
            phoneNumber
        };
    
        this.setState({
            Alldata: [...this.state.Alldata, newRecord], 
            name: '', 
            comics: '', 
            phoneNumber: ''
        });
    };
    
    onSave = (id) => {
        if (id !== " ") {
            const SavedRecord = [...this.state.Alldata];
            const index = SavedRecord.indexOf(this.getRecord(id));
    
            if (index !== -1) {
                const comicsArray = Array.isArray(this.state.comics) ? this.state.comics : [this.state.comics];
    
                SavedRecord[index] = {
                    id: this.state.id,
                    name: this.state.name,
                    comics: comicsArray,
                    phoneNumber: this.state.phoneNumber,
                };
    
                this.setState({
                    Alldata: SavedRecord,
                    id: "",
                    name: "",
                    comics: "",
                    phoneNumber: "",
                });
            } else {
                console.error("Record not found!");
            }
        }
    };
    

    onDelete = (id) => {
        const filteredData = this.state.Alldata.filter(item => item.id !== id);
        this.setState({
            Alldata: filteredData
        });
    };

    updatedValue = (e, key) => {
        this.setState({ [key]: e.target.value });
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                getRecord: this.getRecord,
                onEdit: this.onEdit,
                onSave: this.onSave,
                onAdd: this.onAdd,  // Ensure onAdd is passed in the context
                onDelete: this.onDelete,
                updateValue: this.updateValue
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
