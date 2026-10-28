
import LikeButton from "./LikeButton";
import "./index.css";

function App() {
  return (
    <div className="app">
      <h1>My Posts</h1>

      <div className="post">
        <h2>My First Post</h2>
        <p>This is my first post. Welcome to my page!</p>

        <LikeButton postId={1} initialLikeCount={10} />
      </div>

      <div className="post">
        <h2>My Second Post</h2>
        <p>This is my second post. Thank you for reading!</p>

        <LikeButton postId={2} initialLikeCount={5} />
      </div>
    </div>
  );
}

export default App;






