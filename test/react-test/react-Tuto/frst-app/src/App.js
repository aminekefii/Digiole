import Blog from './Blog';
import Home from './Home';
import Navbar from './Navbar';
import SecPage from './SecPage';


function App() {

  const title ='welcome';
  const likes=50;
  const link="https://www.facebook.com/amine.kefi.982/"
  return (
    <div className="App">

    <Navbar/>

     <div className="content">
      <Home/>
      <h2>{title}</h2>
      <p>Liked {likes} times</p>
      <a href={link}>Facebook</a>  
      <SecPage/>
      <Blog/>

         </div>
         <div>
         </div>
    </div>
  );
}

export default App;
