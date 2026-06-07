# AO World Cup 26

Application de suivi de la Coupe du Monde 2026 avec résumés IA en temps réel.

## Déploiement Vercel (5 minutes)

### 1. Mettre le projet sur GitHub
- Crée un compte sur https://github.com si tu n'en as pas
- Clique sur "New repository" → nomme-le `ao-worldcup26`
- Upload tous les fichiers de ce dossier

### 2. Déployer sur Vercel
- Va sur https://vercel.com → "Sign up" avec ton compte GitHub
- Clique "Add New Project" → sélectionne le repo `ao-worldcup26`
- Clique "Deploy" (sans rien changer)

### 3. Ajouter la clé API Anthropic
- Dans ton projet Vercel → "Settings" → "Environment Variables"
- Ajoute : `ANTHROPIC_API_KEY` = ta clé (disponible sur console.anthropic.com)
- Clique "Redeploy"

C'est tout ! Ton app est en ligne sur `ao-worldcup26.vercel.app`
