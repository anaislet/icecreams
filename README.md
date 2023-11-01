# Icecreams

Gelato Creazioni is a web application that allows users to create their own ice cream sundae. The goal is to enable users to craft their ice cream by choosing flavors from the © Berthillon catalog. They can then view the nutritional information of their selections and add a name to it. Before generating their recipe sheet in PDF format, they can check whether their ice cream sundae is an original creation or if others have had the same idea before them.

Gelato Creazioni is a website developped with VueJS as frontend, ExpressJS as backend and using a PostGreSQL database.

## Tech Stack

**Frontend:** Vue.js, Tailwind, pdf-lib, fontkit, Vite

**Backend:** Node.js, Express.js, Sequelize

**DB:** PostgreSQL

## Run Locally

Install Node.js : https://nodejs.org/en/download/

Install Vue.js : https://v2.vuejs.org/v2/guide/installation.html

Clone the project

```
git clone https://github.com/anaislet/icecreams
```

Go to the project directory

```
cd icecreams
```

Install dependencies in the back and in the front

```
npm install
```

Start the backend server (will be on the port 3000)

```
cd back
node index.js
```

Start the frontend server (will be on the port 5173)

```
cd front
npm run dev
```

The application can be reached on http://localhost:5173 with any web browser.