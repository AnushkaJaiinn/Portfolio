import './globals.css';
import Navigation from '../components/Navigation';
import ScrollProgressBar from '../components/ScrollProgressBar';

import Footer from '../components/Footer';

export const metadata = {
  title: 'Anushka Jain - Portfolio',
  description: 'Empowering Brands with Expert Marketing Solutions',
  icons: {
  icon: '/favicon.png',
  shortcut: '/favicon.png',
  apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans leading-normal tracking-tight overflow-x-hidden">
        <ScrollProgressBar />
        <Navigation />
        <main className="flex flex-col gap-20">
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const form = document.getElementById('contactForm');
                if (form) {
                  form.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyPEp0WbIMixZu8Q-OBn6qFw0vWESec5Ncu4wwbjPK6kE6gGRFP6RukNheDSLDG4lJJrQ/exec';

                    // Show loading state immediately
                    const submitBtn = e.target.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span class="relative z-10">Sending...</span>';
                    submitBtn.disabled = true;

                    // Get form data
                    const formData = new FormData(e.target);
                    
                    // Get selected topics
                    const selectedTopics = [];
                    document.querySelectorAll('.topic-btn[aria-pressed="true"]').forEach(btn => {
                      selectedTopics.push(btn.textContent.trim());
                    });
                    
                    // Get urgency
                    const urgencyBtn = document.querySelector('.urgency-btn[aria-pressed="true"]');
                    const urgency = urgencyBtn ? urgencyBtn.textContent.trim() : 'Soon';
                    
                    // Prepare JSON data exactly as your Google Apps Script expects
                    const jsonData = {
                      need: selectedTopics.join(', ') || 'General Inquiry',
                      urgency: urgency,
                      name: formData.get('name') || '',
                      email: formData.get('email') || '',
                      message: formData.get('message') || '',
                      emailMe: formData.get('emailMe') ? 'on' : 'off'
                    };

                    console.log('Sending data:', jsonData);

                    // Send JSON data to your Google Apps Script
                    fetch(GOOGLE_APP_SCRIPT_URL, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(jsonData)
                    })
                    .then(response => {
                      if (response.ok) {
                        return response.json();
                      }
                      throw new Error('Network response was not ok');
                    })
                    .then(result => {
                      console.log('Success:', result);
                      if (result.result === 'success') {
                        showSuccess();
                      } else {
                        showError('Server returned an error');
                      }
                    })
                    .catch((error) => {
                      console.log('Fetch failed, trying no-cors method');
                      // Fallback: Send with no-cors mode (won't get response but should work)
                      fetch(GOOGLE_APP_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(jsonData)
                      })
                      .then(() => {
                        console.log('Sent via no-cors mode');
                        showSuccess();
                      })
                      .catch((fallbackError) => {
                        console.error('All methods failed:', fallbackError);
                        showError('Failed to send message');
                      });
                    });

                    function showSuccess() {
                      // Show success message
                      alert("✅ Thank you! Your message has been sent successfully.");
                      resetForm();
                    }

                    function showError(message) {
                      // Show error message
                      alert("❌ " + message + ". Please try again.");
                      resetButton();
                    }

                    function resetForm() {
                      // Reset form
                      e.target.reset();
                      
                      // Reset React state if function is available
                      if (window.resetFormState) {
                        window.resetFormState();
                      }
                      
                      // Also reset form fields manually
                      const messageField = e.target.querySelector('textarea[name="message"]');
                      if (messageField) {
                        messageField.value = '';
                        messageField.dispatchEvent(new Event('input', { bubbles: true }));
                      }
                      
                      const nameField = e.target.querySelector('input[name="name"]');
                      if (nameField) {
                        nameField.value = '';
                      }
                      
                      const emailField = e.target.querySelector('input[name="email"]');
                      if (emailField) {
                        emailField.value = '';
                      }
                      
                      // Reset topic buttons
                      document.querySelectorAll('.topic-btn').forEach(btn => {
                        btn.setAttribute('aria-pressed', 'false');
                        btn.className = 'topic-btn px-3 py-1.5 rounded-full text-sm transition-colors bg-anushka-100 text-anushka-700 hover:bg-anushka-200';
                      });
                      
                      // Reset urgency to Soon
                      document.querySelectorAll('.urgency-btn').forEach(btn => {
                        if (btn.textContent.trim() === 'Soon') {
                          btn.setAttribute('aria-pressed', 'true');
                          btn.className = 'urgency-btn py-2 rounded-lg text-sm border transition-colors bg-anushka-500 text-white border-anushka-400';
                        } else {
                          btn.setAttribute('aria-pressed', 'false');
                          btn.className = 'urgency-btn py-2 rounded-lg text-sm border transition-colors bg-anushka-50 text-anushka-700 border-anushka-200 hover:bg-anushka-100';
                        }
                      });
                      
                      resetButton();
                    }

                    function resetButton() {
                      // Restore submit button
                      submitBtn.innerHTML = originalText;
                      submitBtn.disabled = false;
                    }
                  });
                }
              });
            `
          }}
        />
      </body>
    </html>
  );
}