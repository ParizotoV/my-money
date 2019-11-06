import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'

const minYear = 2019;
const maxYear = 2022;
const AddMonth = () => {

  const [redir, setRedir] = useState('')

  const years = []
  const refYear = useRef()

  for (let i = minYear; i <= maxYear; i++) {
    years.push(i)
  }

  const months = []
  const refMonth = useRef()

  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }

  const zeroPad = num => {
    if(num < 10) {
      return '0'+num
    }
    return num
  }

  const viewMonth = () =>{
    setRedir(refYear.current.value + '-' + refMonth.current.value)
  }

  if(redir !== '') {
    return <Redirect to={'/movimentacoes/' + redir}/>
  }

  return (
    <React.Fragment>
      <h2>Adicionar mês</h2>
      <select ref={refYear}>
        {years.map(ano =>
          <option value={ano}>{ano}</option>
        )}
      </select>
      <select ref={refMonth}>
        {months.map(zeroPad).map(month =>
          <option value={month}>{month}</option>
        )}
      </select>

      <button onClick={viewMonth}>Adicionar mês</button>
    </React.Fragment>
  )

}

export default AddMonth;