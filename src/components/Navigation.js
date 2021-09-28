import { Link } from 'react-router-dom';
import './Navigation.scss';

function Navigation() {

  return (
    <div className="navigation-wrapper">
      <Link to='/list'>Exercise List</Link>
      <Link to='/workout'>Start Workout</Link>
    </div>
  );
}

export default Navigation;
