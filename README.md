# Mindset

Mindset is a simple, but meaningful way for people to express themselves.

### **1. Project Setup**
- Set up a basic **HTML** structure.
- Use **JavaScript** for handling form submission and interaction.
- Deploy **PocketBase** as the backend to store posts.

### **2. Backend: PocketBase Configuration**
1. Install PocketBase (`curl -fsSL https://pocketbase.io/install.sh | bash`).
2. Run it (`./pocketbase serve`).
3. Inside the PocketBase admin panel, create a **new collection** called `mindsets` with fields:
   - `description`: `text`
   - `mood`: `integer` (1-5)

### **3. Frontend: HTML & JavaScript**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mindset App</title>
</head>
<body>
    <h1>Post Your Mindset</h1>
    <form id="mindsetForm">
        <textarea id="description" placeholder="What's on your mind?" required></textarea>
        <label for="mood">Mood (1-5):</label>
        <input type="number" id="mood" min="1" max="5" required>
        <button type="submit">Submit</button>
    </form>
    <script>
        document.getElementById("mindsetForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const mindset = {
                description: document.getElementById("description").value,
                mood: document.getElementById("mood").value
            };
            
            try {
                const response = await fetch("http://localhost:8090/api/collections/mindsets/records", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(mindset)
                });
                
                if (response.ok) {
                    alert("Mindset posted successfully!");
                } else {
                    alert("Failed to post.");
                }
            } catch (error) {
                console.error(error);
            }
        });
    </script>
</body>
</html>
```

### **4. Running the App**
- Start PocketBase (`./pocketbase serve`).
- Open the HTML file in your browser.
- Submit your mindset and verify the entry in PocketBase.

---

### Future improvements:

- Add a feature to allow users to add images to their mindsets.
- Add a feature for sobriety tracking.
- Add integration for a buddy system.

