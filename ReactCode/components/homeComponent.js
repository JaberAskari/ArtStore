import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../../public/css/mystyle.css'


class Card extends Component {

  constructor(props) {
    super(props);
    this.state ={};
  }

    render() {
      return (
        <div className="jcard" >
            <input type="hidden" id="owner_id" value={this.props.owner} />
            <div style={{height:"18rem",overflow: "hidden"}}>
              <img src={'http://192.168.43.16/~testi/artstore/storage/app/'+this.props.imgurl} alt="Photo of the art" style={{width:"100%"}}/>
            </div>
            <h1>{this.props.title}</h1>
            <p className="jprice">${this.props.price}</p>
            <p style={{textAlign:"left", padding:10,height:"9rem",overflow:"hidden"}}>{this.props.description}</p>
            <p><a href={'http://192.168.43.16/artdetail/'+this.props.id}>See more</a></p>
            <p style={{ padding:0}}><button>Edit</button></p>
        </div>
      );
    }
}


export default class MyArts extends React.Component {
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
    fetch("http://192.168.43.16/myArtsJson")
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
  
if (document.getElementById('home')) {
    ReactDOM.render(<MyArts />, document.getElementById('home'));
}