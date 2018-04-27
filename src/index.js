
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid,Header,Image,Form,Segment,Button,Message,Input,Icon,Container} from 'semantic-ui-react'
import './index.css';
import { Line, Circle } from 'rc-progress';
import registerServiceWorker from './registerServiceWorker';

var validUrl = require('valid-url');
//var gUrl = "url('https://image.freepik.com/free-psd/abstract-background-design_1297-87.jpg')";
var gUrl;
var percentage;
const States = {
  INIT: 0,
  SECOND: 1,
  THIRD: 2
};
class StateMachine extends Component {
  state = {
    current: States.INIT,
		url: ''
  };
  transition(to) {
    this.setState({current: to});
  }
  render() {
    switch(this.state.current) {
      case States.SECOND:
        return this.renderSecond();
      case States.THIRD:
        return this.renderThird();
      case States.INIT:
      default:
        return this.renderInit();
    }
  }
	handleChange=(e,{name,value})=>{
		this.setState({ [name]: value })
	}
  handleSubmit = async () => {
		      let url = this.state.url
					if (validUrl.isUri(url)){
						var payload = {q: url}
						//var data = new FormData();
						//data.append( "json", JSON.stringify( payload) );

						let result = await fetch("https://apibb.herokuapp.com/retrieveData?q="+payload.q,
            {
            mode: 'cors',
            headers:{
              'Access-Control-Allow-Origin':'*'
            }
          })
            percentage = Math.floor((await result.json())*100);
            console.log(Math.floor(percentage*100))

						this.transition(States.SECOND)
					} else {
						alert("Invalid link: "+url)
					}
	}
  renderInit() {
		const {current, url} = this.state

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
									<h1 className="title">BiasBliss</h1>
									<Input label='https://' icon={{ name:'search', circular:true, link:true }} name='url' value={url} onChange={this.handleChange} placeholder='news.tumblr.com/fake-news.html' name='url' />
								</Form.Field>
		  	      </Form>
							<br/>
						  <Button compact color='red' fluid size='small' onClick={this.handleSubmit}>Go</Button>
		  	    </Grid.Column>
		  	  </Grid>
		  	</div>
			</Container>

    );
  }
  renderSecond() {

    return (

	    <Container >
		  	<div>
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
						centered columns={1}
		  	  >
						<Grid.Row>
							<Grid.Column centered={false}>

							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
			    			<Line percent={percentage} strokeWidth="4" />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column centered>
								<h1>This article is {percentage}% biased!</h1>
                <Button onClick={() => this.transition(States.INIT)}>
      					  Test another article!
      					</Button>
							</Grid.Column>
						</Grid.Row>
		  	  </Grid>
		  	</div>
			</Container>
    );
  }
  renderThird() {
    return (
			<Container>
  			<Button onClick={() => this.transition(States.INIT)}>
  		      Go back to the initial state
  		  </Button>
			  <Grid columns={4}>
			  	<Grid.Row>
						<Grid.Column>
			    	<Line percent="65" strokeWidth="4" />
						<Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" />

						</Grid.Column>
			    </Grid.Row>
			    <Grid.Row>
						<Grid.Column>
			  		<Circle percent="10" strokeWidth="4" />
						</Grid.Column>
			  	</Grid.Row>
				</Grid>

			</Container>
    );
  }
}

ReactDOM.render(<StateMachine />, document.getElementById('root'));
registerServiceWorker();
