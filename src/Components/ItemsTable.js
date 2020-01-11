import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container, Pagination, Button, Modal } from 'react-bootstrap';

class ItemsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

            items: [],
            //elements on page
            elementOnPage: 4,
            //current page
            page: 0,
            //show or not Modal window 
            showModal: false,
            //edite element
            editName: '',
            editType: '',
            editId: ''

        }

    }
    // get items
    getItems = () => {
        axios.get('https://localhost:44343/api/items')
            .then((response) => {
                // response success
                this.setState({ items: response.data })
            })
            .catch(function (error) {
                // response error
                alert(error);
            });

    }



    //refreshtable data
    refreshTable = () => {

        this.getItems()

    }

    //start init items table
    componentDidMount() {
        this.getItems()

    }


    // method for display items
    renderTable = (page) => {

        //first element our page
        let start = page * this.state.elementOnPage
        //last element our page
        let end = start + this.state.elementOnPage
        return (
            //create our table
            this.state.items.slice(start, end).map(e =>

                <tr key={e.id}>
                    <th >{e.itemName}</th>
                    <th>{e.itemType}</th>
                    <th className="text-center"><Button onClick={() => this.deleteElem(e.id)}>Delete</Button>&nbsp;<Button onClick={() => this.ShowWind(e)}>Edit</Button></th>
                </tr>
            )

        )
    }
    //method for delete item
    deleteElem = (id) => {
        axios.delete('https://localhost:44343/api/items/' + id)
            .then((response) => {
                // response success
                alert("Item deleted")

            })
            .catch(function (error) {
                // response error
                alert(error);
            });
        //this.delfromState(id)
        let arr = [];
        this.state.items.forEach(element => {
            if (element.id !== id) { arr.push(element) }
        });

        this.setState({ items: arr })

    }
    //show modal window with edit element 
    ShowWind = (item) => {

        this.setState({ showModal: true })
        this.setState({ editId: item.id })
        this.setState({ editName: item.itemName })
        this.setState({ editType: item.itemType })
    }

    //Close modal windows
    ModalClose = () => {
        this.setState({ showModal: false })
    }
    //save change element
    SaveChange = (id) => {

        //update items list
        let newItems = this.state.items
        newItems.forEach(element => {
            if (element.id === id) {
                element.itemName = this.state.editName
                element.itemType = this.state.editType
            }
        })
        this.setState({ items: newItems })

        //update item on server
        axios({
            method: 'put',
            url: 'https://localhost:44343/api/items',
            data: {
                Id: id,
                ItemName: this.state.editName,
                ItemType: this.state.editType
            }
            //if ok
        }).then(() => {
            alert("Done!")
            //if error
        }).catch((error) => {
            alert(error);
        });

        this.ModalClose()
    }


    //edite element in form
    chgText = (e) => {
        if (e.target.name === 'ItemName') {
            this.setState({ editName: e.target.value })
        }
        if (e.target.name === 'ItemType') {
            this.setState({ editType: e.target.value })
        }

    }



    //show pagination
    renderPagination = () => {
        //how all pages
        let pages = Math.ceil(this.state.items.length / this.state.elementOnPage)
        //actual page
        let activPage = this.state.page
        //actual page in pagination
        let active = (activPage + 1);

        let items = [];
        //create pagination list
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
        return (
            <Pagination onClick={this.setPage}>{items}</Pagination>
        )
    }

    //method of changing the page
    setPage = (e) => {
        let newPage = +e.target.text - 1;
        this.setState({ page: newPage })
    }


    render() {

        return (
            <>
                <Container>
                    <Modal show={this.state.showModal} onHide={this.ModalClose} animation={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className=" form-group">
                                <div>

                                    <input type="text" name="ItemName" onChange={this.chgText} value={this.state.editName} className="form-control" required />
                                </div>
                                <br />
                                <div>
                                    <input type="text" name="ItemType" onChange={this.chgText} value={this.state.editType} className="form-control" required />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.ModalClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.SaveChange(this.state.editId)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable(this.state.page)}
                        </tbody>
                    </Table>
                </Container>
                <Container className="d-flex justify-content-center">
                    {this.renderPagination()}
                </Container>
            </>
        );
    }
}

export default ItemsTable;