
const PersonForm = ({addContact, newName, newNumber, onChangeName, onChangeNumber}) => {
    return (
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName}
          onChange={onChangeName}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm