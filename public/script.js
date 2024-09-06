const form = document.querySelector(".itemForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = document.getElementById("itemName").value;
  const description = document.getElementById("description").value;
  const method = document.getElementById("method").value;

  if (method === "POST") {
    fetch("/api/items", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName, description }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create item");
        }
      })
      .then((data) => {
        console.log(data);
        // Display the created item
        const itemsContainer = document.querySelector(".itemsContainer");
        const itemElement = document.createElement("div");
        itemElement.setAttribute("class", "itemsContainer");

        itemElement.textContent = `ID: ${data.id} | Name: ${data.itemName} | Desc: ${data.description}`;
        itemsContainer.appendChild(itemElement);
      })
      .catch((error) => console.error("Error:", error));
  } else if (method === "GET") {
    let url = "/api/items";
    if (itemName !== "") {
      url += `?itemName=${itemName}`;
    }
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve items");
        }
      })
      .then((data) => {
        console.log(data);
        // Display the retrieved items
        const itemsContainer = document.querySelector(".itemsContainer");
        itemsContainer.innerHTML = ""; // Clear existing items
        data.forEach((item) => {
          const itemElement = document.createElement("div");
          itemElement.setAttribute("class", "itemsContainer");
          itemElement.textContent = `ID: ${item.id} | Name: ${item.itemName} | Desc: ${item.description}`;
          itemsContainer.appendChild(itemElement);
        });
      })
      .catch((error) => console.error("Error:", error));
  } else if (method === "DELETE") {
    if (itemName !== "") {
      fetch(`/api/items/${itemName}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Remove the item from the page
            const itemsContainer = document.querySelector(".itemsContainer");
            const itemElement = document.querySelector(
              `.itemsContainer:contains(${itemName})`
            );   

            if (itemElement) {
              itemsContainer.removeChild(itemElement);
            }
          } else {
            throw new Error("Failed to delete item");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("Please specify an item name to delete");
    }
  }
});
