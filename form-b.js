document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const form = document.getElementById('formB');
  const previewBtn = document.getElementById('previewBtn');
  const previewModalElement = document.getElementById('previewModal');
  const printBtn = document.getElementById('printBtnModal');

  // Initialize Bootstrap modal
  let previewModal;
  if (previewModalElement) {
    previewModal = new bootstrap.Modal(previewModalElement);
  }

  // Set current date
  const today = new Date();
  const displayDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentDateElement = document.getElementById('currentDate');
  const dateFieldElement = document.getElementById('dateField');
  if (currentDateElement) currentDateElement.textContent = displayDate;
  if (dateFieldElement) dateFieldElement.value = today.toISOString().split('T')[0];

  // Preview function
  function showPreview() {
    if (!previewModal) {
      alert("Modal not initialized. Please refresh the page.");
      return;
    }
    const data = new FormData(form);
    const agreementChecked = form.querySelector('input[name="student_agreement"]:checked');
    const agreementHtml = `
      <div class="mt-4 text-center">
        <div><strong>Student Agreement:</strong></div>
        ${agreementChecked ? 
          '<div class="text-success mt-2"><i class="bi bi-check-circle me-1"></i>Student has agreed to the terms and conditions</div>' :
          '<div class="text-danger mt-2"><i class="bi bi-x-circle me-1"></i>Not agreed</div>'}
      </div>
    `;
    let html = `
      <table class="table table-bordered">
        <tbody>
          <tr><th>Project ID</th><td>${data.get('project_id') || 'Not filled'}</td><th>Student Name</th><td>${data.get('student_name') || 'Not filled'}</td></tr>
          <tr><th>Internship Type</th><td>${data.get('internship_type') || 'Not filled'}</td><th>Student ID</th><td>${data.get('student_id') || 'Not filled'}</td></tr>
          <tr><th>Student Department</th><td>${data.get('student_dept') || 'Not filled'}</td><th>Faculty Supervisor</th><td>${data.get('faculty_supervisor') || 'Not filled'}</td></tr>
          <tr><th>Supervisor Email</th><td>${data.get('supervisor_email') || 'Not filled'}</td><th>Supervisor Contact</th><td>${data.get('supervisor_contact') || 'Not filled'}</td></tr>
          <tr><th>Project Title</th><td colspan="3">${data.get('project_title') || 'Not filled'}</td></tr>
          <tr><th>Host Institution</th><td colspan="3">${data.get('host_institution') || 'Not filled'}</td></tr>
          <tr><th>Site Supervisor</th><td>${data.get('site_supervisor') || 'Not filled'}</td><th>Site Supervisor Email</th><td>${data.get('site_supervisor_email') || 'Not filled'}</td></tr>
          <tr><th>Site Supervisor Contact</th><td>${data.get('site_supervisor_contact') || 'Not filled'}</td><td></td><td></td></tr>
        </tbody>
      </table>
      ${agreementHtml}
    `;
    document.getElementById('previewContent').innerHTML = html;
    previewModal.show();
  }

  if (previewBtn) {
    previewBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showPreview();
    });
  }

  function setupPrintHandler() {
    const printBtn = document.getElementById('printBtnModal');
    if (!printBtn) return;
    printBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalBackdrop = document.querySelector('.modal-backdrop');
      const modal = document.getElementById('previewModal');
      const body = document.body;
      // Store original styles
      const originalBodyClass = body.className;
      const originalBackdropDisplay = modalBackdrop ? modalBackdrop.style.display : '';
      const originalModalDisplay = modal.style.display;
      // Hide backdrop and adjust modal for printing
      if (modalBackdrop) modalBackdrop.style.display = 'none';
      modal.style.display = 'block';
      modal.style.position = 'static';
      modal.style.transform = 'none';
      body.className = originalBodyClass.replace('modal-open', '');
      // Print the page
      window.print();
      // Restore original styles after printing
      setTimeout(() => {
        if (modalBackdrop) modalBackdrop.style.display = originalBackdropDisplay;
        modal.style.display = originalModalDisplay;
        modal.style.position = '';
        modal.style.transform = '';
        body.className = originalBodyClass;
      }, 100);
    });
  }
  setupPrintHandler();

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Form submitted successfully!');
    });
  }
});
