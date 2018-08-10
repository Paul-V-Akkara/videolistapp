import React, { Component } from 'react';
import ListItem from './ListItem';
import missingPoster from './../assets/img/placeholder_for_missing_posters.png'

class ListComponent extends Component {

    /** Called to fetch image from data */
    getImage(src) {
        try {
            return require(`./../assets/img/${src}`);
        }
        catch (e) {
            return missingPoster;
        }
    }


    /** Called when render component to render each video item */
    renderListItem(item) {
        return <div key={item.id} className="w-third h-third" style={{ paddingTop: '4.5%' }}>
            <ListItem name={item.name} imageSrc={this.getImage(item['poster-image'])} />
        </div>
    }

    render() {
        return <div className="flex flex-wrap flex1 pt5" 
            style={{
                alignContent: 'flex-start',
                paddingLeft: '3%',
                overflowScrolling: "touch",
                WebkitOverflowScrolling: "touch",
            }}>
            {this.props.items.map(item => this.renderListItem(item))}
        </div>
    }
}
export default ListComponent