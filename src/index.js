
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid,Form,Button,Input,Container,Icon} from 'semantic-ui-react'
import { Line, Circle } from 'rc-progress';
import registerServiceWorker from './registerServiceWorker';
import validUrl from 'valid-url';
import './index.css';

let percentage;

const States = {
  INIT: 0,
  SECOND: 1,
  THIRD: 2
};

class App extends Component {
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

	handleChange= (e,{name,value}) => {
		this.setState({ [name]: value });
	}

  handleSubmit = async () => {
		      let url = this.state.url;
					if (validUrl.isUri(url)){

						let payload = {q: url};

						let result = await fetch("https://apibb.herokuapp.com/retrieveData?q="+ payload.q, {mode: 'cors'})

            percentage = Math.floor((await result.json())*100);

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
              <Grid.Row>
		  	      <Form>
								<Form.Field required>
									<h1 className="title">BiasBliss</h1>
                  <p><i>Discover how biased an article is.</i></p>
									<Input label='URL' icon={{ name:'search', circular:false, link:true }} name='url' value={url} onChange={this.handleChange} placeholder='news.tumblr.com/fake-news.html' name='url' />
								</Form.Field>
		  	      </Form>
            </Grid.Row>
							<br/>
            <Grid.Row>
						  <Button animated compact color='yellow' fluid size='large' onClick={this.handleSubmit}>
                <Button.Content visible>Go</Button.Content>
                <Button.Content hidden>
                  <Icon name='right arrow' />
                </Button.Content>
              </Button>
            </Grid.Row>
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
							<Grid.Column centered={true}>

							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
			    			<Line percent={percentage} strokeWidth="10" strokeColor="#FCBD08" />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column centered>
								<h1>This article is {percentage}% biased!</h1>
                <Button onClick={() => this.transition(States.INIT)}>
      					  Test another article
      					</Button>
							</Grid.Column>
						</Grid.Row>
		  	  </Grid>
		  	</div>
			</Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
