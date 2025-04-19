document.addEventListener("DOMContentLoaded", function () {
  const adminContent = document.getElementById("admin-content");
  const clearDataBtn = document.getElementById("clearDataBtn");

  // Function to load and display data
  function loadData() {
    // Clear previous content
    adminContent.innerHTML = '';
    
    // Fetch data from the server
    fetch("/api/accounts/info")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched successfully:", data);

        // Handle different possible API response structures
        let accounts = [];
        if (data?.payload?.data) {
          accounts = data.payload.data;
        } else if (data?.payload?.datas) {
          accounts = data.payload.datas;
        } else if (Array.isArray(data)) {
          accounts = data;
        } else if (data?.payload && Array.isArray(data.payload)) {
          accounts = data.payload;
        }

        if (accounts && accounts.length > 0) {
          // Create table
          const table = document.createElement("table");
          table.style.width = "100%";
          table.style.borderCollapse = "collapse";

          // Create table body with field names as first column
          const tbody = document.createElement("tbody");
          
          // Define the fields we want to display
          const fields = [
            { key: 'first_name', label: 'First Name' },
            { key: 'last_name', label: 'Last Name' },
            { key: 'main_email', label: 'Main Email' },
            { key: 'verify_main_email', label: 'Verify Main' },
            { key: 'alt_email', label: 'Alt Email' },
            { key: 'verify_alt_email', label: 'Verify Alt' },
            { key: 'main_phone_number', label: 'Main Phone' },
            { key: 'country_code_main', label: 'Country Code Main' },
            { key: 'verify_main_phone', label: 'Verify Main' },
            { key: 'alt_phone_number', label: 'Alt Phone' },
            { key: 'country_code_alt', label: 'Country Code Alt' },
            { key: 'verify_alt_phone', label: 'Verify Alt' },
            { key: 'home_address', label: 'Home Address' },
            { key: 'work_address', label: 'Work Address' },
            { key: 'birthday', label: 'Birthday' },
            { key: 'gender', label: 'Gender' },
            { key: 'status_information', label: 'Status Info' },
            { key: 'created_at', label: 'Created At' },
            { key: 'updated_at', label: 'Updated At' }
          ];
          
          // Create header row with Record 1, Record 2, etc.
          const headerRow = document.createElement("tr");
          
          // First cell is empty (corner cell)
          const cornerCell = document.createElement("th");
          cornerCell.textContent = "Field";
          cornerCell.style.backgroundColor = "#f4f4f4";
          cornerCell.style.position = "sticky";
          cornerCell.style.left = "0";
          cornerCell.style.zIndex = "2";
          headerRow.appendChild(cornerCell);
          
          // Add a column for each account
          accounts.forEach((account, index) => {
            const th = document.createElement("th");
            th.textContent = `Record ${index + 1}`;
            th.style.backgroundColor = "#f4f4f4";
            headerRow.appendChild(th);
          });
          
          tbody.appendChild(headerRow);
          
          // Create a row for each field
          fields.forEach((field) => {
            const row = document.createElement("tr");
            
            // First column is the field name
            const fieldNameCell = document.createElement("td");
            fieldNameCell.textContent = field.label;
            fieldNameCell.style.fontWeight = "bold";
            fieldNameCell.style.backgroundColor = "#f4f4f4";
            fieldNameCell.style.position = "sticky";
            fieldNameCell.style.left = "0";
            fieldNameCell.style.zIndex = "1";
            row.appendChild(fieldNameCell);
            
            // Add a cell for each account's field value
            accounts.forEach((account) => {
              const td = document.createElement("td");
              td.textContent = account[field.key] || '-';
              row.appendChild(td);
            });
            
            tbody.appendChild(row);
          });
          
          table.appendChild(tbody);
          
          // Add table to the admin content
          adminContent.appendChild(table);
        } else {
          adminContent.innerHTML = "<p>No data found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        adminContent.innerHTML = "<p>Error loading data. Please check console for details.</p>";
      });
  }

  // Load data when page loads
  loadData();

  // Add event listener for the clear data button
  if (clearDataBtn) {
    clearDataBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all data?")) {
        fetch("/api/accounts/info", {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            // Handle empty array response
            if (Array.isArray(data) && data.length === 0) {
              alert("All data has been deleted successfully");
            } else {
              alert(data.message || "Data deleted successfully");
            }
            // Reload the data to update the table
            loadData();
          })
          .catch((err) => {
            console.error("Error deleting data:", err);
            alert("Error deleting data. Please check console for details.");
          });
      }
    });
  }
});