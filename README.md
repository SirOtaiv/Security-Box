This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Configuration  

This project requires environment variables to be set up for local development. These variables are defined in the `dev-env.yml` file and should be transferred to a `.env.development` file to ensure proper execution.  

## Getting Started  

To run the project locally, you need to create a `.env.development` file in the root directory and populate it with the necessary variables.  

### Step 1: Create the `.env.development` file  

In the root of your project, create a new file named `.env.development`.  

### Step 2: Copy Variables from `dev-env.yml`  

Open the `dev-env.yml` file and manually copy each key-value pair into `.env.development`, ensuring the correct format:  

```env  
# Example format for .env.development  
NEXT_PUBLIC_API_URL=http://localhost:3000/api  
DATABASE_URL=postgres://user:password@localhost:5432/database  
AUTH_SECRET=your-secret-key  
```

Each variable from dev-env.yml should be converted into the .env format, where keys are in uppercase and values are assigned using = without spaces.

### Step 3: Run the Development Server

After setting up the `.env.development` file, start your local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!