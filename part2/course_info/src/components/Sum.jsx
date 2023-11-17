const Sum = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => acc += curr.exercises, 0);

  return (
    <h3>Total of {sum} exercises</h3>
  )
}

export default Sum;