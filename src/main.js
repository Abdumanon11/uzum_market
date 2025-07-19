import axios from "axios";
const pages = [

  {
    path: '/',
    view: async (app) => {
      const home = await axios.get('/src/pages/home.html')
      app.innerHTML = home.data
    },

    loandStyles: async () => {
      import('../src/styles/home.css')
      import('../src/styles/menu.css')
      import('../src/styles/swiper.css')
    },
    loandScripts: async ()  => {
      import('../src/scripts/menu.js')
      import('../src/scripts/home.js')
      import('../src/scripts/swiper.js')
    }

  },
  {
    path: '/menu',

    view: async (app) => {
      const home = await axios.get('/src/pages/menu.html')
      app.innerHTML = home.data
    },

    loandStyles: async () => {
      import('../src/styles/menu.css')
    },
    loandScripts: async ()  => {

      import('../src/scripts/menu.js')
    }
  },
  {
    path: '/korzina',
    view: async (app) => {
      const home = await axios.get('/src/pages/korzina.html')
      app.innerHTML = home.data
    },

    loandStyles: async () => {
      import('../src/styles/menu.css')
      import('../src/styles/korzina.css')
    },
    loandScripts: async ()  => {
      import('../src/scripts/menu.js')
      import('../src/scripts/korzina.js')
    }



  },
  {
    path: '/404 ',
    view: async (app) => {
      const home = await axios.get('/src/pages/404.html')
      app.innerHTML = home.data
    },

    loandStyles: async () => {
      import('../src/styles/404.css')
    }
  },

  {
    path: '/like',
    view: async (app) => {
      const home = await axios.get('/src/pages/like.html')
      app.innerHTML = home.data
    },

    loandStyles: async () => {
      import('../src/styles/like.css')
      import('../src/styles/menu.css')
    },
    loandScripts: async ()  => {
      import('../src/scripts/like.js')
      import('../src/scripts/menu.js')
    }
  },
  {
    path: '/produkt',
    view: async (app) => {
      const home = await axios.get('/src/pages/produkt.html')
      app.innerHTML = home.data
    },
    loandStyles: async () => {
      import('../src/styles/produkt.css')
      import('../src/styles/menu.css')
    },
    loandScripts: async ()  => {
      import('../src/scripts/produkt.js')
      import('../src/scripts/menu.js')
    }

  }

]

async function error(app){
  const home = await axios.get('/src/pages/404.html')
  await import('../src/styles/404.css')
  await import('../src/scripts/404.js')
  app.innerHTML = home.data
}

export async function router() {
  const path = window.location.pathname;
  const app = document.getElementById('app');
  const route = pages.find(route => route.path === path);

  if (!route) return await error(app);

  if (route.loandStyles) await route.loandStyles();
  if (route.view) await route.view(app);
  if (route.loandScripts) await route.loandScripts();
}
router()