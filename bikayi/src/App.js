 import React, {
  Component
 } from 'react';

class App extends React.Component {
  state = {
    isLoading: true,
    prizes: [],
    error: null
  };
  getFetchPrizes() {
    this.setState({
      loading: true
    }, () => {
      fetch("http://localhost:3000/prizes").then(res => res.json()).then(result => this.setState({
        loading: false,
        prizes: result
      })).catch(console.log);
    });
  }
  componentDidMount() {
    this.getFetchPrizes();
  }
  render() {
    const {
      prizes,
      error
    } = this.state;
    return (
      <React.Fragment>
        <h1><center>Nobel Prizes</center></h1>
        <div className="drop-down" align="center">
                <select align="center">{Array.from(new Set(this.state.prizes.map(obj => obj.category))).map(category => {
                  return <option value={category}>{category}</option>;
                })}</select>
        </div>
        <div className="drop-down" align="center">
                <select align="center">{Array.from(new Set(this.state.prizes.map(obj => obj.year))).map(year => {
                  return <option value={year}>{year}</option>;
                })}</select>
        </div>
        {
          error ? <p>
            {
              error.message
            } </p> : null}  {
          prizes.map(prize => {
            const {
              year,
              category,
              laureates,
            } = prize;
            return (
              <div key={year}>
                  <p>Year: {year}</p>
                  <p>Category: {category}</p>
                  <p>Laureates: {laureates?.map(laureate => <div>{laureate.firstname} {laureate.surname} - {laureate.motivation}</div>)}</p>
                  <hr />
                </div>
            );
          })
        } </React.Fragment>);
  }
}

export default App;