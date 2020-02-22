


import React, { Component } from 'react';



import '../../../public/css/mystyle.css'

export default class Card extends Component {

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
            <p style={{ padding:0}}><button>Add to Cart</button></p>
        </div>

      );
    }
}







