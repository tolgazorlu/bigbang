<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="/bigbang.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BigBang</h3>

  <p align="center">
    MERN STACK E-COMMERCE PROJECT
    <br />
    <a href="https://github.com/tolgazorlu/bigbang"><strong>View Demo (Soon)</strong></a>
    <br />
    <br />
    <a href="https://github.com/tolgazorlu/bigbang/issues">Report Bug</a>
    ·
    <a href="https://github.com/tolgazorlu/bigbang/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

<img src="/space commerce.png" alt="Alt text" title="Optional title">

### English

We implemented the **BigBang** application using **React, NodeJS, Express, MongoDB, Typescript, Tailwind** technologies. **Bigbang** is an imaginary e-commerce project where you can buy planets, stars, meteorites from every point of the universe, somewhere in the future.

### Türkçe

**React, NodeJS, Express, MongoDB, Typescript, Tailwind** teknolojilerini kullanarak **BigBang** uygulamasını geliştirdim. **Bigbang** bir e-ticaret projesidir.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies

<p align="center">
  <a>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  </a>
  <a>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  </a>
  <a><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/></a>
  <a><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/></a>
  <a><img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/></a>
  <a><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/></a>
  <a><img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/></a>
  <a><img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"/></a>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Features -->
## Features

- [x] Parallax Page
- [x] Register to Bigbang
- [x] Login to Bigbang
- [x] List Products
- [x] Add products to Cart
- [x] Change products in Cart
- [x] Edit item quantity in Cart
- [x] Choose payment method
- [x] Edit shipping information
- [x] Edit items in place order
- [x] Edit payment method
- [x] Test pay for products
- [x] Order products
- [x] List Order History
- [x] User profile edit
- [ ] New features coming soon
    - [ ] SearchBox and categories filter
    - [ ] Admin Dashboard Page
    - [ ] Checking strong password for user registration
    - [ ] Upload user avatar
    - [ ] About Page
    - [ ] Deployed to web services


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an MERN Stack example of e-commerce project.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This project doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/tolgazorlu/bigbang.git
   ```
2. Install client packages
   ```sh
   cd client
   npm install
   npm run dev
   ```
3. Create '.env' file in server folder. Paste this code in file.
   ```sh
   PORT=8000
   MONGO_URI=example_mongodb_url
   BASE_CLIENT_URL=http://localhost:8080
   BASE_SERVER_URL=http://localhost:3000
   TOKEN_KEY=example_jwt_key
   ```
4. Install server packages
   ```sh
   cd server
   npm install
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Tolga Zorlu - [@linkedin](https://www.linkedin.com/in/tolgazorlu/)

Project Link: [https://github.com/tolgazorlu/bigbang](https://github.com/tolgazorlu/bigbang)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [NodeJS](https://nodejs.org/en)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [JsonWebToken](https://jwt.io/)
* [Eslint](https://eslint.org/)
* [React Router Dom](https://reactrouter.com/en/main)
* [React Context](https://react.dev/reference/react/useContext)
* [React Query](https://tanstack.com/query/v3/)
* [DaisyUI](https://daisyui.com/)
* [Flowbite](https://flowbite.com/)






<p align="right">(<a href="#readme-top">back to top</a>)</p>
