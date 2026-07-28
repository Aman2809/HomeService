# Build a Complete Local Home & Electrical Services Website

I want you to build a complete production-quality responsive web application from scratch for a local electrical and home repair service business operating initially in **South Kolkata, India**.

I have attached a **UI reference image/mockup**. Study the attached image carefully before writing code.

## 1. IMPORTANT: UI REFERENCE

Use the attached UI image as the primary visual reference for the website.

Reproduce its overall:

* visual hierarchy
* premium local-service-business feel
* navbar structure
* hero composition
* service cards
* category sections
* spacing
* typography hierarchy
* rounded cards
* buttons
* yellow + dark navy + white visual language
* trust/experience sections
* testimonial presentation
* CTA sections
* footer
* responsive mobile experience

Do NOT blindly copy text, branding, icons, or placeholder content from the image.

Build a real working website based on the functional requirements below while maintaining the visual direction of the reference.

The result should feel like a polished modern home-service platform inspired by the convenience of platforms such as Urban Company, but this is a small independent local business and should have its own identity.

---

# 2. BUSINESS CONTEXT

This website is for an experienced electrical technician with approximately **10+ years of professional experience** in electrical work, maintenance, troubleshooting, installation, residential/commercial maintenance, and team-level maintenance responsibilities.

The website should NOT feel like his personal resume.

His experience should instead be used as a trust factor:

**10+ Years of Electrical & Maintenance Experience**

The business will initially operate only in selected areas of **South Kolkata**, such as:

* Alipore
* Tollygunge

The architecture must make it easy to add more service areas later.

The primary service category is electrical work.

However, the owner also has a network of trusted technicians for services such as AC repair/service and potentially other maintenance work.

Therefore, design the system so new categories and services can easily be added later.

---

# 3. TECH STACK

Build the project using:

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

Use modern React with:

* functional components
* hooks
* reusable components
* clean folder structure
* proper state management patterns

Avoid unnecessary dependencies.

### Backend-as-a-Service

Use **Supabase**.

Supabase will provide:

* PostgreSQL database
* Authentication
* Row Level Security
* Storage if needed later

There is NO Spring Boot backend in V1.

React communicates with Supabase using:

`@supabase/supabase-js`

### Hosting

The React application will eventually be deployed to Netlify.

Make sure the project works correctly as a Vite SPA deployed to Netlify, including React Router route handling.

---

# 4. IMPORTANT ARCHITECTURE

The architecture should be:

Customer Browser
↓
React + Vite
↓
Supabase JavaScript SDK
↓
Supabase API
↓
PostgreSQL

There should be three logical user experiences:

1. Guest visitor
2. Registered customer
3. Admin

---

# 5. GUEST BOOKING MUST BE SUPPORTED

This is extremely important.

A customer MUST NOT be required to create an account to book a service.

Someone should be able to:

Browse services
→ Select service
→ Configure service
→ Enter contact/location details
→ Select preferred date/time
→ Place service request

without logging in.

Do NOT put authentication in front of the booking flow.

Guest booking should be the fastest and primary conversion path.

---

# 6. OPTIONAL CUSTOMER ACCOUNT

Customers should ALSO have the option to register/login.

Use Supabase Auth.

A registered customer should eventually be able to:

* login
* logout
* view profile
* view their service requests
* view request status
* view previous bookings
* rebook services
* have contact information prefilled when booking

Customer authentication is a convenience, NOT a requirement for booking.

If a logged-in customer creates a request, associate the request with their Supabase user ID.

If a guest creates a request, `user_id` should remain NULL.

---

# 7. ADMIN SYSTEM

There must be a separate protected admin experience.

Example routes:

`/admin/login`

`/admin`

`/admin/requests`

`/admin/requests/:id`

The admin is the business owner.

Do NOT assume that every authenticated user is an admin.

Implement proper role-based authorization.

The admin dashboard should allow the owner to:

* view all service requests
* see new requests
* see pending requests
* see confirmed requests
* see in-progress requests
* see completed requests
* see cancelled requests
* open request details
* view customer name
* phone number
* service address
* selected services
* selected service options
* quantity
* preferred date/time
* customer description
* booking creation date/time
* update request status
* call customer
* open WhatsApp conversation with customer
* manage services if practical
* enable/disable services if practical

Dashboard summary cards should include things such as:

New Requests
Pending
In Progress
Completed

Keep the admin UI clean and functional.

---

# 8. SECURITY

This is critical because React talks directly to Supabase.

Configure and document Supabase Row Level Security policies.

Never expose:

* database password
* service-role key
* secret server credentials

The frontend may only use the appropriate Supabase publishable/anon client key.

Implement RLS so that:

### Public/Guest

Can create a service request.

Cannot list all service requests.

Cannot read other customers' information.

Cannot update arbitrary requests.

Cannot delete requests.

### Authenticated Customer

Can access only data belonging to their own account where appropriate.

Cannot access other customers' bookings.

### Admin

Can access and manage service requests according to admin authorization.

Do not implement security only by hiding admin UI components.

Actual database access must be protected by RLS/authorization.

---

# 9. WEBSITE PAGES

Build a complete website.

At minimum include:

## `/`

Homepage

## `/services`

All services

## `/services/:slug`

Individual service page

## `/book`

Booking flow

## `/about`

About the business

## `/areas`

Areas served

## `/contact`

Contact page

## `/login`

Customer login

## `/signup`

Customer signup

## `/account`

Customer account/dashboard

## `/account/bookings`

Customer booking history

## `/admin/login`

Admin login

## `/admin`

Admin dashboard

## `/admin/requests`

All service requests

## `/admin/requests/:id`

Request details

Also provide:

* 404 page
* privacy page
* basic terms/service disclaimer page

---

# 10. NAVBAR

Desktop navbar should feel similar to the attached reference.

Possible structure:

Logo / Brand

Home
Services
Areas We Serve
About
Contact

Login

Book a Service

`Book a Service` should be visually prominent.

For logged-in customers, replace Login appropriately with account/profile access.

Mobile navigation must be fully responsive.

---

# 11. HOMEPAGE

Use the attached image as the main design reference.

The homepage should include the following sections.

## Hero

Strong headline such as:

**Professional Electrical & Home Services in South Kolkata**

Supporting message emphasizing:

* reliable service
* residential work
* commercial work
* 10+ years experience
* selected South Kolkata locations

Primary CTA:

**Book a Service**

Secondary CTA:

**Call Now**

Potential additional CTA:

**WhatsApp Us**

Include a service/location search-style UI if it fits the reference.

---

# 12. TRUST INDICATORS

Display trust metrics such as:

10+ Years Experience

Residential & Commercial

South Kolkata Service

Trusted Technician Network

Do not invent fake statistics such as "10,000 customers served".

Use only reasonable business information.

---

# 13. SERVICES SECTION

Show categories visually.

Primary category:

### Electrical

Potential services include:

* Switch Repair
* Switch Replacement
* Socket Repair
* Socket Replacement
* Switch Board Repair
* Switch Board Replacement
* Fan Repair
* Fan Installation
* Light Installation
* MCB Repair
* MCB Replacement
* Electrical Wiring
* Short Circuit Troubleshooting
* Electrical Inspection
* General Electrical Repair

Secondary category:

### AC Services

Potential services:

* AC Servicing
* AC Repair
* AC Installation

These may be performed by trusted partner technicians.

Design the data model so categories/services are database-driven rather than permanently hardcoded into components.

---

# 14. SERVICE CARDS

Cards should follow the premium style of the reference image.

Each card can contain:

* icon/image
* service name
* short description
* pricing indicator if available
* Book button

Do NOT invent fixed prices if pricing has not been established.

Use language such as:

**Price after inspection**

or

**Starting from ₹___**

only when actual values can be configured.

Pricing must be data-driven.

---

# 15. SERVICE CONFIGURATION MODAL

This is one of the most important interactions.

When a customer clicks a service, allow that service to define configurable options.

Example:

Customer chooses:

**Switch Board Repair**

Show a modal/bottom sheet.

Example:

Switch Board Repair

Select board size:

* 1–2 switches
* 3–4 switches
* 5–6 switches
* 7–8 switches
* More than 8

Quantity:

[-] 1 [+]

CTA:

**Add Service**

The modal must be reusable.

Different services can have different options.

Example:

Fan Repair:

* Ceiling Fan
* Wall Fan
* Exhaust Fan
* Pedestal Fan

Quantity selector.

Do NOT hardcode switch-specific UI into the generic modal.

Build a service-option system that reads available options from data.

On mobile, prefer a polished bottom sheet or mobile-friendly modal.

---

# 16. MULTIPLE SERVICES / CART

Customers should be able to request multiple services in one booking.

Example:

Switch Board Repair
3–4 switches
Quantity: 2

Fan Repair
Ceiling Fan
Quantity: 1

Provide a booking/cart summary.

Allow:

* add service
* remove service
* change quantity
* edit selected option

This does NOT need to behave like an e-commerce payment cart.

It is a service-request basket.

---

# 17. BOOKING FLOW

Create a polished multi-step booking experience.

Suggested flow:

### Step 1 — Services

Select/configure services.

### Step 2 — Location

Ask for:

* area
* address
* landmark optional

Area should use supported service areas.

If user chooses an unsupported area, show a helpful message rather than silently accepting it.

No Google Maps integration is required for V1.

### Step 3 — Customer Details

Ask for:

* name
* phone number
* email optional
* problem description optional

For logged-in users, prefill known profile information.

### Step 4 — Schedule

Ask for:

* preferred date
* preferred time

Time options can initially be broad:

Morning
Afternoon
Evening

Make these configurable.

### Step 5 — Review

Display complete request:

Services
Options
Quantities
Location
Customer
Schedule
Notes

Then:

**Place Service Request**

---

# 18. SUCCESS SCREEN

After successful submission show a professional confirmation page/state.

Example:

**Service Request Received**

Include a booking/request reference number.

Tell the customer the team will contact them to confirm the request.

Provide:

Call

WhatsApp

Back to Home

If logged in:

View My Bookings

Do not claim that the booking is confirmed unless the admin has confirmed it.

Initial status should be something like:

`PENDING`

---

# 19. WHATSAPP

WhatsApp should be strongly integrated into the customer experience.

Provide WhatsApp buttons where appropriate.

When possible, construct useful prefilled messages.

Example:

Hello, I need help with my service request #1042.

Do not require WhatsApp for the booking itself.

The actual booking must be stored in Supabase.

---

# 20. CALL FUNCTIONALITY

On supported devices, Call buttons should use a normal `tel:` action.

Business phone number should come from centralized configuration rather than being duplicated across components.

---

# 21. CUSTOMER DASHBOARD

Logged-in customers should have a simple account experience.

Show:

My Bookings

Each booking card can show:

Request number

Service summary

Requested date

Status

Possible statuses:

PENDING
CONFIRMED
ASSIGNED
IN_PROGRESS
COMPLETED
CANCELLED

Allow opening booking details.

Do not allow customers to arbitrarily modify protected booking status.

---

# 22. ADMIN DASHBOARD

Follow the same visual design system but optimize for management.

Dashboard should show cards such as:

New Requests

Pending

In Progress

Completed

Then show recent requests.

Provide useful filters:

Status
Date
Area
Service

Search can support:

Customer name
Phone
Request ID

Do not overbuild analytics for V1.

---

# 23. ADMIN REQUEST DETAILS

Example layout:

Request #1042

Status: PENDING

Customer:

Name
Phone

Actions:

Call
WhatsApp

Services:

Switch Board Repair
Option: 3–4 switches
Quantity: 2

Fan Repair
Option: Ceiling Fan
Quantity: 1

Location:

Area
Address
Landmark

Schedule:

Preferred date
Preferred time

Customer Notes

Created At

Admin should be able to update status.

---

# 24. DATABASE DESIGN

Create a proper Supabase/PostgreSQL schema.

At minimum consider:

## `profiles`

Fields such as:

* id UUID referencing auth.users
* full_name
* phone
* role
* created_at
* updated_at

Roles should support at least:

CUSTOMER
ADMIN

Use a secure approach for admin authorization.

## `service_categories`

Example fields:

* id
* name
* slug
* description
* icon/image reference
* active
* sort_order
* created_at

## `services`

Fields such as:

* id
* category_id
* name
* slug
* short_description
* description
* pricing_type
* starting_price nullable
* active
* sort_order
* created_at
* updated_at

## `service_options`

Fields such as:

* id
* service_id
* name
* description optional
* price_adjustment optional
* active
* sort_order

## `service_areas`

Fields:

* id
* name
* slug
* active
* sort_order

Examples initially:

Alipore
Tollygunge

Make adding new areas easy.

## `service_requests`

Fields such as:

* id
* public_reference
* user_id nullable
* customer_name
* phone
* email nullable
* area_id
* address
* landmark nullable
* preferred_date
* preferred_time
* description nullable
* status
* created_at
* updated_at

`user_id` MUST be nullable because guest bookings are supported.

## `service_request_items`

Fields such as:

* id
* request_id
* service_id
* service_option_id nullable
* quantity
* created_at

Consider whether booking-time snapshots of service/option names or pricing are useful so historical bookings remain understandable if catalogue data later changes.

Use appropriate:

* primary keys
* foreign keys
* indexes
* constraints
* timestamps

---

# 25. BOOKING TRANSACTION

A booking may involve:

1 service request
+
multiple request items

Ensure the submission process does not leave broken/partial bookings if item insertion fails.

Use an appropriate Supabase/Postgres approach for atomic creation where necessary, such as a database function/RPC transaction, rather than blindly doing unsafe unrelated inserts from the client.

Keep the implementation appropriate for V1 but data integrity matters.

---

# 26. ROW LEVEL SECURITY

Provide the SQL/policies required.

Think carefully about guest insertion.

A guest must be able to create a booking without gaining permission to retrieve all bookings.

Authenticated customers should only access their own appropriate records.

Admin should have authorized access.

Also secure child records such as `service_request_items`.

Explain the security decisions in the project documentation.

---

# 27. ABOUT SECTION

Use the business owner's professional background for credibility without turning this into a CV.

Example messaging:

**10+ Years of Hands-On Experience**

Experienced in electrical installation, repair, troubleshooting and maintenance across residential and commercial environments.

Mention experience managing maintenance responsibilities/team operations only where useful for credibility.

Do not list previous employers unless explicitly configured later.

---

# 28. TRUSTED TECHNICIAN NETWORK

Some services may be handled by trusted technicians rather than the owner himself.

Present this professionally.

Possible messaging:

**Trusted Service Network**

For selected services, we coordinate with experienced local technicians we know and trust.

Do not make false claims about certifications, background checks, guarantees, or insurance unless such information is explicitly provided.

---

# 29. SERVICE AREAS

Create a dedicated service-area section/page.

Current launch region:

**South Kolkata**

Initial configured areas:

* Alipore
* Tollygunge

Do not hardcode the system to only these two locations.

Service areas should come from Supabase/configuration so new areas can be added.

---

# 30. TESTIMONIALS

Design the testimonial UI based on the reference.

However, do NOT create fake customer testimonials and present them as real.

Until real testimonials exist, either:

* hide the section
* use clearly marked placeholders in development
* make the section data-driven and empty in production

---

# 31. FAQ

Create an FAQ section.

Questions can include:

Do I need an account to book?

No. Customers can request a service as guests.

Which areas do you serve?

Selected South Kolkata areas.

How is pricing determined?

Pricing depends on the service and work required. Final details may be confirmed after understanding/inspecting the issue.

Can I request multiple services?

Yes.

How will my booking be confirmed?

The request is first submitted as pending. The service team will contact the customer to confirm availability/details.

Keep FAQ data reusable.

---

# 32. RESPONSIVE DESIGN

The application must be fully responsive.

Prioritize mobile because many local customers will likely access the site through phones/WhatsApp.

Support:

* mobile
* tablet
* desktop
* large desktop

On mobile:

* responsive navbar
* comfortable tap targets
* bottom sheets where appropriate
* sticky booking CTA where useful
* Call/WhatsApp actions
* simple booking steps
* no horizontal overflow

---

# 33. DESIGN SYSTEM

Follow the attached mockup.

Primary visual direction:

* dark navy
* warm yellow/gold accent
* white
* subtle light gray backgrounds
* modern rounded cards
* subtle shadows
* clean typography
* spacious layout

The website should feel:

Professional
Reliable
Local
Premium but affordable
Modern
Simple

Avoid excessive animations, glassmorphism, neon effects, gradients everywhere, or a generic AI-generated SaaS appearance.

This is a local home-service business.

---

# 34. ICONS

Use a consistent icon library such as Lucide React if needed.

Use appropriate icons for:

Electrical
Fan
Light
Socket
Wiring
AC
Phone
WhatsApp
Location
Calendar
Clock
User

Do not mix several unrelated icon styles.

---

# 35. IMAGES

Use appropriate placeholders or configurable image references for service/business images.

Do not depend on random remote image URLs that may disappear.

Keep image components easy to replace later with actual business photos.

---

# 36. FORMS

Forms must have proper:

* labels
* required indicators
* validation
* phone validation suitable for Indian customers
* error messages
* loading state
* disabled submission while processing
* success state
* server/Supabase error handling

Do not rely only on HTML validation.

---

# 37. ACCESSIBILITY

Use:

* semantic HTML
* accessible form labels
* keyboard-accessible modals
* focus states
* appropriate contrast
* ARIA where actually necessary
* proper buttons instead of clickable divs

---

# 38. SEO

This is a local service business, so structure the frontend with SEO in mind.

Create good page titles/descriptions for routes such as:

Electrical Services in South Kolkata

Electrician in Tollygunge

Electrician in Alipore

Do not keyword spam.

Where appropriate, structure service pages so they can later support local SEO expansion.

Since this is initially a Vite SPA, explain any SEO limitations and what could be improved later with prerendering/SSR if organic search becomes important.

---

# 39. PRIVACY

The application stores personal information such as:

* name
* phone
* email
* address

Provide a basic Privacy page and design the data collection responsibly.

Do not implement hidden visitor identification or attempt to collect personal contact information merely because someone visited/searched the website.

Only store personal data the user intentionally provides through forms/accounts.

---

# 40. STATE MANAGEMENT

For V1, avoid unnecessary Redux complexity unless there is a clear reason.

Use appropriate combinations of:

* React Context
* hooks
* local component state

The service-request basket may use a dedicated context/provider.

Authentication can use an AuthContext.

Keep architecture clean.

---

# 41. SUGGESTED FRONTEND STRUCTURE

Use a maintainable structure similar to:

src/

components/
layout/
services/
booking/
forms/
common/

pages/
Home/
Services/
ServiceDetails/
Booking/
About/
Areas/
Contact/
Auth/
Account/
Admin/

contexts/

hooks/

lib/
supabase.js

services/
or api/

utils/

constants/

routes/

assets/

Do not follow this blindly if you have a cleaner architecture, but keep clear separation of concerns.

---

# 42. ENVIRONMENT VARIABLES

Use Vite environment variables.

Example:

VITE_SUPABASE_URL

VITE_SUPABASE_PUBLISHABLE_KEY

Never commit secrets.

Provide `.env.example`.

---

# 43. DEVELOPMENT DATA

Provide realistic seed data for:

Electrical category

AC category

Services

Service options

Alipore

Tollygunge

But do not invent:

fake bookings
fake customers
fake testimonials
fake ratings

unless clearly marked as development/demo data.

---

# 44. ERROR/EMPTY STATES

Build proper UI for:

No services available

No bookings

Booking failed

Network error

Unsupported service area

Authentication failed

Unauthorized admin access

404

Supabase unavailable

Do not leave blank pages.

---

# 45. LOADING STATES

Provide polished loading states/skeletons where useful for:

Service catalogue

Account bookings

Admin requests

Request details

Authentication

---

# 46. BOOKING STATUS

Use a consistent status model.

For example:

PENDING

CONFIRMED

ASSIGNED

IN_PROGRESS

COMPLETED

CANCELLED

Display friendly labels in UI.

Keep status constants centralized.

---

# 47. NO ONLINE PAYMENT IN V1

Do NOT implement Razorpay, Stripe, payment processing, wallets, refunds, etc.

V1 is a **service request/booking system**, not a full marketplace.

Pricing/payment can be handled offline after communication/service.

The architecture may leave room for payment later.

---

# 48. NO TECHNICIAN PORTAL IN V1

Do NOT build a complete technician login/dashboard/commission marketplace yet.

The owner may manually coordinate partner technicians.

The database architecture can be extendable later for:

technicians
assignments
commissions

but don't overengineer V1.

---

# 49. WHAT V1 SHOULD ACHIEVE

A real person should be able to:

1. Visit the site.
2. Understand the business immediately.
3. Browse services.
4. Select a service.
5. Configure the service.
6. Add multiple services.
7. Book without an account.
8. Enter location.
9. Enter contact details.
10. Choose preferred date/time.
11. Review the request.
12. Submit it.
13. Have the booking stored securely in Supabase.
14. Receive a reference number.
15. Contact the business by call/WhatsApp.

A registered user should additionally be able to:

16. Login.
17. View their bookings.
18. See statuses.

The owner should be able to:

19. Login securely as admin.
20. View all incoming requests.
21. Open full customer/request details.
22. Call/WhatsApp the customer.
23. Update request status.

If these workflows function properly, V1 is successful.

---

# 50. IMPLEMENTATION APPROACH

Do NOT generate one enormous App.jsx containing the entire application.

Build the application properly.

Before implementation:

1. Analyze these requirements.
2. Analyze the attached UI image.
3. Define the architecture.
4. Define database schema.
5. Define routes.
6. Define reusable components.
7. Define booking state.
8. Define authentication approach.
9. Define RLS/security approach.

Then implement systematically.

Keep the project runnable after each major stage.

---

# 51. WHAT I WANT YOU TO GENERATE

I want the complete project, not just snippets.

Generate:

* project structure
* package configuration
* React application
* Tailwind configuration as appropriate for the installed version
* routing
* reusable components
* all pages
* responsive navbar
* footer
* homepage
* services
* service details
* service configuration modal
* booking basket
* booking flow
* success page/state
* customer authentication
* customer dashboard
* admin authentication/authorization
* admin dashboard
* request management
* Supabase integration
* database SQL/schema
* RLS policies
* seed catalogue data
* environment variable example
* Netlify SPA configuration
* README/setup instructions

Everything should be coherent and work together.

---

# 52. SETUP DOCUMENTATION

Provide clear instructions for me to:

1. Create the project locally.
2. Install dependencies.
3. Create a Supabase project.
4. Create the tables.
5. Apply migrations/schema.
6. Apply RLS policies.
7. Insert initial services/service areas.
8. Configure Supabase Auth.
9. Create the first admin securely.
10. Configure environment variables.
11. Run locally.
12. Test guest booking.
13. Test customer account.
14. Test admin dashboard.
15. Deploy to Netlify.
16. Configure Netlify environment variables.
17. Configure SPA redirects.
18. Configure Supabase allowed/auth redirect URLs for local and production environments.

Assume I know React/programming basics but explain Supabase-specific setup clearly.

---

# 53. IMPORTANT CODE QUALITY REQUIREMENTS

Do not:

* hardcode everything into one component
* duplicate service data throughout components
* put Supabase calls randomly across UI components
* expose secret credentials
* use service-role keys in browser code
* make every component hundreds of lines
* implement fake authentication
* implement admin authorization only through frontend routing
* require login for booking
* invent business statistics
* invent testimonials
* overengineer with microservices
* add Spring Boot
* add unnecessary payment functionality

Do:

* use reusable components
* separate data access
* centralize configuration
* handle errors
* handle loading
* use database-driven services
* protect customer data
* implement responsive UI
* write readable code
* add comments where architectural/security decisions need explanation

---

# 54. PLACEHOLDERS / CONFIGURATION

I have not finalized:

* business name
* logo
* business phone number
* WhatsApp number
* exact address
* complete list of service areas
* final prices
* final service catalogue
* business photos

Therefore create a centralized business configuration and clearly marked placeholders.

For example, do NOT scatter `"PowerFix"` or a phone number across 20 files.

Use something conceptually like:

businessConfig

with:

businessName
tagline
phone
whatsapp
email
serviceRegion
experienceYears

This should make rebranding easy.

For the UI, you may use a temporary professional placeholder business name, but make it obvious where I change it.

---

# 55. FUTURE EXTENSIBILITY

Do not implement these now, but avoid architecture that prevents adding:

* technician accounts
* technician assignment
* commission tracking
* online payments
* invoices
* reviews
* ratings
* coupons
* push notifications
* SMS/WhatsApp notifications
* additional cities
* more service categories
* pricing rules
* photo uploads
* service completion proof
* analytics

V1 should remain simple.

---

# FINAL INSTRUCTION

Treat the attached UI mockup as the **visual source of truth** and this prompt as the **functional/technical source of truth**.

If there is a conflict:

* use the image for visual styling/layout direction
* use these requirements for application behavior, architecture, database, authentication and security

Do not merely give me a tutorial explaining how to build the website.

**Build the actual project.**

Start by briefly presenting:

1. architecture
2. database schema
3. route structure
4. component/folder structure
5. implementation plan

Then proceed with the actual implementation.

If you are operating in an environment where you can create/edit project files directly, create the project files rather than dumping the entire application into chat.

The final result should be a polished, responsive, functional V1 that I can run locally, connect to Supabase, and deploy to Netlify.
