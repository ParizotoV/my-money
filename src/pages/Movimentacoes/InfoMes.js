import React from 'react'
import { useMesApi } from '../../api'

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMesApi(data)

  const changePredictionEntry = (event) => {
    alterarMes({ previsao_entrada: event.target.value })
  }

  const changePredictionOutput = (event) => {
    alterarMes({ previsao_saida: event.target.value })
  }

  if (infoMes.loading) {
    return <p>Carregando dados do mês...</p>
  }
  if (infoMes.data) {
    return (
      <React.Fragment>
        <div>
          Previsão entrada: {infoMes.data.previsao_entrada} <input type='text' onBlur={changePredictionEntry} />/ Previsão saída: {infoMes.data.previsao_saida} <input type='text' onBlur={changePredictionOutput} /> <br />
          Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
        </div>
      </React.Fragment>
    )
  }
return null
}

export default InfoMes;