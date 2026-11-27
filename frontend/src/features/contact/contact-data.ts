// Contact page options and limits (limits match the backend's /api/send-mail validation).

export type ContactField = 'firstName' | 'lastName' | 'workEmail' | 'company' | 'scope';

export interface FieldSpec {
  id: ContactField;
  label: string;
  placeholder: string;
  maxLength: number;
  type?: 'text' | 'email';
  autoComplete?: string;
}

export const FIELD_SPECS: Record<ContactField, FieldSpec> = {
  firstName: { id: 'firstName', label: 'First name', placeholder: 'John', maxLength: 30, autoComplete: 'given-name' },
  lastName: { id: 'lastName', label: 'Last name', placeholder: 'Doe', maxLength: 30, autoComplete: 'family-name' },
  workEmail: {
    id: 'workEmail',
    label: 'Work email',
    placeholder: 'john@company.com',
    maxLength: 120,
    type: 'email',
    autoComplete: 'email',
  },
  company: { id: 'company', label: 'Company', placeholder: 'Acme Corp', maxLength: 40, autoComplete: 'organization' },
  scope: {
    id: 'scope',
    label: 'Test cases and acceptance criteria',
    placeholder: 'What should the automation demonstrate?',
    maxLength: 200,
  },
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shown in the Location block (as on the previous contact page). */
export const OFFICE_ADDRESS_LINES = [
  'Manjeera Trinity Corporate',
  'Ground floor unit no 03,',
  'eSeva Ln, KPHB Phase 3, Kukatpally',
  'Hyderabad, Telangana 500072',
];
