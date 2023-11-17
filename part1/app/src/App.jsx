// Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => { // props has property parts that is an array
  return (
  <>
    <Part part={props.parts[0].name} num={props.parts[0].exercises}/>
    <Part part={props.parts[1].name} num={props.parts[1].exercises}/>
    <Part part={props.parts[2].name} num={props.parts[2].exercises}/>
  </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.num}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts.reduce((acc, curr) => acc += curr.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App