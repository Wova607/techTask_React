import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ItemsTable from './ItemsTable';

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ItemName: '',
      ItemType: '',
     
    }
    this.table = React.createRef();
  }


  componentDidMount() {
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

  //method create new item from inputs and send to server
  handleSubmit = (event) => {
    event.preventDefault();

    // send new item to server
    axios({
      method: 'post',
      url: 'https://localhost:44343/api/items',
      data: {
        ItemName: this.state.ItemName,
        ItemType: this.state.ItemType
      }
      //function for clear inputs 
    }).then(() => {
      document.getElementById("addForm").reset();
      //call refresh items table afte add new item 
      this.table.current.refreshTable();
      //if error
    }).catch((error) => {
      alert(error);
    });




  }
  //write value from input to state
  chgText = (e) => {
    if (e.target.name === 'ItemName') {
      this.setState({ ItemName: e.target.value })
    }
    if (e.target.name === 'ItemType') {
      this.setState({ ItemType: e.target.value })

    }

  }

  //our form 
  render() {

    return (
      <Container>
        <Row>
          <Col><h1 className="text-center"> Items</h1></Col>
        </Row>
        <Row>

          <Col>
            <Col>
              <h5>Add Item</h5>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <Col>
              <form className="form-inline" id="addForm" onSubmit={this.handleSubmit}>
                <div className=" form-group">

                  <input type="text" name="ItemName" onChange={this.chgText} placeholder="Item Name" className="form-control" required />

                  <input type="text" name="ItemType" onChange={this.chgText} placeholder="Item Type" className="form-control" required />

                  <Button type="submit">Add</Button>
                </div>
              </form>
              <br />

            </Col>
          </Col>
        </Row>

        <Row>
          <Col> <ItemsTable ref={this.table} />  </Col>
        </Row>
      </Container>
    );
  }
}

export default ItemsPage;