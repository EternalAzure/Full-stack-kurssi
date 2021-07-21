import React from 'react'

const Course = ({ course }) => { 
  const totalAmount = course.parts.reduce((sum , part) => sum + part.exercises, 0)
  const abc = `total of ${totalAmount} exercises`
  return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <b>{abc}</b>
    </div>
  )
}
const Header = ({ name }) => { 
  return (
    <h2>
    {name}
    </h2>
  )
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}
const Part = ({ name, exercises }) => {
  return (
    <p>
    {name} {exercises}
    </p>
  )
}

export default Course