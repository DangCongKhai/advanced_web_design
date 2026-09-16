const ENDPOINT = "https://6aa950f62d442cb69d49aba1.mockapi.io/tour"

const JSON_HEADERS = {
    "Content-Type": "application/json",
}

class TourDuLich {
    constructor({ id, name, description, start_date, end_date, price, image_url }) {
        this.id = id
        this.name = name
        this.description = description
        this.start_date = start_date
        this.end_date = end_date
        this.price = price
        this.image_url = image_url
    }

    toPayload() {
        return {
            name: this.name,
            description: this.description,
            start_date: this.start_date,
            end_date: this.end_date,
            price: this.price,
            image_url: this.image_url,
        }
    }

    static fetchAll() {
        return new Promise((resolve, reject) => {
            fetch(ENDPOINT)
                .then(response => response.json())
                .then(data => resolve(data.map(item => new TourDuLich(item))))
                .catch(error => reject(error))
        })
    }

    static add(tourData) {
        return new Promise((resolve, reject) => {
            fetch(ENDPOINT, {
                method: "POST",
                body: JSON.stringify(tourData),
                headers: JSON_HEADERS,
            })
                .then(response => response.json())
                .then(data => resolve(new TourDuLich(data)))
                .catch(error => reject(error))
        })
    }

    update() {
        return new Promise((resolve, reject) => {
            fetch(`${ENDPOINT}/${this.id}`, {
                method: "PUT",
                body: JSON.stringify(this.toPayload()),
                headers: JSON_HEADERS,
            })
                .then(response => response.json())
                .then(data => {
                    Object.assign(this, data)
                    resolve(this)
                })
                .catch(error => reject(error))
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            fetch(`${ENDPOINT}/${this.id}`, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(data => resolve(new TourDuLich(data)))
                .catch(error => reject(error))
        })
    }
}

export default TourDuLich
