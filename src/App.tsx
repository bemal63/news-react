import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Article from "./pages/Article";

const Pages = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <div className="container">
        {/* Keep feed filters and loaded results when returning from an article. */}
        <div hidden={pathname !== "/"}><Main /></div>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/news/:id" element={<Article />} />
          <Route path="*" element={<main><h1>Page not found</h1><Link to="/">Back to news</Link></main>} />
        </Routes>
      </div>
    </>
  );
};

const App = () => <BrowserRouter><Pages /></BrowserRouter>;
export default App;
