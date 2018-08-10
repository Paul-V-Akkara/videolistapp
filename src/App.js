import React, { Component } from 'react';
import search from './assets/img/search.png'
import back from './assets/img/Back.png'
import nav_bar from './assets/img/nav_bar.png'
import Page1 from './assets/jsons/CONTENTLISTINGPAGE-PAGE1.json';
import './App.css';
import ListComponent from './components/List'
import Search from './components/Search'


class VideoListApp extends Component {

  constructor() {
    super()
    this.myRef = React.createRef();
    this.state = {
      searchClick: false,
      items: Page1.page['content-items'].content.map((item, index) => this.addIdToData(item, index, 1)),
      currentPage: 1
    }
  }

  /** Called to add video items to data */
  addIdToData(item, index, page) {
    item.id = `${page}-${index}`
    return item
  }

  /** Called when user scroll down to implement lazy loading */
  handleScroll = (e) => {
    let offset = 100
    if (!this.state.searchClick && e.target.scrollHeight - e.target.scrollTop - offset <= e.target.offsetHeight ) {
      let newPage = this.getPage()
      if (newPage)
        this.setState({
          currentPage: this.state.currentPage + 1,
          items: this.state.items.concat(newPage.page['content-items'].content.map((item, index) => this.addIdToData(item, index, this.state.currentPage + 1)))
        })
    }
  }
  
    /** Get image page by page for lazy loading */
    getPage() {
      try {
          return require(`./assets/jsons/CONTENTLISTINGPAGE-PAGE${this.state.currentPage + 1}.json`);
      }
      catch (e) {
          return undefined;
      }
  }

  /** Called when user wants to search for a video */
  clickSearch() {
    this.setState({ searchClick: true })
  }

  /** Called when user click back when finished searching */
  onBackClick() {
    this.setState({ searchClick: false })
  }

  render() {
    return (
      <div ref={this.myRef} className="App flex flex-column primary overflow-y-auto" onScroll={this.handleScroll}>
        {this.state.searchClick ? <Search onBackClick={this.onBackClick.bind(this)} /> :
          <div className="App flex flex-100 flex-column primary" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <header className="w-100 h3 flex justify-center items-center" style={{ position: 'absolute', backgroundImage: `url(${nav_bar})`, backgroundSize: 'contain', backgroundRepeatX: 'repeat', backgroundRepeatY: 'no-repeat', maxWidth: '700px' }}>
              <img src={back} style={{ height: '1rem' }} className="pl2 z-1" alt="" />
              <div className="flex1 tl pl3 z-1" style={{ fontWeight: '200', fontSize: '1.5rem' }}>Romantic Comedy</div>
              <img src={search} style={{ height: '1.5rem' }} alt="" className="pr2 z-1" onClick={this.clickSearch.bind(this)} />
            </header>
            <ListComponent items = {this.state.items}/>
          </div>}
      </div>
    );
  }
}

export default VideoListApp;
