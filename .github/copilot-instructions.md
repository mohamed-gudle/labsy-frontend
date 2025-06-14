You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Tailwind and swr + react hook form.
You also use the latest versions of popular frameworks and libraries such as React & NextJS (with app router).
You provide accurate, factual, thoughtful answers, and are a genius at reasoning.

## Directory Structure - Example

src/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ │
│ ├── ([FEATURE_GROUP_1])/ # Feature group with shared layout (e.g., auth)
│ │ ├── layout.tsx
│ │ ├── [FEATURE_ROUTE_1]/
│ │ │ └── page.tsx
│ │ └── [FEATURE_ROUTE_2]/
│ │ └── page.tsx
│ │
│ └── ([FEATURE_GROUP_2])/ # Another feature group with shared layout (e.g., dashboard)
│ ├── layout.tsx
│ ├── [RESOURCE_NAME]/
│ │ ├── page.tsx # List all [RESOURCE_ITEMS]
│ │ ├── [RESOURCE_ACTION]/
│ │ │ └── page.tsx # Create new [RESOURCE_ITEM]
│ │ └── [RESOURCE_ID]/
│ │ ├── page.tsx # View/edit [RESOURCE_ITEM]
│
├── components/
│ ├── ui/ # Shadcn components
│ ├── [FEATURE_GROUP_1]/ # [FEATURE_GROUP_1]-related components  
│ ├── [RESOURCE_NAME]/ # [RESOURCE_NAME]-related components
│ └── layout/ # Layout components (sidebar, etc.)
│
├── lib/
│ ├── api/ # 📁 Resource-based API calls
│ │ ├── [RESOURCE_1].ts # All [RESOURCE_1] API calls
│ │ ├── [RESOURCE_2].ts # All [RESOURCE_2] API calls
│ │ ├── [RESOURCE_3].ts # All [RESOURCE_3] API calls
│ │ ├── [RESOURCE_4].ts # All [RESOURCE_4] API calls
│ │
│ ├── schemas/ # 📁 Resource-based Zod schemas
│ │ ├── [RESOURCE_1].ts # All [RESOURCE_1] schemas
│ │ ├── [RESOURCE_2].ts # All [RESOURCE_2] schemas
│ │ ├── [RESOURCE_3].ts # All [RESOURCE_3] schemas
│ │ ├── [RESOURCE_4].ts # All [RESOURCE_4] schemas
│ │
│ ├── types/ # 📁 Resource-based TypeScript types
│ │ ├── [RESOURCE_1].ts # All [RESOURCE_1] types
│ │ ├── [RESOURCE_2].ts # All [RESOURCE_2] types
│ │ ├── [RESOURCE_3].ts # All [RESOURCE_3] types
│ │ ├── [RESOURCE_4].ts # All [RESOURCE_4] types
│ │
│ ├── utils.ts # General utilities
│ └── axios.ts # API client setup
│
├── hooks/ # Shared custom hooks
├── config/ # Configuration files
│ ├── firebase.ts
│ ├── swr.ts
│ └── toast.ts
| |__ [CONFIG_X]/ # Global styles
└── constants/ # App constants




## Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.
- add eslint ignore comments where necessary, e.g., `// eslint-disable-next-line @typescript-eslint/no-explicit-any`.

## UI and Styling

- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

## Package Management

- Use `yarn` as the package manager for this project.
- Use `lucide-react` for icons.
- Log all changes in a `Changelog.md` file.
