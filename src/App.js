import React, { useEffect, useState } from "react";

function App(props) {
  const [count, setCount] = useState(() => {
    return props.count || 0;
  });

  const handleCount = () => {
    setCount((count) => {
      return count + 1;
    });
  };
  return (
    <div>
      <span>{count}</span>
      <button onClick={handleCount}>+1</button>
    </div>
  );
}

export default App;
