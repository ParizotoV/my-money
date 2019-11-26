import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useMovimentacaoApi } from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movement = ({ match: { params } }) => {
  const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacaoApi(params.id)
  const salvarMovimentacao = async (dados) => {
    console.log(dados)
    await salvarNovaMovimentacao(dados)
    movimentacoes.refetch()
    // infoMes.refetch()
  }

  const removerMovimentacaoClick = async (id) => {
    console.log(id)
    await removerMovimentacao(`movimentacoes/${params.id}/${id}`)
    movimentacoes.refetch()
    // infoMes.refetch()
  }

  if (movimentacoes.error === 'Permission denied') {
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <h1>Movimentações</h1>
      <InfoMes data={params.id} />
      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object
              .keys(movimentacoes.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{movimentacoes.data[movimentacao].descricao}</td>
                    <td className='text-right'>
                      {movimentacoes.data[movimentacao].valor} {'  '}
                      <button className='btn btn-danger' onClick={() => removerMovimentacaoClick(movimentacao)}>-</button>
                    </td>
                  </tr>
                )
              })
          }
          <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
        </tbody>
      </table>
    </div>
  )
}

export default Movement