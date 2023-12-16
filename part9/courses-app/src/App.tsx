interface Header {
  name: string;
}

interface Total {
  total: number;
}

interface Courses {
  courses: Array<CoursePart>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: ["node.js", "jest"];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = (props: Header) => {
  return (<h1>{props.name}</h1>)
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "group":
      return (
        <p>
          {props.name}
          {props.exerciseCount}
          {props.groupProjectCount}
        </p>
      );
    case "basic":
      return (
        <p>
          {props.name}
          {props.exerciseCount}
          {props.description}
        </p>
      );
    case "background":
      return (
        <p>
          {props.name}
          {props.exerciseCount}
          {props.description}
          {props.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          {props.name}
          {props.exerciseCount}
          {props.description}
          {props.requirements}
        </p>
      );
    default:
      return assertNever(props);
  }
}

const Content = (props: Courses) => {
  let id = 0;
  return (
    <div>
      {props.courses.map(course => {
        return (<Part key={id += 1} {...course} />)
      })}
    </div>
  );
};

const Total = (props: Total) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["node.js", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
};

export default App;