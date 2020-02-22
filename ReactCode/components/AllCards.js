import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from "./card";

export default class AllCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.componentDidMount=this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://192.168.43.16/allArtJson")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map((item,index)=> (
            
            <Card 
             imgurl={item.name} 
             title={item.title} 
             price={item.price} 
             description={item.description} 
             key={item.id} 
             owner={item.owner_id}
             id={item.id} />
           
            
          ))}

        </ul>
      );
    }
  }
}
  
if (document.getElementById('AllCards')) {
    ReactDOM.render(<AllCards />, document.getElementById('AllCards'));
}