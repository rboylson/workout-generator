import { Link } from 'react-router-dom';
import { Header, Nav } from 'grommet';

function Navigation() {

  return (
    <Header background="light-4" pad="small">
      <Nav direction="row">
        <Link to='/list'>Exercise List</Link>
        <Link to='/workout'>Start Workout</Link>
      </Nav>
    </Header>      
  );
}

export default Navigation;
