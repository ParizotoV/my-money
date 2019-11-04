import React from 'react';
import {
  //useDelete,
  //useGet,
  //usePost,
  Rest
} from './utils';

// axios.get('https://mymoney-vparizoto.firebaseio.com/valor.json')
//   .then(res => {
//     console.log(res.data)
//   })

// axios
//   .post('https://mymoney-vparizoto.firebaseio.com/valor.json', { 
//     outro: 'Vinicius Parizoto'
//   })
//   .then(res => {
//     console.log(res)
//   })


const baseURL = 'https://mymoney-vparizoto.firebaseio.com/';

const { useGet, usePost, useDelete } = Rest(baseURL);

function App() {

  const data = useGet('month')
  // const [postData, post] = usePost('movement/2019-08')
  // const [deleteData, remove] = useDelete();

  const saveNew = () => {
    // post({ valor: 10, descricao: 'ola' })
  }

  const doRemove = () => {
    // remove('/movement/2019-08/-LsFdR5hJwjRQEX1T7O0')
  }

  return (
    <div className="App">
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand'>My Money</a>
        </div>
      </nav>
      <div className='container'>
        <h2>Adicionar mês</h2>

        <select>
          <option value='2019'>2019</option>
          <option value='2020'>2020</option>
        </select>
        <select>
          <option value='01'>01</option>
          <option value='02'>02</option>
        </select>

        <button>Adicionar mês</button>
        {
          data.loading && <span>Carregando...</span>
        }
        {
          !data.loading && (
            <table className='table'>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Previsão entrada</th>
                  <th>Entrada</th>
                  <th>Previsão saída</th>
                  <th>Saída</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object
                    .keys(data.data)
                    .map(mes => {
                      return (
                        <tr id={mes}>
                          <td>{mes}</td>
                          <td>{data.data[mes].previsao_entrada}</td>
                          <td>{data.data[mes].entrada}</td>
                          <td>{data.data[mes].previsao_saida}</td>
                          <td>{data.data[mes].saida}</td>
                        </tr>
                      )
                    })
                }
                <tr>
                  <td>2019-09</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          )
        }

        <pre>{JSON.stringify(data)}</pre>
      </div>
    </div>
  );
}

export default App;
