import TourDuLich from "./TourDuLich.js"

let tours = []
let deletedTourIds = []
let isLoading = false

function formatPrice(price) {
    return `${Number(price).toLocaleString("vi-VN")} VNĐ`
}

function unixToDateInput(unix) {
    if (!unix) return ""
    const date = new Date(Number(unix) * 1000)
    if (Number.isNaN(date.getTime())) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

function dateInputToUnix(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number)
    return Math.floor(new Date(year, month - 1, day).getTime() / 1000)
}

function formatDate(unix) {
    const date = new Date(Number(unix) * 1000)
    if (Number.isNaN(date.getTime())) return ""
    return date.toLocaleDateString("vi-VN")
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

function createTourElement(tour, isEditing = false) {
    const div = document.createElement("div")
    div.className = "tour-item"
    div.setAttribute("data-tour-id", tour.id)

    if (isEditing) {
        div.innerHTML = `
            <div class="edit-form">
                <input type="text" class="edit-name" value="${escapeHtml(tour.name)}" required>
                <input type="text" class="edit-image" value="${escapeHtml(tour.image_url)}" required>
                <input type="text" class="edit-description" value="${escapeHtml(tour.description)}" required>
                <label class="date-field">
                    Start date
                    <input type="date" class="edit-start-date" value="${unixToDateInput(tour.start_date)}" required>
                </label>
                <label class="date-field">
                    End date
                    <input type="date" class="edit-end-date" value="${unixToDateInput(tour.end_date)}" required>
                </label>
                <input type="number" class="edit-price" value="${escapeHtml(tour.price)}" step="0.01" required>
                <div class="edit-form-buttons">
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn" type="button">Cancel</button>
                </div>
            </div>
        `
    } else {
        div.innerHTML = `
            <div class="card-actions">
                <button class="update-button" data-tour-id="${tour.id}">Edit</button>
                <input type="checkbox" class="delete-checkbox" data-tour-id="${tour.id}">
            </div>
            <img src="${escapeHtml(tour.image_url)}" alt="${escapeHtml(tour.name)}">
            <div class="tour-info">
                <h2>${escapeHtml(tour.name)}</h2>
                <p class="tour-description">${escapeHtml(tour.description)}</p>
                <p class="tour-dates">${formatDate(tour.start_date)} - ${formatDate(tour.end_date)}</p>
                <p class="price">${formatPrice(tour.price)}</p>
                <button class="book-btn" type="button">Đặt Tour</button>
            </div>
        `
    }

    return div
}

function renderTours() {
    const tourList = document.getElementById("tour-list")
    tourList.innerHTML = ""
    tours.forEach(tour => {
        const tourElement = createTourElement(tour)
        tourList.appendChild(tourElement)
        attachTourEventListeners(tourElement, tour)
    })
}

function attachTourEventListeners(element, tour) {
    const checkbox = element.querySelector(".delete-checkbox")
    checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
            deletedTourIds.push(tour.id)
        } else {
            deletedTourIds = deletedTourIds.filter(id => id !== tour.id)
        }
        updateDeleteButton()
    })

    const updateBtn = element.querySelector(".update-button")
    updateBtn.addEventListener("click", () => {
        enterEditMode(element, tour)
    })

    const bookBtn = element.querySelector(".book-btn")
    bookBtn.addEventListener("click", () => {
        alert(`Tour "${tour.name}" was booked successfully`)
    })
}

function enterEditMode(element, tour) {
    const editElement = createTourElement(tour, true)
    element.replaceWith(editElement)

    const saveBtn = editElement.querySelector(".save-btn")
    const cancelBtn = editElement.querySelector(".cancel-btn")

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault()

        const name = editElement.querySelector(".edit-name").value.trim()
        const image_url = editElement.querySelector(".edit-image").value.trim()
        const description = editElement.querySelector(".edit-description").value.trim()
        const startDateValue = editElement.querySelector(".edit-start-date").value
        const endDateValue = editElement.querySelector(".edit-end-date").value
        const price = editElement.querySelector(".edit-price").value

        if (!name || !image_url || !description || !startDateValue || !endDateValue || !price) {
            alert("All fields are required")
            return
        }

        const previous = {
            name: tour.name,
            image_url: tour.image_url,
            description: tour.description,
            start_date: tour.start_date,
            end_date: tour.end_date,
            price: tour.price,
        }

        tour.name = name
        tour.image_url = image_url
        tour.description = description
        tour.start_date = dateInputToUnix(startDateValue)
        tour.end_date = dateInputToUnix(endDateValue)
        tour.price = price

        saveBtn.disabled = true
        saveBtn.textContent = "Saving..."

        tour.update()
            .then(updatedTour => {
                const index = tours.findIndex(item => item.id === updatedTour.id)
                if (index !== -1) {
                    tours[index] = updatedTour
                }

                const updatedElement = createTourElement(updatedTour)
                editElement.replaceWith(updatedElement)
                attachTourEventListeners(updatedElement, updatedTour)
            })
            .catch(error => {
                Object.assign(tour, previous)
                console.error("Error updating tour:", error)
                alert("Failed to update tour")
                saveBtn.disabled = false
                saveBtn.textContent = "Save"
            })
    })

    cancelBtn.addEventListener("click", () => {
        const tourElement = createTourElement(tour)
        editElement.replaceWith(tourElement)
        attachTourEventListeners(tourElement, tour)
    })
}

function updateDeleteButton() {
    const deleteBtn = document.getElementById("delete-btn")
    const count = deletedTourIds.length
    deleteBtn.textContent = `Delete ${count} item${count !== 1 ? "s" : ""}`
    deleteBtn.disabled = count === 0
}

function handleBulkDelete() {
    if (deletedTourIds.length === 0) return

    const confirmed = confirm(`Are you sure you want to delete ${deletedTourIds.length} item(s)?`)
    if (!confirmed) return

    isLoading = true
    disableAllButtons()

    const failedIds = []
    const idsToDelete = [...deletedTourIds]
    const deletePromises = []

    idsToDelete.forEach(id => {
        const tour = tours.find(item => item.id === id)
        if (!tour) return

        const promise = tour.delete()
            .then(deletedTour => {
                const element = document.querySelector(`[data-tour-id="${deletedTour.id}"]`)
                if (element) {
                    element.remove()
                }
                tours = tours.filter(item => item.id !== deletedTour.id)
            })
            .catch(error => {
                console.error(`Error deleting tour ${id}:`, error)
                failedIds.push(id)
            })

        deletePromises.push(promise)
    })

    Promise.all(deletePromises)
        .then(() => {
            isLoading = false
            enableAllButtons()
            deletedTourIds = []
            updateDeleteButton()

            if (failedIds.length > 0) {
                alert(`Failed to delete items: ${failedIds.join(", ")}`)
            } else {
                alert("All items deleted successfully!")
            }
        })
}

function handleAddTour(e) {
    e.preventDefault()

    const name = document.getElementById("add-name").value.trim()
    const image_url = document.getElementById("add-image").value.trim()
    const description = document.getElementById("add-description").value.trim()
    const startDateValue = document.getElementById("add-start-date").value
    const endDateValue = document.getElementById("add-end-date").value
    const price = document.getElementById("add-price").value

    if (!name || !image_url || !description || !startDateValue || !endDateValue || !price) {
        alert("All fields are required")
        return
    }

    const tourData = {
        name,
        image_url,
        description,
        start_date: dateInputToUnix(startDateValue),
        end_date: dateInputToUnix(endDateValue),
        price,
    }

    isLoading = true
    disableAllButtons()

    TourDuLich.add(tourData)
        .then(addedTour => {
            tours.push(addedTour)
            const tourList = document.getElementById("tour-list")
            const tourElement = createTourElement(addedTour)
            tourList.appendChild(tourElement)
            attachTourEventListeners(tourElement, addedTour)

            document.getElementById("add-form").reset()
            alert("Tour added successfully!")
        })
        .catch(error => {
            console.error("Error adding tour:", error)
            alert("Failed to add tour")
        })
        .finally(() => {
            isLoading = false
            enableAllButtons()
        })
}

function disableAllButtons() {
    document.getElementById("add-btn").disabled = true
    document.getElementById("delete-btn").disabled = true
    document.querySelectorAll(".update-button").forEach(btn => btn.disabled = true)
    document.querySelectorAll(".book-btn").forEach(btn => btn.disabled = true)
}

function enableAllButtons() {
    document.getElementById("add-btn").disabled = false
    document.getElementById("delete-btn").disabled = deletedTourIds.length === 0
    document.querySelectorAll(".update-button").forEach(btn => btn.disabled = false)
    document.querySelectorAll(".book-btn").forEach(btn => btn.disabled = false)
}

document.addEventListener("DOMContentLoaded", () => {
    TourDuLich.fetchAll()
        .then(data => {
            tours = data
            renderTours()
        })
        .catch(error => {
            console.error("Error fetching tours:", error)
            alert("Failed to load tours")
        })

    document.getElementById("add-form").addEventListener("submit", handleAddTour)
    document.getElementById("delete-btn").addEventListener("click", handleBulkDelete)
})
