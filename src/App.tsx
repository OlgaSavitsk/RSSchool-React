import React, { Component, Fragment } from "react";
import "./App.css";
import { SearchComponent } from "./components/search";
import { CardListComponent } from "./components/card-list";
import axios from "axios";
import { LoaderComponent } from "./components/loader";
import { StarWarsPeople } from "./types/item.types";

type AppState = {
  data: StarWarsPeople[] | null,
  isLoading: boolean,
  searchValue: string
}

export class App extends Component {
  state: AppState = {
    data: null,
    isLoading: true,
    searchValue: ''
  };

  componentDidMount() {
    const savedValue = JSON.parse(localStorage.getItem('search')!) || ''
    this.fetchData(savedValue);
  }

  componentDidUpdate(_: unknown, prevState: AppState) {
    if (
      this.state.searchValue !== prevState.searchValue
    ) {
      this.fetchData(this.state.searchValue)
    }
  }

  async fetchData(savedValue: string) {
    this.setState({ isLoading: true })
    try {
      console.log(savedValue, this.state.searchValue)
      axios.get(`https://swapi.dev/api/people/?page=1&search=${savedValue}`)
        .then(response => this.setState({ data: response.data.results, isLoading: false }))
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { data, isLoading } = { ...this.state }
    if (isLoading) {
      return <LoaderComponent />
    }
    return (
      <Fragment>
        <SearchComponent onChange={(value) => this.setState({ searchValue: value })} />
        {data ? <CardListComponent data={data} /> : null}
      </Fragment>
    );
  }
}

export default App;
