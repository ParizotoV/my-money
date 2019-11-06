import React, { useState } from 'react';

import Rest from '../utils/rest';

const baseURL = 'https://mymoney-vparizoto.firebaseio.com/';
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

const Movement = ({ match }) => {

  const data = useGet(`movimentacoes/${match.params.id}`)
  const dataMonths = useGet(`meses/${match.params.id}`)
  const [dataPatch, patch] = usePatch()
  const [postData, salvar] = usePost(`movimentacoes/${match.params.id}`)
  const [removeData, remover] = useDelete()

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const onChangeDescricao = event => {
    setDescricao(event.target.value)
  }

  const onChangeValor = event => {
    setValor(event.target.value)
  }

  const saveMovement = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor(0)
      data.refetch()
      dataMonths.refetch()
    }
  }

  const removeMovement = async (id) => {
    await remover(`movimentacoes/${match.params.id}/${id}`)
    dataMonths.refetch()
    data.refetch()
  }

  const changePredictionEntry = (event) => {
    patch(`meses/${match.params.id}`, { previsao_entrada: event.target.value })
  }

  const changePredictionOutput = (event) => {
    patch(`meses/${match.params.id}`, { previsao_saida: event.target.value })
  }

  return (
    <div className='container'>
      <h1>Movimentações</h1>
      {
        !dataMonths.loading && dataMonths.data && <div>
          Previsão entrada: {dataMonths.data.previsao_entrada} <input type='text' onBlur={changePredictionEntry} />/ Previsão saída: {dataMonths.data.previsao_saida} <input type='text' onBlur={changePredictionOutput} /> <br/>
          Entradas: {dataMonths.data.entradas} / Saídas: {dataMonths.data.saidas}
        </div>
      }
      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object
              .keys(data.data)
              .map(movement => {
                return (
                  <tr key={movement}>
                    <td>{data.data[movement].descricao}</td>
                    <td className='text-right'>
                      {data.data[movement].valor} {'  '}
                      <button className='btn btn-danger' onClick={() => removeMovement(movement)}>-</button>
                    </td>
                  </tr>
                )
              })
          }
          <tr>
            <td>
              <input
                type='text'
                value={descricao}
                onChange={onChangeDescricao}
              />
            </td>
            <td>
              <input
                type='text'
                value={valor}
                onChange={onChangeValor}
              />
              {'  '}
              <button className='btn btn-success' onClick={saveMovement}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movement;