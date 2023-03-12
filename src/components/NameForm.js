import React from 'react';
import axios from 'axios'

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   alert('About to query');
    axios.post('http://my-app-api.alemser.link/api/demo', {
        name: this.state.value,
      })
      .then((response) => {
        alert(response.data);
        this.setState({value: response.data});
      })
      .catch((error) => {
        console.log(error);
      })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
