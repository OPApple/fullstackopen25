const Header = ({course}) => {
    return(
      <>
        <h1>{course.name}</h1>
      </>
    )
  } 
  
const Part = (props) => {
    return(
      <div>
        <p>
            {props.name} {props.exercises}
        </p>
      </div>
    )
  }
  
const Content = ({course}) => {
    return(
      <>
        {
            course.parts.map(part => 
                <Part key={part.name} name={part.name} exercises={part.exercises}/>
            )
        }
      </>
    )
  }

const Total = (props) => {
    return(
      <>
        <h4>
            Number of exercises 
            {props.course.parts.map(n => 
                    n.exercises).reduce((x, y) => x+y
                )
            }
        </h4>
      </>
    )
  }

  
const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default Course