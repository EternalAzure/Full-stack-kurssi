
const Filter = ({filter, handler}) => {
    return (
      <div>
        filter with: <input value={filter} onChange={handler} />
      </div>
    )
}

export default Filter