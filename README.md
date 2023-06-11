This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
The backend repo is located at ['GitHub'] (https://github.com/larsomic/friend-finder-backend)

## Getting Started
1. Start the backend server. See the readme in ['Backend Repo'] (https://github.com/larsomic/friend-finder-backend)
2. Create a .env file in your frontend directory at the same level as this README.md
3. Add a variable in the .env file with variable NEXT_PUBLIC_BASE_API_URL and value http://localhost:5000, or whatever port your backend is running on.
4. Start the frontend server 
    To run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Before pushing
1. Create a new branch
2. Make your changes
3. Run 
    ```bash
    npm run build
    ```
4. If it passes commit and push your code.
5. Create a new Merge Request in github.