# Firebase Environment Configuration for Angular

This project uses a Firebase configuration stored in an environment file to initialize Firebase services such as authentication and Firestore.

## 🔧 How to Use

1. Duplicate the `environment.example.ts` file.
2. Rename the copy to:

```
src/environments/environment.ts
```

> If you're building for production, also create:
>
```
src/environments/environment.prod.ts
```

3. Replace the placeholder values with your actual Firebase project configuration.

---

## 🔐 Security Notice

- **DO NOT** commit your real `environment.ts` or `environment.prod.ts` files to the repository.
- Ensure both files are listed in your `.gitignore` file.
- If you've accidentally committed them in the past, rewrite the Git history using tools like:

```bash
git filter-repo
```

or

```bash
BFG Repo-Cleaner
```

---

## ✅ Example Entry for `.gitignore`

```gitignore
# Firebase environment files
src/environments/environment.ts
src/environments/environment.prod.ts
```

---

## 📝 Template File: `environment.example.ts`

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'YOUR_FIREBASE_API_KEY_HERE',
    authDomain: 'your-app.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project-id.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  }
};
```
