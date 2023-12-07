import { useState } from "react";
import { lazy, Suspense } from "react";
import "./App.css";

const LazyComponent=lazy(()=>import('./LazyComponent'))

function App() {
  const [first, setfirst] = useState(false);

async function response() {
  const user = {
    name:'john',
    age:20
  }
  await fetch('http://localhost:3000/api/user',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include'
  })
  .then(response => {
    

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
    
  })
  .then(data => {
   console.log(data)
    return data.headers
  })
  .then(body=>{
      console.log(body)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
  return (
    <>
      {first && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <LazyComponent />
        </Suspense>
      )}
      <button onClick={() => setfirst(true)}>click and load lazy</button>
      <button onClick={() => response()}>запрос</button>

    </>
  );
}

export default App;
