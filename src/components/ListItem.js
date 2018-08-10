import React, {
    Component
} from 'react';

class ListItem extends Component {

    render() {
        return <div className="w-90 h-100 flex flex flex-column">
            <img src={this.props.imageSrc} className="h-80" alt="" />
            <div className="flex-auto pt2 tl flex-none" style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: '200'
            }}>{this.props.name}</div>
        </div>
    }
}
export default ListItem