/**
 * Booking Form JavaScript
 * - Multi-step form navigation
 * - Form validation
 * - Date picker integration (Flatpickr)
 * - LocalStorage form recovery
 * - FormSubmit.co integration
 */

(function () {
  'use strict';

  const form = document.getElementById('booking-form');

  if (!form) {
    return; // Exit if not on booking page
  }

  // ========== Form Elements ==========
  const steps = document.querySelectorAll('.booking-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextButtons = document.querySelectorAll('[data-next-step]');
  const prevButtons = document.querySelectorAll('[data-prev-step]');
  const submitButton = document.getElementById('submit-booking');

  // Form inputs
  const dateInput = document.getElementById('booking-date');
  const timeInput = document.getElementById('booking-time');
  const guestsInput = document.getElementById('booking-guests');
  const nameInput = document.getElementById('booking-name');
  const emailInput = document.getElementById('booking-email');
  const phoneInput = document.getElementById('booking-phone');
  const messageInput = document.getElementById('booking-message');
  const privacyInput = document.getElementById('booking-privacy');

  // Summary elements
  const summaryDate = document.getElementById('summary-date');
  const summaryTime = document.getElementById('summary-time');
  const summaryGuests = document.getElementById('summary-guests');
  const summaryName = document.getElementById('summary-name');
  const summaryEmail = document.getElementById('summary-email');
  const summaryPhone = document.getElementById('summary-phone');

  let currentStep = 1;


  // ========== Date Picker (Flatpickr) ==========
  if (typeof flatpickr !== 'undefined' && dateInput) {
    flatpickr(dateInput, {
      locale: 'hu',
      minDate: 'today',
      dateFormat: 'Y-m-d',
      disable: [
        function (date) {
          // Disable Monday (1) and Tuesday (2)
          return date.getDay() === 1 || date.getDay() === 2;
        }
      ],
      onChange: function (selectedDates, dateStr) {
        // Save to LocalStorage on change
        saveFormData();
        // Clear error if valid
        if (dateStr) {
          clearError('date');
        }
      }
    });
  }


  // ========== Step Navigation ==========
  function goToStep(stepNumber) {
    // Hide all steps
    steps.forEach(function (step) {
      step.classList.remove('booking-step--active');
    });

    // Show target step
    const targetStep = document.querySelector('.booking-step[data-step="' + stepNumber + '"]');
    if (targetStep) {
      targetStep.classList.add('booking-step--active');
    }

    // Update progress indicators
    progressSteps.forEach(function (progressStep) {
      const stepNum = parseInt(progressStep.getAttribute('data-step'));

      if (stepNum < stepNumber) {
        progressStep.classList.add('progress-step--completed');
        progressStep.classList.remove('progress-step--active');
      } else if (stepNum === stepNumber) {
        progressStep.classList.add('progress-step--active');
        progressStep.classList.remove('progress-step--completed');
      } else {
        progressStep.classList.remove('progress-step--active', 'progress-step--completed');
      }
    });

    // Update current step
    currentStep = stepNumber;

    // Scroll to top of form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // If going to step 3, update summary
    if (stepNumber === 3) {
      updateSummary();
    }
  }


  // ========== Next Button Handlers ==========
  nextButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const nextStep = parseInt(this.getAttribute('data-next-step'));

      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        saveFormData();
        goToStep(nextStep);
      }
    });
  });


  // ========== Previous Button Handlers ==========
  prevButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const prevStep = parseInt(this.getAttribute('data-prev-step'));
      goToStep(prevStep);
    });
  });


  // ========== Validation Functions ==========
  function validateStep(stepNumber) {
    let isValid = true;

    if (stepNumber === 1) {
      // Validate Step 1: Date, Time, Guests
      if (!dateInput.value) {
        showError('date', 'Kérlek válassz egy dátumot!');
        isValid = false;
      } else {
        clearError('date');
      }

      if (!timeInput.value) {
        showError('time', 'Kérlek válassz időpontot!');
        isValid = false;
      } else {
        clearError('time');
      }

      if (!guestsInput.value) {
        showError('guests', 'Kérlek add meg a létszámot!');
        isValid = false;
      } else {
        clearError('guests');
      }
    }

    if (stepNumber === 2) {
      // Validate Step 2: Name, Email, Phone, Privacy
      if (!nameInput.value.trim()) {
        showError('name', 'Kérlek add meg a neved!');
        isValid = false;
      } else {
        clearError('name');
      }

      if (!emailInput.value.trim()) {
        showError('email', 'Kérlek add meg az email címed!');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError('email', 'Kérlek adj meg érvényes email címet!');
        isValid = false;
      } else {
        clearError('email');
      }

      if (!phoneInput.value.trim()) {
        showError('phone', 'Kérlek add meg a telefonszámodat!');
        isValid = false;
      } else if (!isValidPhone(phoneInput.value)) {
        showError('phone', 'Kérlek adj meg érvényes telefonszámot!');
        isValid = false;
      } else {
        clearError('phone');
      }

      if (!privacyInput.checked) {
        showError('privacy', 'Az adatkezelési tájékoztató elfogadása kötelező!');
        isValid = false;
      } else {
        clearError('privacy');
      }
    }

    return isValid;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    // Hungarian phone number validation (basic)
    const re = /^(\+36|06)?[\s-]?[0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
    return re.test(phone.trim());
  }

  function showError(fieldName, message) {
    const errorElement = document.getElementById('error-' + fieldName);
    const inputElement = document.getElementById('booking-' + fieldName);

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }

    if (inputElement) {
      inputElement.classList.add('is-invalid');
    }
  }

  function clearError(fieldName) {
    const errorElement = document.getElementById('error-' + fieldName);
    const inputElement = document.getElementById('booking-' + fieldName);

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }

    if (inputElement) {
      inputElement.classList.remove('is-invalid');
    }
  }


  // ========== Update Summary ==========
  function updateSummary() {
    summaryDate.textContent = dateInput.value || '-';
    summaryTime.textContent = timeInput.value || '-';
    summaryGuests.textContent = guestsInput.value ? guestsInput.value + ' fő' : '-';
    summaryName.textContent = nameInput.value || '-';
    summaryEmail.textContent = emailInput.value || '-';
    summaryPhone.textContent = phoneInput.value || '-';
  }


  // ========== LocalStorage Form Recovery ==========
  const STORAGE_KEY = 'hangarbistro_booking_form';

  function saveFormData() {
    const formData = {
      date: dateInput.value,
      time: timeInput.value,
      guests: guestsInput.value,
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      message: messageInput.value
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }

  function loadFormData() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const formData = JSON.parse(savedData);

        if (formData.date) dateInput.value = formData.date;
        if (formData.time) timeInput.value = formData.time;
        if (formData.guests) guestsInput.value = formData.guests;
        if (formData.name) nameInput.value = formData.name;
        if (formData.email) emailInput.value = formData.email;
        if (formData.phone) phoneInput.value = formData.phone;
        if (formData.message) messageInput.value = formData.message;
      }
    } catch (e) {
      console.warn('Failed to load form data:', e);
    }
  }

  function clearFormData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear form data:', e);
    }
  }

  // Load saved data on page load
  loadFormData();

  // Save data on input change
  const allInputs = [dateInput, timeInput, guestsInput, nameInput, emailInput, phoneInput, messageInput];
  allInputs.forEach(function (input) {
    if (input) {
      input.addEventListener('input', saveFormData);
      input.addEventListener('change', saveFormData);
    }
  });


  // ========== Form Submission ==========
  form.addEventListener('submit', function (e) {
    // Final validation before submit
    if (!validateStep(2)) {
      e.preventDefault();
      goToStep(2); // Go back to step 2 if validation fails
      return;
    }

    // Disable submit button to prevent double submission
    submitButton.disabled = true;
    submitButton.textContent = 'Foglalás küldése...';

    // Clear LocalStorage after successful submission
    // (FormSubmit will redirect to koszonjuk.html)
    setTimeout(function () {
      clearFormData();
    }, 500);

    // Form will submit normally to FormSubmit.co
  });


  // ========== Real-time Validation Feedback ==========
  if (emailInput) {
    emailInput.addEventListener('blur', function () {
      if (this.value && !isValidEmail(this.value)) {
        showError('email', 'Kérlek adj meg érvényes email címet!');
      } else if (this.value) {
        clearError('email');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', function () {
      if (this.value && !isValidPhone(this.value)) {
        showError('phone', 'Kérlek adj meg érvényes telefonszámot!');
      } else if (this.value) {
        clearError('phone');
      }
    });
  }


  // ========== Console Log ==========
  console.log('Booking form JS loaded successfully');

})();
