# Product Requirements Document: User Type-Specific Onboarding Flows

## Introduction/Overview

This feature implements differentiated onboarding experiences for four distinct user types in the Labsy platform: Creators, One-off Purchasers, Customers, and Factories. Each user type will have a tailored multi-step wizard that captures relevant information and guides them to the appropriate platform sections based on their role and intent.

The goal is to streamline user activation by providing relevant onboarding flows that reduce friction and improve user engagement while capturing essential data for each user type.

## Goals

1. **Improve User Activation**: Reduce onboarding friction by providing role-specific guidance
2. **Capture Intent**: Distinguish between creators who want to sell vs. one-off purchasers 
3. **Collect Essential Data**: Gather required information for each user type upfront
4. **Route Users Appropriately**: Direct users to relevant platform sections post-onboarding
5. **Maintain Flexibility**: Allow customers to remain anonymous while providing signup options
6. **Support Factory Invites**: Handle admin-initiated factory partner onboarding

## User Stories

### Creators & One-off Purchasers
- As a **creator**, I want to specify my intent (selling vs. personal use) so that the platform can provide me with the right tools and experience
- As a **creator with selling intent**, I want to complete basic profile setup so that I can start designing products for my future store
- As a **one-off purchaser**, I want to quickly set up an account so that I can create custom products for personal/business use

### Factories
- As a **factory partner**, I want to complete my company profile after accepting an admin invite so that I can start receiving and managing orders
- As a **factory**, I want to provide all required business information so that I can be properly onboarded as a manufacturing partner

### Customers
- As a **customer**, I want to browse and purchase without being forced to sign up so that I can have a frictionless shopping experience
- As a **customer**, I want the option to create an account if I choose to so that I can track orders and save preferences

## Functional Requirements

### 1. Intent Detection System
1.1. Display intent survey for users clicking "Create Now"
1.2. Survey must include question "What brings you here?" with options:
   - "I want to create and sell custom products" (Creator)
   - "I need custom products for personal/business use" (One-off Purchaser)
1.3. Route users to appropriate onboarding flow based on intent selection

### 2. Creator Onboarding Flow
2.1. Must capture essential creator information (generic profile data)
2.2. Should NOT include store creation (deferred to later)
2.3. Required fields: name, email, phone (optional), basic business info
2.4. Upon completion, redirect to `/base-products`
2.5. Visual theme should reflect creative/design focus

### 3. One-off Purchaser Onboarding Flow  
3.1. Must capture basic user information similar to creators
3.2. Should indicate no store intent in user profile
3.3. Required fields: name, email, phone (optional)
3.4. Upon completion, redirect to `/base-products`
3.5. Visual theme should reflect quick/personal use focus

### 4. Factory Onboarding Flow
4.1. Must be triggered by admin-generated invite email
4.2. Must capture comprehensive company information per Factory entity
4.3. Required fields: company name, contact person, business license, tax ID, location
4.4. Optional fields: company description, phone
4.5. Upon completion, redirect to `/orders`
4.6. Visual theme should reflect professional/business partnership

### 5. Customer Experience
5.1. Must allow anonymous browsing and purchasing
5.2. Must collect email and phone for order communication
5.3. Must provide optional account creation
5.4. Default route to `/marketplace`
5.5. Visual theme should reflect consumer/shopping focus

### 6. Multi-step Wizard Implementation
6.1. Each onboarding flow must be implemented as a multi-step wizard
6.2. Must include progress indicators
6.3. Must allow backward navigation
6.4. Must validate data at each step
6.5. Must save progress to prevent data loss

### 7. User Type Management
7.1. User types must be immutable after onboarding completion
7.2. Must integrate with existing UserRole enum system
7.3. Must create appropriate entity records (Creator, Factory, Customer)

## Non-Goals (Out of Scope)

- Store creation for creators (handled separately)
- User type switching after onboarding
- Pricing tier implementation
- Approval/verification workflows
- Accessibility features (Phase 1)
- Advanced analytics tracking
- Email verification during onboarding
- Social media authentication integration

## Design Considerations

### Visual Themes by User Type
- **Creators**: Creative, inspiring, tool-focused design elements
- **One-off Purchasers**: Clean, efficient, quick-action focused
- **Factories**: Professional, business-oriented, partnership-focused  
- **Customers**: Consumer-friendly, marketplace-style, shopping-focused

### Components to Implement
- Multi-step wizard container component
- Intent survey component
- User type-specific form components
- Progress indicator component
- Theme wrapper for user type styling

### Existing Components to Leverage
- Form components from `components/ui/`
- Authentication components from `components/auth/`
- Layout components from `components/layout/`

## Technical Considerations

### Integration Points
- Must integrate with existing Firebase authentication
- Must work with TypeORM entities (User, Creator, Factory, Customer)
- Must respect existing role-based routing guards
- Must integrate with `/auth` layout and flows

### Data Flow
1. User selects intent → Survey component captures choice
2. Wizard flow → Collects user type-specific data
3. API calls → Creates appropriate entity records
4. Authentication → Sets user session with correct role
5. Routing → Redirects to appropriate default route

### File Structure
```
src/
├── components/
│   └── onboarding/
│       ├── intent-survey.tsx
│       ├── onboarding-wizard.tsx
│       ├── creator-onboarding-form.tsx
│       ├── factory-onboarding-form.tsx
│       └── progress-indicator.tsx
├── lib/
│   ├── api/
│   │   └── onboarding.ts
│   ├── schemas/
│   │   └── onboarding.ts
│   └── types/
│       └── onboarding.ts
└── app/
    └── (auth)/
        ├── onboarding/
        │   ├── page.tsx
        │   ├── creator/
        │   ├── factory/
        │   └── survey/
        └── layout.tsx
```

### Dependencies
- React Hook Form for form management
- Zod for schema validation
- SWR for API calls
- Lucide React for icons
- Tailwind CSS for styling

## Success Metrics

1. **Onboarding Completion Rate**: >85% for each user type
2. **Error Rate**: <5% during onboarding flows
3. **Time to Complete**: <3 minutes average for creators/one-off, <5 minutes for factories
4. **User Routing Success**: 100% of users reach correct default route
5. **Intent Classification Accuracy**: >95% correct creator vs. one-off classification

## Open Questions

1. Should we implement onboarding flow analytics tracking in Phase 1? no not yet
2. What happens if a factory invite email expires? then tell them it has expired
3. Should we add email verification step for creators? yes
4. Do we need to handle bulk factory invitations? nooo
5. Should one-off purchasers have the option to upgrade to creator status later? yeah 
6. What's the fallback behavior if user type detection fails? I am not sure
7. Should we implement onboarding flow abandonment recovery? noo

## Implementation Notes

- Leverage existing authentication context and guards
- Maintain consistency with current UI patterns and components
- Ensure mobile responsiveness for all onboarding flows
- Implement proper error handling and validation feedback
- Consider implementing onboarding flow state management for complex wizards
