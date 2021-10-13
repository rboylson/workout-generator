import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import './index.scss'
import { Grommet } from 'grommet';


const theme = {

  global: {
    colors: {
      selected: '#ffdbe1',
      brand: 'purple',
      color: 'white',
      border: '#ffdbe1',
    },
    focus: {
      border: {
        color: '#fff00',
      },
    },
    select: {
      control: {
        open: {
          background: '#fff',
        }
      }
    },
  },
  button: {
    extend: () => `
      color: purple;
      background: #fff;

      &:hover {
        color: purple;
      }
    `,
  },
  checkBox: {
    size: "35px",
    check: {
      radius: "6px",
      extend: () => `
        background-color: white;
      `,
    },
    border: {
      color: '#ffdbe1',
    },
    hover: {
      border: {
        color: 'purple',
      }
    }
  },
  textInput: {
    extend: () => `
      font-weight: normal;
      color: purple;
      background: #fff;

      &::placeholder {
        color: purple;
      }
    `,
  },
};


ReactDOM.render(
    <React.StrictMode>
      <Grommet 
      theme={theme}
      >
        <App />
      </Grommet>
    </React.StrictMode>,
  document.getElementById('root')
);
