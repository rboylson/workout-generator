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
        extend: 'padding: 3px 6px;',
        open: {
          background: '#fff',
        }
      }
    },

    size: {
      medium: "275px",
    },

    font: {
      family: 'Montserrat',
    },

  },
  
  button: {
    extend: () => `
      font-size: 18px;
      font-weight: normal;
      color: purple;
      background: #fff;
      border-color: pink;

      &::placeholder {
        color: purple;
      }


      &:hover {
        color: purple;
      }

      svg {
        fill: purple;
        stroke: purple;
      }
    `,
  },

  text: {
    xlarge: {
      height: '50px',
      size: '50px'
    },
    large: {
      size: '30px',
      height: '50px',
    },
    medium: {
      size: '20px',
      height: '30px',
    },
    extend: () => `
      font-weight: normal;
      color: purple;

      &::placeholder {
        color: purple;
      }
    `,
  },

  table: {
    body: {
      pad: { horizontal: '0px', vertical: '0px' },
    },
    header: {
      pad: { horizontal: '0px', vertical: 'xsmall' },
    },
    tableCell: {
      text: {
          lineHeight: '10px',
          color: 'red',
      }
    },
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
      font-size: 18px;
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
