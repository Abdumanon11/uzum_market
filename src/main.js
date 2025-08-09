import axios from "axios";

import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

// Разрешаем CORS
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(middlewares);
server.use(router);

server.listen(7777, () => {
  console.log("JSON Server is running on port 7777");
});

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
      import('../src/styles/showMessage.css')
      import('../src/styles/mediya.css')
    },
    loandScripts: async () => {
      import('../src/scripts/menu.js')
      import('../src/scripts/showMessage.js')
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
       import('../src/styles/mediya.css')
    },
    loandScripts: async () => {

      import('../src/scripts/menu.js')
    }
  },

    {
    path: '/katalog',
    view: async (app) => {
      const home = await axios.get('/src/pages/katalog.html')
      app.innerHTML = home.data
    },
    loandStyles: async () => {
      import('../src/styles/katalog.css')
      import('../src/styles/menu.css')
       import('../src/styles/mediya.css')

    },
    loandScripts: async () => {
      import('../src/scripts/katalog.js')
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
       import('../src/styles/mediya.css')
    },
    loandScripts: async () => {
      import('../src/scripts/menu.js')
      import('../src/scripts/korzina.js')
      import('../src/scripts/home.js')
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
       import('../src/styles/mediya.css')
    },
    loandScripts: async () => {
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
      import('../src/styles/productpx.css')
      import('../src/styles/showMessage.css')
       import('../src/styles/mediya.css')
    },
    loandScripts: async () => {
      import('../src/scripts/produkt.js')
      import('../src/scripts/menu.js')
      import('../src/scripts/productpx.js')
      import('../src/scripts/showMessage.js')

    }

  }

]

async function error(app) {
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