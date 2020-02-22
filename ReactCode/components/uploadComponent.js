
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import axios from 'axios';

export default class Uploadf extends Component
{
   constructor(props) {
      super(props);
      this.state ={
        title:'', 
        price:'',
        description:'',
        selectedFile: null,
        resStatus:'', 
        imgurl:'' , 
        showimg: 'hidden',
        selectedFileName:"Chose an image"
      };
     
      this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
      this.fileUploadHandler = this.fileUploadHandler.bind(this);
      this.titleHandler = this.titleHandler.bind(this);
      this.priceHandler = this.priceHandler.bind(this);
      this.descriptionHandler = this.descriptionHandler.bind(this);
    }

    titleHandler(e){
        this.setState({title: e.target.value});
    }

    priceHandler(e){
        this.setState({price: e.target.value})
    }

    descriptionHandler(e){
        this.setState({description: e.target.value})
    }

    fileSelectedHandler(event) {
        //console.log("fileSelectehandler:",event.target.files[0]);
        this.setState({selectedFile: event.target.files[0]});
        //getting the selected file  name
        this.setState({selectedFileName: event.target.files[0].name});
      
    }
    
    fileUploadHandler(e){

        e.preventDefault();
        //http request header
        const config = { headers: { 'Content-Type': 'multipart/form-data','X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } };
        //creating a formdata to store data in it
        const fdata= new FormData;
        //appending all states to formdata to create a single package
        fdata.append('title',this.state.title);
        fdata.append('price',this.state.price);
        fdata.append('description',this.state.description);
        fdata.append('file',this.state.selectedFile);
        //console.log("fileUploadHandler: fdata:"+fdata);
        axios.post('http://192.168.43.16/uploadfromreact',fdata,config)
        .then(res=>{

            console.log("status:",res['status']," imageurl: ",res['data'], res);
            if(res['status']==200 && res['data']!=""){
                this.setState({
                    title:'',
                    price:'',
                    description:'',
                    selectedFile:null,
                    resStatus:"File uploaded successfuly!",
                    imgurl:res['data'],
                    showimg:"visible",
                    selectedFileName:"chose an image"});
            }else{
                this.refs.errormsg.style.color='red';
                this.setState({
                    resStatus: 'Error, Could not upload the file: '+res['status']});
            }

        }).catch(error=>{
            this.refs.errormsg.style.color='red';
            this.setState({
            resStatus: 'Error, Could not upload the file: '+error});
        });

    }
  
  
   render()
   {
      return(
        <div>
        <form onSubmit={this.fileUploadHandler}>
            <h4>Upload your file here:</h4><br/>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Art Title:</label>
                <input
                    type="text"
                    className="form-control" 
                    id="formGroupExampleInput" 
                    onChange={this.titleHandler} 
                    value={this.state.title}
                /><br/>

                <label htmlFor="formGroupExampleInput">Price:</label>
                <input
                    type="number"
                    className="form-control"
                    id="formGroupExampleInput" 
                    onChange={this.priceHandler} 
                    value={this.state.price}
                /><br/>

                <label htmlFor="formGroupExampleInput">Description: </label>
                <input
                    type="text"
                    className="form-control" 
                    id="formGroupExampleInput" 
                    onChange={this.descriptionHandler} 
                    value={this.state.description}
                /><br/>
            </div>

            <label htmlFor="formGroupExampleInput">Image to upload(required): </label>
            <div className="input-group">
                <div className="custom-file">
                    <input onChange={this.fileSelectedHandler} accept="image/*"
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01" required
                    />
                    <label  className="custom-file-label" htmlFor="inputGroupFile01">
                    {this.state.selectedFileName}
                    </label>
                </div>

                <div className="input-group-prepend">
                    <button type="submit" className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                    </button>
                </div>
            </div>
        </form>

        <div ref="errormsg" ><br/><br/>
            <h5> {this.state.resStatus}</h5>
            <img src={'http://192.168.43.16/~testi/artstore/storage/app/'+this.state.imgurl}
             alt="updoaded photo" style={{visibility: this.state.showimg, width:"100%" }}
             />
           
        </div>
        </div>
      );
   }
}




if (document.getElementById('Myuploader')) {
    ReactDOM.render(<Uploadf />, document.getElementById('Myuploader'));
}