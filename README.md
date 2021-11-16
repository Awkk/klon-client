# Klon

A responsive reddit clone that connect to a GraphQL API.

## About The Project

- Demo: https://klon.andrewkkw.com/

- Backend: https://github.com/Awkk/klon-server

![Klon Screen Shot](https://imgur.com/5zuUFWo.png)

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [urql](https://formidable.com/open-source/urql/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

Clone the project

```
$ git clone https://github.com/Awkk/klon-client.git
```

Install all dependencies

```
$ npm install
```

### Installation

First, clone and run a copy of the [Klon-server](https://github.com/Awkk/klon-server).

Then create file `.env.local` in root directory
and set up enviornment variable `NEXT_PUBLIC_API_URL` and point it to your klon-server API url:

```
NEXT_PUBLIC_API_URL={your klon server url}
```

### Executing program

```bash
$ npm run start
```
