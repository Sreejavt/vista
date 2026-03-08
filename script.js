window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
//document.querySelector('.hamburger').addEventListener('click', () => {
    //document.querySelector('.right-container').classList.toggle('open');
//});
//document.querySelectorAll('.nav-links a').forEach(link => {
    //link.addEventListener('click', () => {
       // document.querySelector('.right-container').classList.remove('open');
   // });
//});
// Wait for the DOM to be fully loaded
const hamburger = document.querySelector('.hamburger');
const rightContainer = document.querySelector('.right-container');

hamburger.addEventListener('click', function() {
    rightContainer.classList.toggle('active');
    hamburger.textContent = rightContainer.classList.contains('active') ? '✕' : '☰';
});

    // Close menu when a link is clicked (useful for single-page apps)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
    link.addEventListener('click', () => {
        rightContainer.classList.remove('active'); // was navLinks
        hamburger.textContent = '☰';
    });
});


// This selects both normal #links and the index.html#links
document.querySelectorAll('a[href^="#"], footer a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        // Get the full href and extract just the #part
        const href = anchor.getAttribute('href');
        const targetId = href.includes('#') ? href.substring(href.indexOf('#')) : null;

        if (targetId && targetId !== "#") {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); // Only prevent default if the target exists on this page

                const header = document.querySelector('header');
                const headerHeight = header.offsetHeight;
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Calculating the exact math: Position + Current Scroll - Header - Extra 40px gap
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 40;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});




    const allCtas = document.querySelectorAll('.primary-cta-btn, .sticky-cta-btn, .pricing-cta-btn, .final-cta-btn-1, .final-cta-btn-2, .mobile-sticky-cta');
    const contactSection = document.querySelector('#contact');

    allCtas.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // This checks the physical height of your sticky header
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            
            // getBoundingClientRect().top is the distance from the viewport top
            // window.pageYOffset is how much we've already scrolled
            const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 60;

            window.scrollTo({
                top: targetPos,
                behavior: "smooth"
            });
        });
    });

const icons = document.querySelectorAll('.toggle-icon');

icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        const parentDiv = icon.parentElement.parentElement;
        
        // 1. Toggle the active class
        parentDiv.classList.toggle('active');
        
        // 2. Simple text swap logic
        if (parentDiv.classList.contains('active')) {
            icon.textContent = '×';
        } else {
            icon.textContent = '+';
        }
    });
});

const navContainer = document.querySelector('.nav-links');

navContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        // 1. Remove .active from whatever link has it currently
        const current = navContainer.querySelector('.active');
        if (current) current.classList.remove('active');

        // 2. Add .active to the link that was actually clicked
        e.target.classList.add('active');
    }
});

const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the default page reload/redirect

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const roleInput = document.querySelector('#role');
    const companyInput = document.querySelector('#company');
    const button = contactForm.querySelector('button');

    // Helper to check validity
    const validate = (input) => {
        const error = input.nextElementSibling;
        if (!input.checkValidity() || input.value.trim() === "") {
            error.style.display = 'block';
            return false;
        }
        error.style.display = 'none';
        return true;
    };

    // Run all validations
    if (validate(nameInput) && validate(emailInput) && validate(roleInput) && validate(companyInput)) {
        
        // Prepare the data for Formspree
        const formData = new FormData(contactForm);
        button.innerText = "Sending...";
        button.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // SUCCESS! 
                button.innerText = "Message Sent!";
                button.style.backgroundColor = "#be93f3"; // Your active lavender
                contactForm.reset();
            } else {
                // SERVER ERROR
                alert("Oops! There was a problem submitting your form.");
                button.innerText = "Request Service";
                button.disabled = false;
            }
        } catch (error) {
            // NETWORK ERROR
            alert("Network error. Please check your connection.");
            button.innerText = "Request Service";
            button.disabled = false;
        }
    }
});
