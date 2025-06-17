# Tasks: User Type-Specific Onboarding Flows

## Relevant Files

- `src/components/onboarding/intent-survey.tsx` - Component for capturing user intent (Creator vs One-off Purchaser)
- `src/components/onboarding/intent-survey.test.tsx` - Unit tests for intent survey component
- `src/components/onboarding/onboarding-wizard.tsx` - Multi-step wizard container component
- `src/components/onboarding/onboarding-wizard.test.tsx` - Unit tests for wizard container
- `src/components/onboarding/creator-onboarding-form.tsx` - Creator-specific onboarding form
- `src/components/onboarding/creator-onboarding-form.test.tsx` - Unit tests for creator form
- `src/components/onboarding/factory-onboarding-form.tsx` - Factory-specific onboarding form  
- `src/components/onboarding/factory-onboarding-form.test.tsx` - Unit tests for factory form
- `src/components/onboarding/progress-indicator.tsx` - Progress indicator for multi-step flows
- `src/components/onboarding/progress-indicator.test.tsx` - Unit tests for progress indicator
- `src/components/onboarding/index.ts` - Barrel exports for onboarding components ✅
- `src/app/(auth)/onboarding/page.tsx` - Main onboarding entry point with intent survey ✅
- `src/app/(auth)/onboarding/creator/page.tsx` - Creator onboarding flow page ✅
- `src/app/(auth)/onboarding/factory/page.tsx` - Factory onboarding flow page ✅
- `src/app/(auth)/onboarding/survey/page.tsx` - Intent survey standalone page ✅
- `src/app/(auth)/layout.tsx` - Enhanced auth layout for onboarding flows ✅
- `src/lib/api/onboarding.ts` - API functions for onboarding flows
- `src/lib/api/onboarding.test.ts` - Unit tests for onboarding API functions
- `src/lib/schemas/onboarding.ts` - Zod schemas for onboarding form validation
- `src/lib/schemas/onboarding.test.ts` - Unit tests for onboarding schemas
- `src/lib/types/onboarding.ts` - TypeScript interfaces for onboarding data
- `src/hooks/use-onboarding.ts` - Custom hook for onboarding state management
- `src/hooks/use-onboarding.test.ts` - Unit tests for onboarding hook

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set up onboarding infrastructure and routing
  - [x] 1.1 Create onboarding directory structure under `src/components/onboarding/`
  - [x] 1.2 Set up onboarding routes under `src/app/(auth)/onboarding/`
  - [x] 1.3 Create main onboarding entry page at `/onboarding`
  - [x] 1.4 Create creator onboarding page at `/onboarding/creator`
  - [x] 1.5 Create factory onboarding page at `/onboarding/factory`
  - [x] 1.6 Create intent survey page at `/onboarding/survey`
  - [x] 1.7 Create barrel export file for onboarding components
  - [x] 1.8 Update auth layout to handle onboarding flows
- [x] 2.0 Implement intent detection system
  - [x] 2.1 Create TypeScript interfaces for intent survey data
  - [x] 2.2 Create Zod schemas for intent validation
  - [x] 2.3 Build intent survey component with "What brings you here?" question
  - [x] 2.4 Implement Creator vs One-off Purchaser option selection
  - [x] 2.5 Add routing logic based on intent selection
  - [x] 2.6 Style survey component with appropriate visual themes
  - [x] 2.7 Add form validation and error handling
  - [x] 2.8 Write unit tests for intent survey component
- [x] 3.0 Build multi-step wizard framework
  - [x] 3.1 Create onboarding wizard container component
  - [x] 3.2 Implement progress indicator component with step tracking
  - [x] 3.3 Add backward/forward navigation functionality
  - [x] 3.4 Implement step validation and data persistence
  - [x] 3.5 Create wizard context for state management
  - [x] 3.6 Add responsive design for mobile devices
  - [x] 3.7 Implement wizard completion and routing logic
  - [x] 3.8 Write unit tests for wizard framework components
- [ ] 4.0 Create user type-specific onboarding forms
  - [ ] 4.1 Build creator onboarding form with required fields (name, email, phone, business info)
  - [ ] 4.2 Build factory onboarding form with company information fields
  - [ ] 4.3 Implement one-off purchaser flow (similar to creator but no store intent)
  - [ ] 4.4 Add user type-specific visual themes and styling
  - [ ] 4.5 Create form validation schemas for each user type
  - [ ] 4.6 Implement conditional field rendering based on user type
  - [ ] 4.7 Add form submission handlers for each onboarding type
  - [ ] 4.8 Write unit tests for all user type-specific forms
- [ ] 5.0 Implement API integration and data persistence
  - [ ] 5.1 Create API functions for onboarding data submission
  - [ ] 5.2 Implement user entity creation based on onboarding type
  - [ ] 5.3 Add Creator, Factory, and Customer entity integration
  - [ ] 5.4 Implement role-based routing after onboarding completion
  - [ ] 5.5 Add error handling and retry logic for API calls
  - [ ] 5.6 Implement factory invite email validation
  - [ ] 5.7 Add onboarding progress persistence to prevent data loss
  - [ ] 5.8 Create custom hook for onboarding state management
  - [ ] 5.9 Write unit tests for API functions and hooks
