import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("123");
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          alert(value);
        }}
      >
        查询
      </button>
      <button
        onClick={() => {
          setValue(value);
        }}
      >
        修改
      </button>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      {checked ? "已选中" : "未选中"}
    </div>
  );
};

export default App;
