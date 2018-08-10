import React, { Component } from 'react'
import ListItem from './ListItem';
import back from './../assets/img/Back.png'
import missingPoster from './../assets/img/placeholder_for_missing_posters.png'
import nav_bar from '../assets/img/nav_bar.png'

class Search extends Component {

    constructor() {
        super()
        this.myRef = React.createRef();
        this.state = {
            items: undefined
        }
    }

    /** Add vide item on the basis of searching text */
    addIdToData(item, index, page, searchText) {
        if (searchText && item.name.toLocaleLowerCase().search(searchText.toLocaleLowerCase()) !== -1) {
            item.id = `${page}-${index}`
            return item
        }
    }

    /** Called to fetch image from data */
    getImage(src) {
        try {
            return require(`./../assets/img/${src}`);
        }
        catch (e) {
            return missingPoster;
        }
    }

    /** Called when rendering to render each video item */
    renderListItem(item) {
        return <div key={item.id} className="w-third h-third" style={{ paddingTop: '4.5%' }}>
            <ListItem name={item.name} imageSrc={this.getImage(item['poster-image'])} />
        </div>
    }

    /** Called when user click back button */
    onBackClick() {
        if (this.props.onBackClick) {
            this.props.onBackClick()
        }
    }

    // Called when user search for a video
    searchData(e) {
        let searchText = e.target.value,
            pageCount = 0, searchResult = searchText === '' ? undefined : []
        while (searchText && pageCount < 3) {
            let newPage = require(`./../assets/jsons/CONTENTLISTINGPAGE-PAGE${++pageCount}.json`)
            // eslint-disable-next-line
            let item = newPage.page['content-items'].content.filter((item, index) => this.addIdToData(item, index, pageCount, searchText))
            searchResult = searchResult.concat(item)
        }
        this.setState({ items: searchResult })
    }

    /** Function to fix height shrinking on keyboard appearance */
    setAndroidDeviceViewport = () => {
        if (navigator.userAgent.match(/Android/i)) {
            setTimeout(() => {
                let viewportHeight = window.innerHeight
                let viewportWidth = window.innerWidth
                let viewPort = document.querySelector('meta[name=viewport]')
                viewPort.setAttribute('content', 'height=' + viewportHeight + 'px, width=' + viewportWidth + 'px, initial-scale=1.0')
            }, 300)
        }
    }

    render() {
        return <div className="flex relative flex1 w-100" style={{ maxWidth: '700px', margin:'0 auto'}}>
            <div className="ba w-100 flex items-center absolute h3" style={{
                overflowScrolling: "touch",
                WebkitOverflowScrolling: "touch",
                fontWeight: "200",
                position: 'absolute', backgroundImage: `url(${nav_bar})`, backgroundSize: 'contain', backgroundRepeatX: 'repeat', backgroundRepeatY: 'no-repeat', margin:'0 auto', maxWidth: '700px'
            }}>
                <img src={back} style={{ height: '1rem' }} className="pl2 pr2" alt="" onClick={this.onBackClick.bind(this)} />
                <input type="text" className="outline-0 h2 flex1 bn primary f5 pl3" autoFocus placeholder="Search..."
                    onChange={this.searchData.bind(this)} onFocus={this.setAndroidDeviceViewport.bind(this)} style={{background:'none'}}/></div>
            <div ref={this.myRef} className="flex flex-wrap flex1 pt5"
                style={{
                    alignContent: 'flex-start',
                    paddingLeft: '3%',
                    overflowScrolling: "touch",
                    WebkitOverflowScrolling: "touch",
                }}>
                {(this.state.items && this.state.items.length) ? this.state.items.map(item => this.renderListItem(item)) :
                    <div className="w-100 flex items-center justify-center">
                    <span>{this.state.items ? 'No results found' : ''}</span></div>}
            </div>
        </div>
    }
}
export default Search