import { useState } from "react";
import { SketchPicker } from "react-color";
import "./App.css";
import { invoke } from '@tauri-apps/api/tauri';

function App() {
  const [color, setColor] = useState('#1FA9F4')
  const [gradient, setGradient] = useState([])
  return (
    <div>
      <SketchPicker
        color={color}
        onChange={(color, event) => {
          setColor(color)
          invoke("generate_gradient", color.rgb).then((grad) => {
            console.log(grad)
            setGradient(grad)
          })
        }}
      />
      {gradient?.map(color => (
        <div style={{
          padding: "2rem",
          backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        }}>
          rgb({color[0]}, {color[1]}, {color[2]})
        </div>
      )
      )}
    </div>
  );
}

export default App;
