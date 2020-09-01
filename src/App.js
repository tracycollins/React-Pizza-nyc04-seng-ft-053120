import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    formData: {
      id: null,
      topping: "Plain",
      size: "Small",
      vegetarian: true
    }
  }

  fetchPizzas = () => {
    fetch("http://localhost:3000/pizzas")
      .then(res => res.json())
      .then(pizzas => {
        // console.log(pizzas)
        this.setState({ pizzas })
      })
  }
  componentDidMount() {
    this.fetchPizzas()
  }

  handleSubmit = (event) => {
    event.persist()
    console.log("handleSubmit", event)
    fetch(`http://localhost:3000/pizzas/${this.state.formData.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.formData)
      })
      .then(res => res.json())
      .then(updatedPizza => {
        console.log(updatedPizza)
        this.fetchPizzas()
      })
  }

  handleChange = (event) => {
    event.persist()
    const formData = { ...this.state.formData }
    formData[event.target.name] = event.target.value
    if (event.target.name === "vegetarian") {
      formData[event.target.name] = !(event.target.value === true || event.target.value === "true")
      console.log("vegetarian", formData[event.target.name], event.target.value)
    }
    this.setState({ formData })
  }

  handleEdit = (pizza) => {
    console.log("handleEdit", pizza)
    const formData = { ...this.state.formData }
    formData.id = pizza.id
    formData.topping = pizza.topping
    formData.size = pizza.size
    formData.vegetarian = pizza.vegetarian
    this.setState({ formData })
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header />
        <PizzaForm onSubmitClick={this.handleSubmit} onChangeHandler={event => this.handleChange(event)} formData={this.state.formData} />
        <PizzaList pizzas={this.state.pizzas} onEditPizza={this.handleEdit} />
      </Fragment>
    );
  }
}

export default App;
