import { useState, useEffect } from 'react'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import { getAllEntries, createEntry } from './services/diaryService';

const Entry = (entry: DiaryEntry) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>visbility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </div>
  )
}

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Cloudy);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Good);
  const [newComment, setNewComment] = useState<string>('');
  const [newMsg, setNewMsg] = useState('');


  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    })
  }, [])

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entry: NewDiaryEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    }

    try {  
      const res = await createEntry(entry)
      setEntries(entries.concat(res));
      setNewDate('');
      setNewVisibility(Visibility.Good);
      setNewWeather(Weather.Cloudy);
      setNewComment('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error: ' + error.message)
        setNewMsg(error.message);
        setTimeout(() => {
          setNewMsg('');
        }, 4000)
      }
    }
  }

  return (
    <div>
      <p style={{color: 'red'}}>{newMsg}</p>
      <form onSubmit={entryCreation}>
        <label>date: </label>
        <input type='date' name='date' value={newDate} onChange={(event) => {
          setNewDate(event?.target.value)} 
        }/>
        <fieldset>
          <label>visbility: </label>
          {Object.values(Visibility).map(val => {
            return (
              <div>
                <input type='radio' id={val} name='visibility' value={val} onChange={() => setNewVisibility(val)} />
                <label htmlFor={val}>{val}</label>
              </div>
            )
           })
          }
        </fieldset>
        <fieldset>
          <label>weather: </label>
          {Object.values(Weather).map(val => {
            return (
              <div>
                <input type='radio' id={val} name='weather' value={val} onChange={() => setNewWeather(val)} />
                <label htmlFor={val}>{val}</label>
              </div>
            )
           })
          }
        </fieldset>
        <label>comment </label>
        <input type='text' name="comment" onChange={(e) => setNewComment(e?.target.value)} />
        <input type="submit"value='add'/>
      </form>
      <h1>Diary entries</h1>
      {entries.map((entry: DiaryEntry) => {
        return <Entry {...entry} />
      })}
    </div>
  )
}


export default App;