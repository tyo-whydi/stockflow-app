This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## Multi-company setup

StockFlow stores each company's catalog, stock, transactions, and members in a separate tenant. Existing WMS data is assigned to the initial **Perusahaan Utama** workspace by the migration. An administrator can rename it, create additional companies, and add existing StockFlow accounts with company-specific roles. Staff can record their own transactions, managers can view company reports and records, and admins manage company data and members; these permissions are enforced by row-level security.

Before deploying the multi-company application:

1. Back up the Supabase database and test `supabase/migrations/20261127030000_multi_company_tenancy.sql` on a staging project with a copy of the current schema and data. It requires at least one valid `profiles` row with the `admin` role; the migration stops before making changes if none exists or if a profile has no matching auth user.
2. Schedule a short maintenance window: apply the migration and deploy the matching application build together. The old application cannot create transactions after the migration, and the new application requires the migrated schema.
3. Verify sign-in, company switching, member roles, stock-in/out, and reports before reopening writes.

The migration enables row-level security and backfills existing data. Foreign keys restrict deleting companies, categories, products, or locations while dependent WMS records or audit history exist, preserving stock and transaction history. Do not deploy the application before the migration succeeds. Adding a member currently requires that the person already has a StockFlow account; email invitations and billing/tenant limits are not included.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
