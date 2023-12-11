# Count of Money
Count of Money est une application web qui permet aux utilisateurs de gérer les crypto-monnaies, les sessions utilisateur et les revues de presse. L'application est conçue pour afficher des informations sur les crypto-monnaies, gérer les sessions utilisateur et fournir des articles pertinents en fonction des préférences des utilisateurs.
## Fonctionnalités

### Gestion des utilisateurs
Trois niveaux d'accès sont gérés avec des privilèges spécifiques :
- Accès anonyme : 
  - Accéder aux N (définis par un administrateur) cours de crypto-monnaies les plus populaires ainsi qu'à leur évolution (tendance et pourcentage) depuis l'ouverture.
  - Vérifier les derniers K (définis par un administrateur) articles de presse.
- Accès utilisateur : 
  - Doit d'abord créer un compte.
  - L'utilisateur peut s'authentifier par e-mail/mot de passe.
  - L'utilisateur peut s'authentifier par Oauth2.
  - Peut déterminer sa propre liste (établie par un administrateur, même liste que l'utilisateur anonyme par défaut) de crypto-monnaies.
  - Peut définir des mots-clés pour affiner la revue de presse.
  - Peut modifier ses préférences sur sa page de profil.
- Accès administrateur : 
  - Gérer les préférences d'application globales.
  - Liste des crypto-monnaies consultables.
  - Liste des sources (flux RSS) pour constituer la revue de presse.

### Crypto-monnaies
L'API de backend gère les crypto-monnaies. Les informations sur les crypto-monnaies doivent être affichées, telles que le prix actuel, le prix d'ouverture, le prix le plus bas/le plus élevé de la journée et les images correspondantes. De plus, elle doit fournir l'historique des prix des crypto-monnaies basé sur des périodes quotidiennes, horaires ou minutes.

### Revue de presse
La plateforme est capable de fournir les dernières nouvelles sur les crypto-monnaies. Mettez en place un service d'arrière-plan qui consommera les flux RSS et offrira une revue de presse fine et à jour.

## Installation
1. **Installer les dépendances (à exécuter à la racine)**
    `npm install`

2. **Créer une instance PostgreSQL avec Docker**
    `docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=the_count_of_money -p 5432:5432 -d postgres`
   

3. **Configurer les variables d'environnement dans `/apps/api/.env` (utilisez le `.env.example` comme exemple)**
   
4. **Appliquer les migrations et la seed, générant les types TypeScript (dans `/apps/api`)**
    `npx prisma migrate `
   ` npx prisma db seed`

5. **Lancer l'application (à la racine)**
     1.Back-end (Express.js):`npx nx run api:serve`
     1.  Front-end (React):`npx nx run ui:serve`



**Note :** Assurez-vous que les commandes ci-dessus sont exécutées dans les répertoires appropriés.

Une fois ces étapes terminées,l'application Count of Money devrait être prête à être utilisée avec le front-end React et le back-end Express.js.

## Utilisation
1. S'inscrire et se connecter pour gérer les sessions utilisateur.
2. Explorer les informations et l'historique des prix des crypto-monnaies.
3. Accéder et personnaliser les revues de presse en fonction de vos préférences.

## Contribution

## Licence

## Contact