## Summary

Digital travel marketplace — book tours from local Australian operators.

## Usage

```bash
docker compose --env-file .env.local up --build
```

## Deploy to AWS

App Runner + ECR + GitHub OIDC (no long-lived AWS keys). Infrastructure is managed with **Terraform** in [`infra/terraform`](infra/terraform/README.md); deploy guide in [`docs/aws-deploy.md`](docs/aws-deploy.md).

**Production:** https://k26pdkus59.ap-southeast-2.awsapprunner.com — app code deploys on push to `main`; infra changes via `terraform apply`.

## Sanity CMS (marketing content)

Homepage copy is editable in Sanity at `/studio`. Tours and bookings stay in Supabase.

### 1. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign in (free).
2. **Create project** → name it e.g. `Australia Trip Planner`.
3. Copy the **Project ID** from Project settings → API.

### 2. Configure env vars

Add to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-13
```

### 3. Allow the Studio in the browser

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**:

| Origin | Allow credentials |
|--------|-------------------|
| `http://localhost:3000` | Yes |
| Your production URL | Yes |

### 4. Run the app and open Studio

```bash
npm run dev
```

- Local site: [http://localhost:3000](http://localhost:3000)
- Embedded Studio: [http://localhost:3000/studio](http://localhost:3000/studio)
- Hosted Studio (no dev server needed): [https://australia-trip-planner.sanity.studio](https://australia-trip-planner.sanity.studio)

To redeploy the hosted Studio after schema changes:

```bash
npm run sanity:deploy
```

Use `npm run sanity:deploy` (not plain `sanity deploy`) — the hosted Studio runs at `/` while the embedded Studio in this app uses `/studio`.

### 5. (Optional) Seed default homepage content

After logging into the Sanity CLI once:

```bash
npx sanity login
npm run sanity:seed
```

Until Sanity is configured, the site uses built-in default copy. After you publish in Studio, changes appear on the homepage within ~60 seconds (ISR).
