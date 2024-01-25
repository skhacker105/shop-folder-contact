/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      fontSize: {
        "default": '11px',
        "page-header": '11px',
        "page-footer": '11px',

        "dashboard-box": '9px',
        "dashboard-title": '9px',
      },
      backgroundColor: {
        "default": 'white',
        "page-content": 'transparent',
        "selected": {
          "row": "#f5f7f7 !important"
        },
        "dashboard": {
          "logo": 'transparent',
          "box": '#afb1c3c2',
          "title": '#020268',
          "title-logo": 'transparent',
        }
      },
      textColor: {
        "page-header": '#ffffff',
        "page-footer": '#ffffff',
        "selected": {
          "row": "blue !important"
        },
        "dashboard": {
          "box": '#000000',
          "title": '#ffffff'
        },
      },
      colors: {
        "dashboard": {
          "logo": 'black',
          "title-logo": 'white'
        },
      },
      backgroundImage: {
        "page-header": `url('assets/bg-header.png')`,
        "page-footer": `url('assets/bg-footer.png')`,
        "dashboard-title": `url('assets/bg-footer.png')`,
      },
      lineHeight: {
        "page-header": '33px'
      },
      borderColor: {
        "dashboard": {
          "title": "white"
        }
      }
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|background|text|leading|fill|stroke|border-b)-(selected|default|page|dashboard|url)/
  }]
}

