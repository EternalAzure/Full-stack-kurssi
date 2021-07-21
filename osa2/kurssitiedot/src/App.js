import Course from './components/Course'

const App = (props) => {
  const {courses} = props

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}



export default App