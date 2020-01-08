import React from 'react'

 function ListItem(props) {
    return (
        <div className="list-container" id="list-container">{props.itemContainer}</div>
    )
}
export default ListItem;