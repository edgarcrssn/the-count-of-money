# TODO Courte description

## Installation
1. Installer les dépendances (*à exécuter à la racine*)
```bash
npm install
```

2. Créer une instance *PostgreSQL* avec *Docker*
```bash
docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=the_count_of_money -p 5432:5432 -d postgres
```

3. Configurer les variables d'environnement dans `/apps/api/.env` et `/apps/ui/.env` (utilisez le `.env.example` comme exemple)

4. Appliquer les migrations et la seed, générant les types TypeScript associés aux modèles
```bash
npx prisma migrate
npx prisma db seed
```

5. Lancer l'application (à la racine)
```bash
# Backend
npx nx run api:serve
# Frontend
npx nx run ui:serve
```
