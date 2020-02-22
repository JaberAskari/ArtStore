import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../../public/css/mystyle.css'


class BigCard extends Component {

  constructor(props) {
    super(props);
    this.state ={};
  }

    render() {
      return (
        <div  >
            <div>
              <img src={'http://192.168.43.16/~testi/artstore/storage/app/'+this.props.imgurl} alt="Photo of the art" style={{width:"100%"}}/>
            </div><br/>

            <div style={{padding:20}}>
                <h1>{this.props.title}</h1>
                <p className="jprice">€ {this.props.price}</p>
                <h5 style={{color:"grey"}}>Artist: {this.props.artist}</h5>
                <h5 style={{color:"grey"}}>Phone: {this.props.phone}</h5>
                <h5 style={{color:"grey"}}>Email: {this.props.email}</h5><br/>
                <p style={{textAlign:"left", padding:0}}>{this.props.description}</p>
                <div className="input-group-prepend">
                    <button type="submit" className="input-group-text" id="inputGroupFileAddon01">
                        Contact
                    </button>
                </div>
            </div>
        </div>
      );
    }
}


export default class DetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: null,
    };
    this.componentDidMount=this.componentDidMount.bind(this);
  }

  componentDidMount() {

      const path=window.location.pathname;
      const id=path.split("/");
        console.log(id[id.length-1]);

    fetch("http://192.168.43.16/artdetailjson/"+id[id.length-1])
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result[0]
          });

          console.log('results: ',result);
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
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {
            
            <BigCard 
             imgurl={item.imgurl} 
             title={item.title} 
             price={item.price} 
             description={item.description} 
             artist={item.name}
             phone={item.phone}
             email={item.email}
             key={item.id}
              />
           
            
          }

        </div>
      );
    }
  }
}
  
if (document.getElementById('detail')) {
    ReactDOM.render(<DetailComponent />, document.getElementById('detail'));
}