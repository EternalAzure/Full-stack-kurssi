
const Persons = ({contactsToShow}) => {
    return (
      <div>
        {contactsToShow.map(p => {
          return <p key={p.name}> {p.name} {p.number} </p>
        })}
      </div>
    )
  }

  export default Persons