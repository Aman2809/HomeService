/**
 * Structured, customer-facing content for the Privacy Policy and Terms
 * pages. Kept as data so the page components stay simple renderers,
 * and so this content can be revised independently of layout.
 *
 * Written in plain customer language — no internal implementation
 * details (frameworks, backend status, phase names, status constants).
 */

export const privacySections = [
  {
    id: 'information-we-collect',
    heading: 'Information You Provide',
    body: [
      'When you prepare a service request, you may be asked to provide your name, phone number, service address, and preferred date and time. You may optionally provide an email address and a description of the issue or work you need done.',
      'We only ask for the information needed to understand and respond to your service request.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: 'How We Use Your Information',
    body: [
      'The information you provide is used to understand your service request, contact you to confirm details and availability, and carry out the requested service.',
    ],
  },
  {
    id: 'local-browser-storage',
    heading: 'Your Selected Services and Browser Storage',
    body: [
      'To make it easier to build a service request, the services you select while browsing the website may be remembered in your own browser so they are still there if you refresh the page or navigate elsewhere on the site.',
      'Personal details such as your name, phone number, email, address, and notes are not kept in this browser storage. They are only used while you are actively completing a service request.',
    ],
  },
  {
    id: 'sharing-with-technicians',
    heading: 'Sharing With Trusted Technicians',
    body: [
      'Some services, such as AC servicing, repair, and installation, are fulfilled through a trusted network of technicians we work with rather than performed directly by us.',
      'For these services, relevant details of your request (such as your contact information, address, and a description of the work needed) may be shared with the technician handling your request, only as necessary to carry it out.',
    ],
  },
  {
    id: 'how-we-protect-it',
    heading: 'Protecting Your Information',
    body: [
      'We take reasonable care with the information you share with us and only use or share it for the purpose of handling your service request.',
    ],
  },
  {
    id: 'contact-us',
    heading: 'Questions About This Policy',
    body: [
      'If you have questions about how your information is handled, you can contact us using the details on our Contact page.',
    ],
  },
]

export const termsSections = [
  {
    id: 'service-requests',
    heading: 'Service Requests',
    body: [
      'Submitting a service request through this website is a request for service, not a confirmed appointment. After you submit a request, our team will contact you to confirm the service details and availability before the appointment is treated as confirmed.',
    ],
  },
  {
    id: 'service-areas',
    heading: 'Service Areas',
    body: [
      'We currently accept service requests only for the areas listed on our Service Areas page. Availability outside these areas is not guaranteed.',
    ],
  },
  {
    id: 'scheduling',
    heading: 'Scheduling',
    body: [
      'The date and time you select when submitting a request are your preferred schedule. Actual scheduling is subject to confirmation and availability, and may be adjusted after we contact you.',
    ],
  },
  {
    id: 'pricing',
    heading: 'Pricing',
    body: [
      'Where a starting price is shown for a service, it is provided as a general guide. For most services, final pricing depends on the work required, materials needed, and other details specific to your request, and is confirmed after an inspection or discussion with our team.',
    ],
  },
  {
    id: 'trusted-technician-network',
    heading: 'Trusted Technician Network',
    body: [
      'Certain services, such as AC servicing, repair, and installation, may be carried out by trusted independent technicians we work with rather than performed directly by us. Where this applies, it is indicated on the relevant service.',
    ],
  },
  {
    id: 'customer-responsibilities',
    heading: 'Customer Responsibilities',
    body: [
      'To help us respond to your request accurately, please provide correct contact details, address, and a clear description of the service needed.',
    ],
  },
  {
    id: 'changes-to-requests',
    heading: 'Changes to Your Request',
    body: [
      'If your requirements change after submitting a request, please contact us by phone or WhatsApp so we can update the details before the appointment is confirmed.',
    ],
  },
  {
    id: 'website-use',
    heading: 'Website Use',
    body: [
      'This website is provided to help customers learn about our services and submit service requests. Please use it for genuine service enquiries.',
    ],
  },
  {
    id: 'contact',
    heading: 'Contact',
    body: [
      'If you have questions about these terms, you can reach us using the details on our Contact page.',
    ],
  },
]