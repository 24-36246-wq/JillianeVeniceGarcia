document.addEventListener("DOMContentLoaded", () => {
  
  const revealElements = document.querySelectorAll('.fade-up');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 

  const contactForm = document.getElementById("contactForm");
  const contactResult = document.getElementById("contactResult");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm && contactResult) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (fullName && email && message) {
        
        submitBtn.textContent = "Sending... ⏳";
        submitBtn.disabled = true;
        contactResult.innerHTML = "";

        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            contactResult.innerHTML = `Thank you, <b>${fullName}</b>! Your message is on its way. I'll reply soon! 🦋`;
            contactResult.style.color = "var(--text-dark)";
            contactResult.style.background = "var(--pastel-purple)";
            contactResult.style.padding = "15px";
            contactResult.style.borderRadius = "15px";
            
            contactForm.reset();
          } else {

            contactResult.innerHTML = "Oops! There was a problem submitting your form.";
            contactResult.style.color = "var(--text-dark)";
            contactResult.style.background = "var(--pastel-pink)";
            contactResult.style.padding = "15px";
            contactResult.style.borderRadius = "15px";
          }
        })
        .catch(error => {
          contactResult.innerHTML = "Oops! There was a network error. Please try again.";
          contactResult.style.color = "var(--text-dark)";
          contactResult.style.background = "var(--pastel-pink)";
          contactResult.style.padding = "15px";
          contactResult.style.borderRadius = "15px";
        })
        .finally(() => {
          submitBtn.textContent = "Send Message 🦋";
          submitBtn.disabled = false;

          setTimeout(() => {
            contactResult.innerHTML = "";
            contactResult.style.background = "transparent";
          }, 5000);
        });

      } else {
        contactResult.innerHTML = `Please complete all the fields first.`;
        contactResult.style.color = "var(--text-dark)";
        contactResult.style.background = "var(--pastel-pink)";
        contactResult.style.padding = "15px";
        contactResult.style.borderRadius = "15px";
        
        setTimeout(() => {
          contactResult.innerHTML = "";
          contactResult.style.background = "transparent";
        }, 3000);
      }
    });
  }
});