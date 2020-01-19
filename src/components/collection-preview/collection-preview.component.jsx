import React from "react"

import CollectionItem from "../collection-item/collection-item.component"

import "./collection-preview.styles.scss"

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1>{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((_, index) => index < 4)
        .map(({ id, ...props }) => (
          <CollectionItem key={id} {...props} />
        ))}
    </div>
  </div>
)

export default CollectionPreview
