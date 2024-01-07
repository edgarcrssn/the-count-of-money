The count of money is a web platform about crypto-currencies.

## Installation
1. Install dependencies (at root)
```bash
npm install
```

1. Create a *PostgreSQL* instance by using *Docker*
```bash
docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=the_count_of_money -p 5432:5432 -d postgres
```

1. Set up the en variables in `/apps/api/.env` and `/apps/ui/.env` (take example on `.env.example`)

2. Apply migrations and seed, generating the TypeScript types associated to the Prisma models
```bash
npx prisma migrate
npx prisma db seed
```

1. Run the app (at root)
```bash
# Backend
npx nx run api:serve
# Frontend
npx nx run ui:serve
```
