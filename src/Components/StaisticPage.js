import React, { Component } from 'react';
import { Table, Container, Pagination } from 'react-bootstrap';
import axios from 'axios';

class StatisticPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          //all elements of our statistic from server
        statisticItems: [],
        //elements on page
        elementOnPage: 3,
        //current page
        page: 0,
         }      
       
      }   
    
      //    Get statistic from server
getStatistic=()=>{
    axios.get('https://localhost:44343/api/statistic')
            .then((response) => {
                // response success
                this.setState({ statisticItems: response.data })
  
            })
            .catch(function (error) {
                // response error
                alert(error);
            });
  
  }

  refreshStatistic=()=>{
      this.getStatistic()
  }

  componentDidMount() {
    this.getStatistic()
    
}
    //method for display statistic
renderTable = (page) => {
       //for rendering is update items
       // this.state.statisticItems= this.props.statisticItems
                
        //first element our page
        let start = page * this.state.elementOnPage
        //last element our page
        let end = start + this.state.elementOnPage

        return (
            //create our table

            this.state.statisticItems.slice(start, end).map(e =>

                <tr key={e.itemType}>
                    <th >{e.itemType}</th>
                    <th>{e.count}</th>
                </tr>
            )
        )
    }
    //render pagination
    renderPagination = () => {
        //how all pages
        let pages = Math.ceil(this.state.statisticItems.length / this.state.elementOnPage)
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
                <h1 className="text-center"> Statistics</h1>

                <Container>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Item Type</th>
                                <th>Count</th>
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

export default StatisticPage;