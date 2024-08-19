const Avatar = ({ imgUrl, size }) => {
  return <img src={imgUrl} width={size}></img>;
};

const App = () => {
  return (
    <Avatar
      imgUrl="https://img2.baidu.com/it/u=4189153091,1264724965&fm=253&fmt=auto&app=138&f=PNG?w=814&h=187"
      size={500}
    />
  );
};

export default App;
