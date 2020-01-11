import React, { Component } from 'react';
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import StatisticPage from './Components/StaisticPage';
import ItemsPage from './Components/ItemsPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //start pag
      activeTab: props.activeTab
    }
    this.stat = React.createRef();
  }
  //set selected Tabs
  handleSelect = (selectedTab) => {

    this.setState({
      activeTab: selectedTab
    });
    if (selectedTab = "statistic") {
      //refresh statistic
      this.stat.current.refreshStatistic();
    }

  }

  render() {

    return (
      <Tabs id="controlled-tab" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
        <Tab eventKey="items" title="Items">
          <ItemsPage />
        </Tab>
        <Tab eventKey="statistic" title="Statistic">
          <StatisticPage ref={this.stat} />
        </Tab>
      </Tabs>
    );
  }
}


export default App;


