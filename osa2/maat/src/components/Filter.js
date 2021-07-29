import React from 'react'

const Filter = ({newFilter, onChangeFilter}) => {
    return(
      <div>
        find countries: <input value={newFilter} onChange={onChangeFilter} />
      </div>
    )
}

export default Filter