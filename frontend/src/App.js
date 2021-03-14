import './App.css';
import React, { Component } from 'react';
import './apiHelper/apiHelper'
import apiHelper from './apiHelper/apiHelper';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      from: null,
      to: null,
      timelimit: 5,
      requestUuid: null,
      counter: 0,
      timerId: null,
      isError: null,
    }

  }

  nameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  fromChangeHandler = (event) => {
    this.setState({ from: event.target.value });
  }

  toChangeHandler = (event) => {
    this.setState({ to: event.target.value });
  }

  timeChangeHandler = (event) => {
    this.setState({ timelimit: event.target.value });
  }

  startCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
      timerId: setTimeout(this.startCounter, 1000)
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    apiHelper.call(
      this.state.name,
      this.state.from,
      this.state.to,
      this.state.timelimit * 60
    ).then((res) => {
      this.setState({ 
        requestUuid: res.data.requestUuid,
        counter: 0 
      })
      this.startCounter();
    }).catch((err) => {
      console.error(err)
      this.setState({isError: true})
    })
  }

  hangupHandler = () => {
    apiHelper.hangup(this.state.requestUuid)
      .then(()=>{
        this.setState({
          requestUuid: null,
        })
        clearTimeout(this.state.timerId)
      }).catch((err) => {
        console.error(err)
        this.setState({isError: true})
      })
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        
        <div>
          <label htmlFor="name" className="form-label">Name *</label>
          <input id="name" className="form-control" placeholder="Chandan Singh" required value={this.state.name} onChange={this.nameChangeHandler}></input>

          <div>
            <label htmlFor="from" className="form-label">From *</label>
            <input id="form" type="number" className="form-control" placeholder="14245550100" required
              value={this.state.from} onChange={this.fromChangeHandler}></input>

            <label htmlFor="to">To *</label>
            <input id="to" type="number" className="form-control" placeholder="12015550164" required value={this.state.to} onChange={this.toChangeHandler}></input>
          </div>

          <div>
            <label htmlFor="timelimit" className="form-label">Time limit *</label>
            <select id="timelimit" className="form-select" required value={this.state.timelimit} onChange={this.timeChangeHandler}>
              <option value="5">5 min</option>
              <option value="10">10 min</option>
              <option value="15">15 min</option>
            </select>
          </div>

          <div className="btn-group" style={{marginTop:"1em"}}>
            <button type="submit" className="btn btn-success" disabled={this.state.requestUuid != null}>Call</button>
            <button type="button" className="btn btn-danger" onClick={this.hangupHandler} disabled={this.state.requestUuid == null}>Hungup</button>
          </div>

          <div hidden={this.state.requestUuid == null} style={{marginTop:"1em"}}>
            Timer: {`${parseInt(this.state.counter/60)}:${this.state.counter%60}`}
          </div>

          <div className="alert alert-danger" style={{marginTop:"1em"}} hidden={!this.state.isError}>
            <strong>Error!</strong> Bad Request
          </div>
        </div>
      </form>
    )
  }
}

export default App;
