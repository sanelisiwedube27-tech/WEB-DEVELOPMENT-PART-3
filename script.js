document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------
     1. Interactive Lightbox Modal for Gallery
  -------------------------------------------------- */
  const galleryImages = document.querySelectorAll(".gallery-grid img");

  if (galleryImages.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.85); display: none; justify-content: center;
      align-items: center; z-index: 1000; cursor: pointer;
    `;

    const lightboxImg = document.createElement("img");
    lightboxImg.style.cssText = "max-width: 90%; max-height: 80%; border-radius: 8px;";

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = "flex";
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  /* --------------------------------------------------
     2. Live Search & Filter (Services / Events)
  -------------------------------------------------- */
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card, .office-card");

  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  /* --------------------------------------------------
     3. Client-Side Validation & AJAX Form Submission
  -------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const enquiryForm = document.getElementById("enquiryForm");

  const handleFormSubmit = (form, isEnquiry = false) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let isValid = true;
      const email = form.querySelector("input[type='email']");
      const phone = form.querySelector("input[type='tel']");
      const statusDiv = form.querySelector(".form-status") || document.createElement("div");
      statusDiv.className = "form-status";

      // Email Validation
      if (email && !/\S+@\S+\.\S+/.test(email.value)) {
        isValid = false;
        alert("Please enter a valid email address.");
      }

      // Phone Validation (if present)
      if (phone && phone.value && !/^\+?[0-9\s\-]{10,15}$/.test(phone.value)) {
        isValid = false;
        alert("Please enter a valid phone number.");
      }

      if (isValid) {
        // AJAX Simulation
        statusDiv.style.display = "block";
        statusDiv.className = "form-status success";
        statusDiv.textContent = isEnquiry 
          ? "Thank you! Your enquiry has been calculated and submitted successfully." 
          : "Thank you! Your message has been sent successfully.";
        
        if (!form.contains(statusDiv)) {
          form.appendChild(statusDiv);
        }

        form.reset();
      }
    });
  };

  if (contactForm) handleFormSubmit(contactForm, false);
  if (enquiryForm) handleFormSubmit(enquiryForm, true);
});