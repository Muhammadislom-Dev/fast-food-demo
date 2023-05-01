import { Switch, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import HomeContent from "../../components/HomeContent/HomeContent";

const Homepage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <Switch>
        <Route path="/:dishtype">
          <HomeContent />
        </Route>
        <Route path="/" exact>
          <HomeContent />
        </Route>
      </Switch>
    </div>
  );
};
export default Homepage;
