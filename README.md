## Setup Environment

```
NODE_ENV=development
PORT=3030

DATABASE_URL="postgres://your-elephant-sql-url-here?schema=auth"
SHADOW_DATABASE_URL="postgres://your-elephant-sql-url-here?schema=shadow"
```

## Setup Project

Run the following commands

`npm install`

`npm start`

## Setup Prisma

Run the following commmands

`npx prisma migrate dev`
