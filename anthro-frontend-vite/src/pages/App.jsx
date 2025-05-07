import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import SpinningIndex from "./SpinningIndex";
import ParallaxPage from "./ParallaxPage";
import FloatingObjects from "./FloatingObjects";
import TeamPage from "./TeamPage";
import PostPage from "./PostPage";
import ListPostsPage from "./ListPostsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/spinningindex" element={<SpinningIndex />} />
        <Route path="/parallax/:topic" element={<ParallaxPage />} />
        <Route path="/subtopic/:slug" element={<ListPostsPage />} />
        <Route path="/post/:topic" element={<PostPage />} />
        <Route path="/float" element={<FloatingObjects />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
