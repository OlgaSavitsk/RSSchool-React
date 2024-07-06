import React, { ChangeEvent, Component } from 'react';

import classes from './index.module.css';

type SearchComponentProps = {
  onChange: (value: string) => void
}

export class SearchComponent extends Component<SearchComponentProps> {
  state = {
    searchValue: ''
  };

  onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value })
  }

  handleSearchValue = () => {
    const { searchValue } = this.state
    localStorage.setItem('search', JSON.stringify(searchValue))
    this.props.onChange(searchValue)
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <img src='../starwars.svg' alt='logo' />
        <input type='text' className={classes.input} onChange={this.onChangeSearch} placeholder='Search...' />
        <button onClick={this.handleSearchValue}>Search</button>
        <button className={classes.error}>Error</button>
      </div>
    )
  }
}