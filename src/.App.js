import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid,Header,Image,Form,Segment,Button,Message,Input,Icon,Container} from 'semantic-ui-react'

var validUrl = require('valid-url');
var imgUrl = "url('https://image.freepik.com/free-psd/abstract-background-design_1297-87.jpg')";

document.getElementsByTagName("body")[0].style.backgroundImage=imgUrl;
//document.getElementById("root").style.backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1))";

class App extends Component {
	state = {url:'',  submittedUrl:''}

	handleChange=(e,{name,value}) => {
		this.setState({ [name]: value })
	}

	handleSubmit=() =>  {
		const { url } = this.state
		if (validUrl.isUri(url)){
			this.setState({ submittedUrl: url })
		}
					// send this link out. wait for request from that page.
	}

  render() {
		const {url, submittedUrl} = this.state
    return (
			<Container >
		  	<div className="login-form" >
		  	  {/*
		  	    Heads up! The styles below are necessary for the correct render of this example.
		  	    You can do same with CSS, the main idea is that all the elements up to the `Grid`
		  	    below must have a height of 100%.
		  	  */}
		  		<style>{`
		  	    body > div,
		  	    body > div > div,
		  	    body > div > div > div.login-form {
		  	      height: 100%;
		  	    }
		  	  `}</style>

		  	  <Grid
		  	    textAlign='center'
		  	    style={{ height: '100%' }}
		  	    verticalAlign='middle'
		  	  >
		  	    <Grid.Column >
		  	      <Form onSubmit={this.handleSubmit} >
								<Form.Field required>
									<h1 className="title">Bias/Is/Bliss</h1>
									<Input label='https://' icon={{ name:'search', circular:true, link:true }} placeholder='news.tumblr.com/fake-news.html' name='url' value={url} onChange={this.handleChange} />
								</Form.Field>
		  	      </Form>
							<br/>
						  <Button compact color='red' fluid size='small'onClick={this.handleSubmit}>Go</Button>
		  	    </Grid.Column>
		  	  </Grid>
		  	</div>
			</Container>
    );
  }
}

export default App;
