import { useState } from "react";

const SecPage = () => {
  // let name = 'mario';
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);

  const handleClick = () => {
    // name = 'luigi';
    setName('Amine');
    setAge(24);
  }

  return (
    <div className="home">
      <h2>SecPAge</h2>
      <p>{ name } is { age } years old</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
 
export default SecPage;