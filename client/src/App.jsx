import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Home from './container/Home';
import { gapi } from "gapi-script";
import { useEffect } from 'react';
import { fetchUser } from './utils/fetchUser';

function App() {
  //Решения проблемы с устаревшим react-google-login
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const navigate = useNavigate()

  useEffect(() => {
    const user = fetchUser();

    if(!user) {
      navigate('/login')
    }
  },[])

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
}

export default App;
