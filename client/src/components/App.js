import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetailPage from '../components/views/MovieDetailPage/MovieDetailPage'
import FavoritePage from '../components/views/FavoritePage/FavoritePage'
import UploadPage from '../components/views/Upload/uploadPage'
import DashboardPage from '../components/views/BooksPage/dashboard';
import BookList from '../components/views/BooksPage/bookList';
import EditPage from '../components/views/BooksPage/editPage';
import Checkout from '../components/views/BooksPage/checkout';
import DetailsPage from '../components/views/BooksPage/detailsPage';
import Caro from './Home/carousel';
import Contents from './Home/content';   
import HomePage from './Home/homePage';
import LeadOpinion from '../components/Upload/leadOpinion';
import Article from '../components/Articles/articles';
import Contests from '../components/Contests/contest';
import DetailContests from '../components/Contests/details';
import DetailArticles from './Articles/details';
import DetailDebate from './Home/detail';
import Critique from '../components/Contests/critique'
import ArticleComment from './Articles/article-comment';
import ViewComments from './Articles/view-comments';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
       
       <NavBar />
      <div style={{ paddingTop: '1px', minHeight: 'calc(100vh - 80px)' }}>
     
        <Switch>
          {/* <Route exact path="/" component={Auth(LandingPage, null)} /> */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
          <Route exact path="/upload" component={Auth(UploadPage, null)} />
          <Route exact path="/booklist" component={Auth(BookList, null)} />
          <Route exact path="/edit/:bookId" component={Auth(EditPage, null)} />
          <Route exact path="/checkout" component={Auth(Checkout, null)} />
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/article" component={Auth(Article, null)} />
          <Route exact path="/contest" component={Auth(Contests, null)} />
          <Route exact path="/contest-details/:id" component={Auth(DetailContests, null)} />
          <Route exact path="/article-details/:id" component={Auth(DetailArticles, null)} />
          <Route exact path="/debate-details/:id" component={Auth(DetailDebate, null)} />
          <Route exact path="/debate" component={Auth(Contents, null)} />
          <Route exact path="/debate/:debateId" component={Auth(LeadOpinion, null)} />
          <Route exact path="/contest/:contestId" component={Auth(Critique, null)} />
          <Route exact path="/article-comment/:articleId" component={Auth(ArticleComment, null)} />
          <Route exact path="/view-comment/:commentId" component={Auth(ViewComments, null)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
