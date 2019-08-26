import React from 'react';
import useGet from './utils/UseGet';
import axios from 'axios'
import usePost from './utils/UsePost';

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

const url = 'https://mymoney-vparizoto.firebaseio.com/movement/2019-08.json'



function App() {
  
  const data = useGet(url)
  const [postData, post] = usePost(url)

  const saveNew = () => {
    post({ valor: 10, descricao: 'ola' })
  }

  return (
    <div className="App">
      <h1>My Money</h1>
      { JSON.stringify(data) }
      {data.loading && ( <p>Loading...</p> )}
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
    </div>
  );
}

export default App;
