// Enhanced script.js for Hisab Kitab - With Sound, Animation, PDF, and Excel Support

const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
let totalBalance = parseFloat(localStorage.getItem("totalBalance")) || 0;
const balanceHistory = JSON.parse(localStorage.getItem("balanceHistory")) || [];

const sounds = {
    add: new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c40109f6dc.mp3?filename=success-1-6297.mp3"),
    delete: new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7efc0ec12b.mp3?filename=interface-click-124494.mp3"),
    alert: new Audio("https://cdn.pixabay.com/download/audio/2021/09/14/audio_4d5f354fcb.mp3?filename=error-126627.mp3")
};

function playSound(type) {
    if (sounds[type]) sounds[type].play();
}

function displayPurchaseHistory() {
    const tableBody = document.querySelector("#purchaseHistory tbody");
    if (!tableBody) return console.error("Table body not found");
    tableBody.innerHTML = "";

    let total = 0;
    purchaseHistory.forEach((product, index) => {
        if (!product.name || isNaN(product.price)) return;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td title="Delete" onclick="deleteRow(${index})" style="cursor: pointer;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#d9534f" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM18 4h-3l-1-1H10L9 4H6v2h12V4z"/>
    </svg>
</td>

        `;
        row.style.animation = "fadeInUp 0.6s ease-in-out";
        tableBody.appendChild(row);
        total += parseFloat(product.price);
    });

    const totalAmountElement = document.getElementById("totalAmount");
    if (totalAmountElement) totalAmountElement.textContent = `Total: ₹${total.toFixed(2)}`;
    updateBalanceDisplay();
}

function addProduct() {
    const name = document.getElementById("productName")?.value.trim();
    const price = parseFloat(document.getElementById("productPrice")?.value);

    if (!name || isNaN(price) || price <= 0) {
        playSound("alert");
        swal("Invalid Input", "❗ Please enter a valid product name and a positive price.", "error");
        return;
    }

    if (totalBalance < price) {
        playSound("alert");
        swal("Insufficient Balance", "⚠️ Please add more balance to continue.", "warning");
        return;
    }

    const product = { name, price, date: new Date().toLocaleString() };
    purchaseHistory.push(product);
    totalBalance -= price;

    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
    localStorage.setItem("totalBalance", totalBalance);

    playSound("add");
    displayPurchaseHistory();
    clearInputs();

    // ✅ SweetAlert Success Confirmation
    swal({
        title: "Product Added!",
        text: `${name} for ₹${price.toFixed(2)} has been added.`,
        icon: "success",
        button: "Awesome!",
        timer: 2000
    });
}

function clearInputs() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productName").focus();
}

function deleteRow(index) {
    if (index < 0 || index >= purchaseHistory.length) return;
    totalBalance += parseFloat(purchaseHistory[index].price);
    purchaseHistory.splice(index, 1);
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
    localStorage.setItem("totalBalance", totalBalance);
    playSound("delete");
    displayPurchaseHistory();
}

function deleteAll() {
    swal({
        title: "Delete All Products?",
        text: "This will remove all purchase history.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem("purchaseHistory");
            purchaseHistory.length = 0;
            displayPurchaseHistory();
            playSound("delete");
        }
    });
}

function deleteBalance() {
    swal({
        title: "Reset Balance?",
        text: "This will reset your balance and clear history.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirmed) => {
        if (confirmed) {
            localStorage.removeItem("totalBalance");
            localStorage.removeItem("balanceHistory");
            totalBalance = 0;
            balanceHistory.length = 0;
            updateBalanceDisplay();
            playSound("delete");
        }
    });
}

function addBalance() {
    swal("Enter amount to add to your balance:", {
        content: "input",
    }).then(amountStr => {
        const amount = parseFloat(amountStr);
        if (!isNaN(amount) && amount > 0) {
            swal("Enter reason for adding this amount:", {
                content: "input"
            }).then(reason => {
                const date = new Date().toLocaleString();
                totalBalance += amount;
                balanceHistory.push({ amount, reason: reason || "No reason provided", date });
                localStorage.setItem("totalBalance", totalBalance);
                localStorage.setItem("balanceHistory", JSON.stringify(balanceHistory));
                updateBalanceDisplay();
                playSound("add");

                // ✅ Show confirmation popup
                swal({
                    title: "Balance Added!",
                    text: `₹${amount.toFixed(2)} added for: ${reason || "No reason provided"}`,
                    icon: "success",
                    timer: 2500,
                    button: false
                });
            });
        } else {
            swal("Invalid Amount", "Please enter a valid number greater than zero.", "error");
        }
    });
}

function updateBalanceDisplay() {
    const balanceDisplay = document.getElementById("balanceDisplay");
    if (balanceDisplay) {
        balanceDisplay.textContent = `Balance: ₹${totalBalance.toFixed(2)}`;
    }
}

function reloadPage() {
    location.reload();
}

function downloadPDF() {
    // Create document definition for pdfmake
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        header: {
            text: 'Hisab Kitab Report',
            alignment: 'center',
            margin: [0, 20, 0, 20],
            fontSize: 20,
            bold: true,
            color: '#5cb85c'
        },
        footer: function(currentPage, pageCount) {
            return {
                text: currentPage.toString() + ' of ' + pageCount,
                alignment: 'center',
                margin: [0, 10, 0, 0]
            };
        },
        content: [
            // Company/App Info
            {
                columns: [
                    {
                        width: '*',
                        text: [
                            { text: 'Hisab Kitab', fontSize: 16, bold: true, color: '#5cb85c' },
                            '\n',
                            { text: 'Generated: ' + new Date().toLocaleString(), fontSize: 10 }
                        ]
                    },
                    {
                        width: '*',
                        text: [
                            { text: 'Current Balance:', fontSize: 12 },
                            '\n',
                            { text: '₹' + totalBalance.toFixed(2), fontSize: 16, bold: true, color: totalBalance >= 0 ? '#28a745' : '#dc3545' }
                        ],
                        alignment: 'right'
                    }
                ],
                margin: [0, 0, 0, 20]
            },
            
            // Purchase History Section
            { text: 'Product Purchase History', style: 'sectionHeader' },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', 'auto'],
                    body: [
                        // Header row
                        [{ text: '#', style: 'tableHeader' }, 
                         { text: 'Product Name', style: 'tableHeader' }, 
                         { text: 'Price', style: 'tableHeader' }, 
                         { text: 'Date', style: 'tableHeader' }],
                        // Data rows
                        ...purchaseHistory.map((item, index) => [
                            index + 1,
                            item.name,
                            { text: '₹' + parseFloat(item.price).toFixed(2), alignment: 'right' },
                            item.date || 'N/A'
                        ])
                    ]
                },
                layout: {
                    fillColor: function(rowIndex) {
                        return (rowIndex % 2 === 0) ? '#f9f9f9' : null;
                    }
                }
            },
            
            // Total Purchase Amount
            {
                text: 'Total Purchase Amount: ₹' + purchaseHistory.reduce((sum, item) => sum + parseFloat(item.price || 0), 0).toFixed(2),
                alignment: 'right',
                bold: true,
                margin: [0, 10, 0, 20]
            },
            
            // Balance History Section
            { text: 'Balance Addition History', style: 'sectionHeader' },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', '*', 'auto'],
                    body: [
                        // Header row
                        [{ text: '#', style: 'tableHeader' }, 
                         { text: 'Amount', style: 'tableHeader' }, 
                         { text: 'Reason', style: 'tableHeader' }, 
                         { text: 'Date', style: 'tableHeader' }],
                        // Data rows
                        ...balanceHistory.map((entry, index) => [
                            index + 1,
                            { text: '₹' + parseFloat(entry.amount).toFixed(2), alignment: 'right' },
                            entry.reason || 'N/A',
                            entry.date || 'N/A'
                        ])
                    ]
                },
                layout: {
                    fillColor: function(rowIndex) {
                        return (rowIndex % 2 === 0) ? '#f9f9f9' : null;
                    }
                }
            }
        ],
        styles: {
            sectionHeader: {
                fontSize: 14,
                bold: true,
                margin: [0, 15, 0, 10],
                color: '#5cb85c'
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: '#007acc'
            }
        }
    };

    // Generate and download the PDF
    pdfMake.createPdf(docDefinition).download('Hisab_Kitab_Report.pdf');
}

displayPurchaseHistory();

// Event listener for Total button
document.getElementById("totalBtn")?.addEventListener("click", () => {
    const total = purchaseHistory.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    Swal.fire({
        title: "Total Purchase",
        text: `Your total purchase amount is ₹${total.toFixed(2)}`,
        icon: "info",
        confirmButtonText: "OK"
    });
});

window.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("welcomeShown")) {
        Swal.fire({
            title: "Welcome to Hisab Kitab!",
            text: "Track your expenses smartly 💰",
            icon: "success",
            timer: 2500,
            showConfirmButton: false
        });
        playSound("add");
        localStorage.setItem("welcomeShown", "true");
    }
});


// Remove these lines at the end of the file (lines 400-443)
// Toggle theme function
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update label text
  if (themeLabel) {
    themeLabel.textContent = isDarkMode ? '' : '';
  }
  
  // Show confirmation toast
  showToast(isDarkMode ? 'Dark mode enabled!' : 'Light mode enabled!');
}

// Show a toast notification about the theme toggle button
function showThemeToast() {
  // Only show this toast once per session
  if (!sessionStorage.getItem('themeToastShown')) {
    setTimeout(() => {
      showToast('Tap the mode button to toggle theme!', 'info');
      sessionStorage.setItem('themeToastShown', 'true');
    }, 3000);
  }
}

// Add event listener
if (themeSwitch) {
  themeSwitch.addEventListener('click', toggleTheme);
  
  // Add mobile-specific events
  themeSwitch.addEventListener('touchstart', function() {
    this.classList.add('active');
  });
  
  themeSwitch.addEventListener('touchend', function() {
    this.classList.remove('active');
  });
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);