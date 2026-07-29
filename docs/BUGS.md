# Known Bugs

## Service configuration modal positioning

### Issue
At full desktop viewport width, ServiceOptionModal can appear constrained
inside the ServiceCard instead of centered relative to the browser viewport.

Opening Chrome DevTools and reducing the viewport width causes the modal
to render correctly.

### Reproduction
1. Open /services on desktop.
2. Click Book on a service.
3. Modal may appear constrained to the ServiceCard.
4. Open Chrome DevTools.
5. Modal appears correctly centered.
6. Close DevTools.
7. Problem returns.

### Suspected cause
Desktop responsive CSS / transformed ancestor / containing block /
stacking context affecting the fixed-position modal.

### Planned investigation
Inspect Modal.jsx, ServiceOptionModal.jsx, ServiceCard.jsx and desktop
responsive classes.

Consider rendering the generic Modal through createPortal(..., document.body).

### Priority
High — must fix before production deployment.