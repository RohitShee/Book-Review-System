# 📚 PlotPoint

A modern web platform for discovering, rating, and reviewing books. Users can view details of books, leave reviews, and manage personalized reading experiences.

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/RohitShee/Book-Review-System
   cd Book-Review-System
   ```  
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Replace The sample env variables with Your systems env variables**
4. **Open a terminal and split it into two**
5. **Run backend**
   ```bash
   cd backend
   npm run dev
   ```
6. **Run Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
## Architecture Decissions
 1. **MongoDB was chosen for its schema flexibility, high performance, and scalability.**
 2. **User, Book, and Review are core models designed to support modular features like authentication and user-generated content.**
 3. **Zustand is used for lightweight, scalable state management without boilerplate.**
 4. **Pagination slices filtered results using page and limit values managed via Zustand state.**
## Limitation
 1. **No role based access so any user can add Books**
