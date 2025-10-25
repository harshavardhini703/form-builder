// Form Builder Application - Phase 1 (HTML, CSS, JavaScript)
document.addEventListener('DOMContentLoaded', function() {
    const formArea = document.getElementById('formArea');
    const formPreview = document.getElementById('formPreview');
    const emptyState = document.getElementById('emptyState');
    const savedFormsList = document.getElementById('savedFormsList');
    const fieldTypes = document.querySelectorAll('.field-type');
    const saveFormBtn = document.getElementById('saveForm');
    const resetFormBtn = document.getElementById('resetForm');
    const testFormBtn = document.getElementById('testForm');
    
    let formFields = [];
    let fieldCounter = 0;
    let selectedField = null;
    
    // Initialize from localStorage
    loadSavedForms();
    
    // Make field types draggable
    fieldTypes.forEach(fieldType => {
        fieldType.setAttribute('draggable', 'true');
        
        fieldType.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', fieldType.dataset.type);
            e.dataTransfer.effectAllowed = 'copy';
        });
    });
    
    // Allow dropping in form area
    formArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        formArea.classList.add('drag-over');
    });
    
    formArea.addEventListener('dragleave', function() {
        formArea.classList.remove('drag-over');
    });
    
    formArea.addEventListener('drop', function(e) {
        e.preventDefault();
        formArea.classList.remove('drag-over');
        
        const fieldType = e.dataTransfer.getData('text/plain');
        addFieldToForm(fieldType);
    });
    
    // Add field to form
    function addFieldToForm(type) {
        fieldCounter++;
        const fieldId = `field-${fieldCounter}`;
        
        // Create form field element
        const fieldElement = document.createElement('div');
        fieldElement.className = 'form-field';
        fieldElement.id = fieldId;
        
        // Generate field HTML based on type
        let fieldHTML = '';
        let previewHTML = '';
        
        switch(type) {
            case 'text':
                fieldHTML = `
                    <label>Text Field</label>
                    <input type="text" class="form-control" placeholder="Enter text">
                `;
                previewHTML = `
                    <div class="form-group">
                        <label for="${fieldId}">Text Field</label>
                        <input type="text" class="form-control" id="${fieldId}" name="${fieldId}" placeholder="Enter text">
                    </div>
                `;
                break;
            case 'email':
                fieldHTML = `
                    <label>Email Field</label>
                    <input type="email" class="form-control" placeholder="Enter email">
                `;
                previewHTML = `
                    <div class="form-group">
                        <label for="${fieldId}">Email Field</label>
                        <input type="email" class="form-control" id="${fieldId}" name="${fieldId}" placeholder="Enter email">
                    </div>
                `;
                break;
            case 'number':
                fieldHTML = `
                    <label>Number Field</label>
                    <input type="number" class="form-control" placeholder="Enter number">
                `;
                previewHTML = `
                    <div class="form-group">
                        <label for="${fieldId}">Number Field</label>
                        <input type="number" class="form-control" id="${fieldId}" name="${fieldId}" placeholder="Enter number">
                    </div>
                `;
                break;
            case 'textarea':
                fieldHTML = `
                    <label>Text Area</label>
                    <textarea class="form-control" rows="3" placeholder="Enter text"></textarea>
                `;
                previewHTML = `
                    <div class="form-group">
                        <label for="${fieldId}">Text Area</label>
                        <textarea class="form-control" id="${fieldId}" name="${fieldId}" rows="3" placeholder="Enter text"></textarea>
                    </div>
                `;
                break;
            case 'select':
                fieldHTML = `
                    <label>Dropdown</label>
                    <select class="form-control">
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                `;
                previewHTML = `
                    <div class="form-group">
                        <label for="${fieldId}">Dropdown</label>
                        <select class="form-control" id="${fieldId}" name="${fieldId}">
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                    </div>
                `;
                break;
            case 'checkbox':
                fieldHTML = `
                    <label>Checkbox Group</label>
                    <div class="form-check">
                        <input type="checkbox" id="${fieldId}-check1">
                        <label for="${fieldId}-check1">Option 1</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id="${fieldId}-check2">
                        <label for="${fieldId}-check2">Option 2</label>
                    </div>
                `;
                previewHTML = `
                    <div class="form-group">
                        <label>Checkbox Group</label>
                        <div class="form-check">
                            <input type="checkbox" id="${fieldId}-1" name="${fieldId}[]" value="option1">
                            <label for="${fieldId}-1">Option 1</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" id="${fieldId}-2" name="${fieldId}[]" value="option2">
                            <label for="${fieldId}-2">Option 2</label>
                        </div>
                    </div>
                `;
                break;
            case 'radio':
                fieldHTML = `
                    <label>Radio Buttons</label>
                    <div class="form-check">
                        <input type="radio" id="${fieldId}-radio1" name="${fieldId}-radioGroup">
                        <label for="${fieldId}-radio1">Option 1</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" id="${fieldId}-radio2" name="${fieldId}-radioGroup">
                        <label for="${fieldId}-radio2">Option 2</label>
                    </div>
                `;
                previewHTML = `
                    <div class="form-group">
                        <label>Radio Buttons</label>
                        <div class="form-check">
                            <input type="radio" id="${fieldId}-1" name="${fieldId}" value="option1">
                            <label for="${fieldId}-1">Option 1</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" id="${fieldId}-2" name="${fieldId}" value="option2">
                            <label for="${fieldId}-2">Option 2</label>
                        </div>
                    </div>
                `;
                break;
            case 'date':
                fieldHTML = `
                    <label>Date Picker</label>
                    <input type="date" class="form-control">
                `;
                previewHTML = `
                    <div class="form-group">
                        <label for="${fieldId}">Date Picker</label>
                        <input type="date" class="form-control" id="${fieldId}" name="${fieldId}">
                    </div>
                `;
                break;
        }
        
        // Add field actions (edit, delete)
        fieldHTML += `
            <div class="field-actions">
                <button class="btn btn-primary edit-field" data-field="${fieldId}">Edit</button>
                <button class="btn btn-danger delete-field" data-field="${fieldId}">Delete</button>
            </div>
        `;
        
        fieldElement.innerHTML = fieldHTML;
        
        // Add to form area
        if (emptyState) {
            emptyState.classList.add('hidden');
        }
        formArea.appendChild(fieldElement);
        
        // Add to form preview
        const previewElement = document.createElement('div');
        previewElement.innerHTML = previewHTML;
        
        // Clear empty state in preview if it exists
        const previewEmptyState = formPreview.querySelector('.empty-state');
        if (previewEmptyState) {
            previewEmptyState.remove();
        }
        formPreview.appendChild(previewElement);
        
        // Store field data
        formFields.push({
            id: fieldId,
            type: type,
            label: type.charAt(0).toUpperCase() + type.slice(1) + ' Field',
            placeholder: '',
            required: false,
            options: type === 'select' || type === 'checkbox' || type === 'radio' ? 
                ['Option 1', 'Option 2'] : []
        });
        
        // Add event listeners for field actions
        addFieldEventListeners(fieldId);
        
        // Select the new field
        selectField(fieldId);
    }
    
    // Add event listeners for field actions
    function addFieldEventListeners(fieldId) {
        const deleteBtn = document.querySelector(`.delete-field[data-field="${fieldId}"]`);
        const editBtn = document.querySelector(`.edit-field[data-field="${fieldId}"]`);
        const fieldElement = document.getElementById(fieldId);
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                deleteField(fieldId);
            });
        }
        
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                editField(fieldId);
            });
        }
        
        if (fieldElement) {
            fieldElement.addEventListener('click', function(e) {
                if (!e.target.classList.contains('btn')) {
                    selectField(fieldId);
                }
            });
        }
    }
    
    // Select field
    function selectField(fieldId) {
        // Remove selected class from all fields
        document.querySelectorAll('.form-field').forEach(field => {
            field.classList.remove('selected');
        });
        
        // Add selected class to clicked field
        const fieldElement = document.getElementById(fieldId);
        if (fieldElement) {
            fieldElement.classList.add('selected');
            selectedField = fieldId;
        }
    }
    
    // Delete field from form
    function deleteField(fieldId) {
        // Remove from form area
        const fieldElement = document.getElementById(fieldId);
        if (fieldElement) {
            fieldElement.remove();
        }
        
        // Remove from form preview
        const previewField = formPreview.querySelector(`[id="${fieldId}"], [name="${fieldId}"], [name="${fieldId}[]"]`);
        if (previewField) {
            previewField.closest('.form-group').remove();
        }
        
        // Remove from form fields array
        formFields = formFields.filter(field => field.id !== fieldId);
        
        // Clear selection
        selectedField = null;
        
        // Show empty state if no fields
        if (formFields.length === 0) {
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            formPreview.innerHTML = '<div class="empty-state"><p>Your form will appear here</p></div>';
        }
    }
    
    // Edit field
    function editField(fieldId) {
        const field = formFields.find(f => f.id === fieldId);
        if (!field) return;
        
        const newLabel = prompt('Enter field label:', field.label);
        if (newLabel !== null) {
            field.label = newLabel;
            
            // Update form builder view
            const fieldElement = document.getElementById(fieldId);
            if (fieldElement) {
                const labelElement = fieldElement.querySelector('label');
                if (labelElement) {
                    labelElement.textContent = newLabel;
                }
            }
            
            // Update form preview
            const previewGroup = formPreview.querySelector(`[id="${fieldId}"], [name="${fieldId}"], [name="${fieldId}[]"]`)?.closest('.form-group');
            if (previewGroup) {
                const previewLabel = previewGroup.querySelector('label');
                if (previewLabel) {
                    previewLabel.textContent = newLabel;
                }
            }
        }
    }
    
    // Save form
    saveFormBtn.addEventListener('click', function() {
        if (formFields.length === 0) {
            alert('Please add at least one field to your form before saving.');
            return;
        }
        
        const formName = prompt('Enter a name for your form:', 'My Custom Form');
        if (!formName) return;
        
        const formData = {
            id: 'form-' + Date.now(),
            name: formName,
            fields: formFields,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        const savedForms = JSON.parse(localStorage.getItem('formBuilderForms') || '[]');
        savedForms.push(formData);
        localStorage.setItem('formBuilderForms', JSON.stringify(savedForms));
        
        alert(`Form "${formName}" saved successfully!`);
        loadSavedForms();
    });
    
    // Reset form
    resetFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All fields will be deleted.')) {
            // Clear form area
            formArea.innerHTML = '';
            formArea.appendChild(emptyState);
            emptyState.classList.remove('hidden');
            
            // Clear form preview
            formPreview.innerHTML = '<div class="empty-state"><p>Your form will appear here</p></div>';
            
            // Reset form fields array
            formFields = [];
            selectedField = null;
        }
    });
    
    // Test form
    testFormBtn.addEventListener('click', function() {
        if (formFields.length === 0) {
            alert('Please add at least one field to your form before testing.');
            return;
        }
        
        // Collect form data
        const formData = {};
        formFields.forEach(field => {
            const input = formPreview.querySelector(`[name="${field.id}"], [name="${field.id}[]"]`);
            if (input) {
                if (field.type === 'checkbox') {
                    const checkboxes = formPreview.querySelectorAll(`[name="${field.id}[]"]:checked`);
                    formData[field.id] = Array.from(checkboxes).map(cb => cb.value);
                } else if (field.type === 'radio') {
                    const radio = formPreview.querySelector(`[name="${field.id}"]:checked`);
                    formData[field.id] = radio ? radio.value : null;
                } else {
                    formData[field.id] = input.value;
                }
            }
        });
        
        alert('Form submitted with data:\n' + JSON.stringify(formData, null, 2));
    });
    
    // Load saved forms
    function loadSavedForms() {
        const savedForms = JSON.parse(localStorage.getItem('formBuilderForms') || '[]');
        const savedFormsList = document.getElementById('savedFormsList');
        
        if (savedForms.length === 0) {
            savedFormsList.innerHTML = '<div class="empty-state"><p>No forms saved yet</p></div>';
            return;
        }
        
        savedFormsList.innerHTML = '';
        savedForms.forEach(form => {
            const formItem = document.createElement('div');
            formItem.className = 'saved-form-item';
            formItem.innerHTML = `
                <div>
                    <strong>${form.name}</strong>
                    <div style="font-size: 12px; color: #666;">
                        ${form.fields.length} fields • ${new Date(form.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div>
                    <button class="btn btn-primary load-form" data-form-id="${form.id}">Load</button>
                    <button class="btn btn-danger delete-saved-form" data-form-id="${form.id}">Delete</button>
                </div>
            `;
            savedFormsList.appendChild(formItem);
        });
        
        // Add event listeners for saved form actions
        document.querySelectorAll('.load-form').forEach(btn => {
            btn.addEventListener('click', function() {
                loadForm(this.dataset.formId);
            });
        });
        
        document.querySelectorAll('.delete-saved-form').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteSavedForm(this.dataset.formId);
            });
        });
    }
    
    // Load form from storage
    function loadForm(formId) {
        const savedForms = JSON.parse(localStorage.getItem('formBuilderForms') || '[]');
        const form = savedForms.find(f => f.id === formId);
        
        if (!form) {
            alert('Form not found!');
            return;
        }
        
        // Reset current form
        formArea.innerHTML = '';
        formPreview.innerHTML = '';
        formFields = [];
        
        // Load form fields
        form.fields.forEach(fieldData => {
            addFieldToForm(fieldData.type);
            
            // Update the last added field with saved data
            const lastField = formFields[formFields.length - 1];
            if (lastField) {
                Object.assign(lastField, fieldData);
                
                // Update UI
                const fieldElement = document.getElementById(lastField.id);
                if (fieldElement) {
                    const labelElement = fieldElement.querySelector('label');
                    if (labelElement) {
                        labelElement.textContent = fieldData.label;
                    }
                }
                
                const previewGroup = formPreview.querySelector(`[id="${lastField.id}"], [name="${lastField.id}"], [name="${lastField.id}[]"]`)?.closest('.form-group');
                if (previewGroup) {
                    const previewLabel = previewGroup.querySelector('label');
                    if (previewLabel) {
                        previewLabel.textContent = fieldData.label;
                    }
                }
            }
        });
        
        // Update form title
        const formTitle = document.querySelector('.form-title h3');
        if (formTitle) {
            formTitle.textContent = form.name;
        }
        
        alert(`Form "${form.name}" loaded successfully!`);
    }
    
    // Delete saved form
    function deleteSavedForm(formId) {
        if (confirm('Are you sure you want to delete this saved form?')) {
            const savedForms = JSON.parse(localStorage.getItem('formBuilderForms') || '[]');
            const updatedForms = savedForms.filter(f => f.id !== formId);
            localStorage.setItem('formBuilderForms', JSON.stringify(updatedForms));
            loadSavedForms();
        }
    }
});
