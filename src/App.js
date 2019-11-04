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

  const data = useGet('movement/2019-08')
  const [postData, post] = usePost('movement/2019-08')
  const [deleteData, remove] = useDelete();

  const saveNew = () => {
    post({ valor: 10, descricao: 'ola' })
  }

  const doRemove = () => {
    remove('/movement/2019-08/-LsFdR5hJwjRQEX1T7O0')
  }

  return (
    <div className="App">
      <h1>My Money</h1>
      {JSON.stringify(data)}
      {data.loading && (<p>Loading...</p>)}
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={doRemove}>Delete</button>
      <pre>{JSON.stringify(deleteData)}</pre>

    </div>
  );
}

export default App;
