/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      fontSize: {
        "default": '11px',
        "contact-dashboard-box": '11px',
        "contact-dashboard-title": '11px',
        "page-header": '11px',
        "todo-dashboard-box": '11px',
        "todo-dashboard-title": '11px',
        "sales-dashboard-box": '11px',
        "sales-dashboard-title": '11px',
        "purchase-dashboard-box": '11px',
        "purchase-dashboard-title": '11px',
        "inventory-dashboard-box": '11px',
        "inventory-dashboard-title": '11px',
        "catalog-dashboard-box": '11px',
        "catalog-dashboard-title": '11px',
        "transaction-dashboard-box": '11px',
        "transaction-dashboard-title": '11px',
        "ledger-dashboard-box": '11px',
        "ledger-dashboard-title": '11px',
      },
      backgroundColor: {
        "default": 'white',
        "page-content": 'transparent',
        "contact": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#6d5e00c2',
            "title": '#6d5e00'
          }
        },
        "todo": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#00006dc2',
            "title": '#0000FF'
          }
        },
        "sales": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#550081d4',
            "title": '#5a0a43'
          }
        },
        "purchase": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#550081d4',
            "title": '#5a0a43'
          }
        },
        "inventory": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#550081d4',
            "title": '#5a0a43'
          }
        },
        "catalog": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#00006dc2',
            "title": '#0000FF'
          }
        },
        "transaction": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#00556dc2',
            "title": '#00556d'
          }
        },
        "ledger": {
          "dashboard": {
            "logo": 'transparent',
            "box": '#00556dc2',
            "title": '#00556d'
          }
        }
      },
      textColor: {
        "page-header": '#ffffff',
        "page-footer": '#ffffff',
        "contact": {
          "dashboard": {
            "logo": '#ffffff',
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "todo": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "sales": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "purchase": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "inventory": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "catalog": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "transaction": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        },
        "ledger": {
          "dashboard": {
            "box": '#ffffff',
            "title": '#ffffff'
          }
        }
      },
      colors: {
        "contact": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "todo": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "sales": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "purchase": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "inventory": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "catalog": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "transaction": {
          "dashboard": {
            "logo": '#ffffff',
          }
        },
        "ledger": {
          "dashboard": {
            "logo": '#ffffff',
          }
        }
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
    pattern: /(bg|background|text|leading|fill|stroke)-(default|page|contact|todo|sales|purchase|inventory|catalog|transaction|ledger)/
  }]
}

