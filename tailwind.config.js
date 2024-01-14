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

        "dashboard-zone1-box": '9px',
        "dashboard-zone1-title": '9px',
        "dashboard-zone2-box": '9px',
        "dashboard-zone2-title": '9px',
        "dashboard-zone3-box": '9px',
        "dashboard-zone3-title": '9px',
        "dashboard-zone4-box": '9px',
        "dashboard-zone4-title": '9px',
      },
      backgroundColor: {
        "default": 'white',
        "page-content": 'transparent',
        "dashboard": {
          "zone1": {
            "logo": 'transparent',
            "box": '#6d5e00c2',
            "title": '#6d5e00'
          },
          "zone2": {
            "logo": 'transparent',
            "box": '#550081d4',
            "title": '#5a0a43'
          },
          "zone3": {
            "logo": 'transparent',
            "box": '#00556dc2',
            "title": '#00556d'
          },
          "zone4": {
            "logo": 'transparent',
            "box": '#00006dc2',
            "title": '#0000FF'
          }
        },
      },
      textColor: {
        "page-header": '#ffffff',
        "page-footer": '#ffffff',
        "dashboard": {
          "zone1": {
            "logo": '#ffffff',
            "box": '#ffffff',
            "title": '#ffffff'
          },
          "zone2": {
            "box": '#ffffff',
            "title": '#ffffff'
          },
          "zone3": {
            "box": '#ffffff',
            "title": '#ffffff'
          },
          "zone4": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
      },
      colors: {
        "dashboard": {
          "zone1": {
            "logo": '#ffffff'
          },
          "zone2": {
            "logo": '#ffffff',
          },
          "zone3": {
            "logo": '#ffffff',
          },
          "zone4": {
            "logo": '#ffffff',
          }
        },
      },
      backgroundImage: {
        "page-header": 'linear-gradient(180deg, rgb(15 28 134 / 91%) 4%, rgb(102 3 255 / 86%) 92%)',
        "page-footer": 'linear-gradient(180deg, rgb(15 28 134 / 91%) 4%, rgb(102 3 255 / 86%) 92%)'
      },
      lineHeight: {
        "page-header": '33px'
      }
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|background|text|leading|fill|stroke)-(default|page|dashboard)/
  }]
}

