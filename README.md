# 🧠 Mindset  
A simple way to **track moods and thoughts** effortlessly.  

## 🚀 **Features**  
✅ **Write down your thoughts** anytime  
✅ **Log your moods** with simple entries  
✅ **View trends** through charts & analytics  
✅ **Fully self-hosted**—just run & use  

---

## 🛠 **How to Get Started**  

### 1️⃣ **Clone & Run**  
```bash
git clone https://github.com/petrusjohannesmaas/mindset.git
cd mindset
docker-compose up -d
```
Then, open **`http://localhost:3000`** in your browser and create your private account. **That's it!**  

---

## 📦 **Dockerized Setup (Behind the Scenes)**  
Everything is handled inside a **Docker container** with **SQLite for data storage**.  

### **Docker Compose Configuration (`docker-compose.yml`)**  
```yaml
---
services:
  mindset:
    build: .
    container_name: mindset_container
    ports:
      - "3000:3000"
    volumes:
      - ./database:/app/database  # Persist entries
    restart: unless-stopped
```
**No extra setup needed—users just run the command, access the browser, and start recording their mindset.**  

---

## 📊 **How It Works**  
- **All entries are saved** securely inside a local SQLite database.
- **Data persists** even if the container restarts.
- **Charting & reporting** shows mood trends over time.

---

## 🎯 **Future Improvements**  
🔹 More detailed mood insights  
🔹 Buddy system integration  
🔹 Custom themes & UI enhancements
🔹 Sobriety, mental health, physical health programs  

---

## 📜 **License**  
GNU General Public License v3.0  
See [LICENSE](./LICENSE)  

---