const API_URL = 'http://localhost:3000/api/timetable';

const form = document.getElementById('timetable-form');
const recordIdInput = document.getElementById('record-id');
const courseCodeInput = document.getElementById('course_code');
const courseNameInput = document.getElementById('course_name');
const tableBody = document.getElementById('timetable-table-body');
const submitBtn = document.getElementById('submit-btn');

// Fetch and display all records on page load
async function fetchRecords() {
    try {
        const response = await fetch(API_URL);
        const records = await response.json();
        
        tableBody.innerHTML = '';
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.course_code}</td>
                <td>${record.course_name || ''}</td>
                <td>
                    <button onclick="editRecord(${record.id}, '${record.course_code}', '${record.course_name || ''}')">Edit</button>
                    <button onclick="deleteRecord(${record.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching records:', error);
    }
}

// Handle Form Submission (Create or Update)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = recordIdInput.value;
    const data = {
        course_code: courseCodeInput.value,
        course_name: courseNameInput.value
    };

    try {
        if (id) {
            // Update (PUT)
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Create (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        // Reset form and refresh table list
        form.reset();
        recordIdInput.value = '';
        submitBtn.textContent = 'Add Record';
        fetchRecords();
    } catch (error) {
        console.error('Error saving record:', error);
    }
});

// Load values into form for editing
window.editRecord = function(id, code, name) {
    recordIdInput.value = id;
    courseCodeInput.value = code;
    courseNameInput.value = name;
    submitBtn.textContent = 'Update Record';
};

// Delete record (DELETE)
window.deleteRecord = async function(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }
};

// Initial load
fetchRecords();