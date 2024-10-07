// JavaScript to detect when an element is in the viewport
const scrollElements = document.querySelectorAll(".scroll-section .content");

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight - offset);
};

const displayScrollElement = (element) => {
    element.classList.add("scroll-active");
};

const hideScrollElement = (element) => {
    element.classList.remove("scroll-active");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 150)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener("scroll", () => {
    handleScrollAnimation();
});

function scrollLeft(sectionId) {
    let container = document.getElementById(sectionId);
    container.scrollLeft -= container.offsetWidth; // Scroll left by container width
}

function scrollRight(sectionId) {
    let container = document.getElementById(sectionId);
    container.scrollLeft += container.offsetWidth; // Scroll right by container width
}

window.onload = function() {
    // Check if username exists in local storage and autofill
    const savedUsername = localStorage.getItem("username");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
  
    if (rememberMe && savedUsername) {
      document.getElementById("username").value = savedUsername;
      document.getElementById("rememberMe").checked = true;
    }
  
    // Save username if Remember Me is checked
    document.querySelector("form").addEventListener("submit", function(e) {
      if (document.getElementById("rememberMe").checked) {
        localStorage.setItem("username", document.getElementById("username").value);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("rememberMe");
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const vehicleSelect = document.getElementById('vehicle');

    const vehicleOptions = {
        "Executive Sedan": ["Mercedes S-Class", "BMW 7 Series", "Audi A8", "Genesis 90", "Jagur XJ", "Rolls-Roys", "Lexus LS", "Bently flying spur" ,"Porsche Panamera"
        ],
        "Luxury Limousine": ["Mercedes", "Rolls Royce", "Cadillac", "Lincon", "Hummer"],
         "SUV": ["Range Rover", "BMW X5", "Lexus", "GMC", "Mercedes", "Audi",
            "Cadilac"
         ]
    };

    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;

        // Clear previous options
        vehicleSelect.innerHTML = '<option value="">Select a Vehicle</option>';

        // Populate new options based on category
        if (selectedCategory && vehicleOptions[selectedCategory]) {
            vehicleOptions[selectedCategory].forEach(vehicle => {
                const option = document.createElement('option');
                option.value = vehicle;
                option.textContent = vehicle;
                vehicleSelect.appendChild(option);
            });
        }
    });
});

// Retrieve query parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const carType = urlParams.get('carType');
const days = parseInt(urlParams.get('days'));

// Define car rental rates for each type
const rates = {
    sedan: 50,  // $50 per day for Sedans
    suv: 70,    // $70 per day for SUVs
    limo: 100   // $100 per day for Limousines
};

// Calculate base price and tax
const basePrice = rates[carType] * days;
const tax = basePrice * 0.10; // 10% tax rate
const totalPrice = basePrice + tax;

// Display the reservation details on the checkout page
document.getElementById('selected-car').innerText = carType ? carType.charAt(0).toUpperCase() + carType.slice(1) : "Not Specified";
document.getElementById('rental-days').innerText = days || 0;
document.getElementById('base-price').innerText = basePrice.toFixed(2);
document.getElementById('tax').innerText = tax.toFixed(2);
document.getElementById('total-price').innerText = totalPrice.toFixed(2);

// Simulate payment processing
function processPayment() {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVV = document.getElementById('card-cvv').value;

    if (cardNumber && cardExpiry && cardCVV) {
        alert(`Payment Successful! Your total charge is $${totalPrice.toFixed(2)}.`);
        // Redirect to a confirmation page or home page
        window.location.href = "confirmation.html";
    } else {
        alert("Please fill out all card information fields.");
    }
}