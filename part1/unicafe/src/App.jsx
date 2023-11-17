import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  );
}

const StatisticLine = ({stat, number}) => {
  if (stat === "positive") {
    return (
      <tr>
        <td>{stat}</td>
        <td>{number} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{stat}</td>
        <td>{number}</td>
      </tr>
    )
  }
}

const Stats = ({good, neutral, bad}) => {
  let totalFeedbacks = good + neutral + bad;
  let averageScore = good - bad;
  let positiveFeedback = ((good / totalFeedbacks) * 100).toFixed(1) || 0;

  if (totalFeedbacks === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine stat="good" number={good}/>
          <StatisticLine stat="neutral" number={neutral}/>
          <StatisticLine stat="bad" number={bad}/>
          <StatisticLine stat="total" number={totalFeedbacks}/>
          <StatisticLine stat="average" number={averageScore}/>
          <StatisticLine stat="positive" number={positiveFeedback}/>
        </tbody>
      </table>
    )
  }
}

const Button = ({handleClick, title}) => {
  return (
    <button onClick={handleClick}>{title}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    return setGood(good + 1);
  }

  const handleClickNeutral = () => {
    return setNeutral(neutral + 1);
  }

  const handleClickBad = () => {
    return setBad(bad + 1);
  }

  return (
    <div>
      <Header title="give feedback"/>
      <Button handleClick={handleClickGood} title="Good"/>
      <Button handleClick={handleClickNeutral} title="Neutral"/>
      <Button handleClick={handleClickBad} title="Bad"/>
      <Header title="statistics"/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}



export default App