let hotels = JSON.parse(localStorage.getItem("hotels")) || [];

const hotelForm = document.getElementById("hotelForm"); 
const hotelList = document.getElementById("hotelList");

hotelForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("hotelName").value.trim();
    const image = document.getElementById("hotelImage").value.trim();
    const rating = document.getElementById("hotelRating").value;
    const comment = document.getElementById("hotelComment").value.trim();
    
    if (!name || !image || !rating || !comment) {
        alert("⚠️ Fill in all fields first!");
        return;
    }

    const hotel = {
        name,
        image,
        rating,
        comment
    }

    hotels.push(hotel);
    localStorage.setItem("hotels", JSON.stringify(hotels));
    hotelForm.reset();
    displayHotels(hotels);
});

function removeHotel(index) {
    if (confirm("Remove this hotel review?")) {
        hotels.splice(index, 1); 
        localStorage.setItem("hotels", JSON.stringify(hotels)); 
        displayHotels(hotels); 
    }
}

function displayHotels(data) {
    hotelList.innerHTML = ""; 
    data.forEach((hotel, index) => {
        let div = document.createElement("div");
        div.className = "hotel-card";
        div.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}" onerror="this.src='placeholder.jpg'" />
            <h3>${hotel.name}</h3>
            <p><strong>Rating:</strong> ${'★'.repeat(hotel.rating)}</p>
            <p><strong>Review:</strong> ${hotel.comment}</p>
            <button onclick="removeHotel(${index})">Remove</button>
        `;
        hotelList.appendChild(div);
    });
}

displayHotels(hotels);

