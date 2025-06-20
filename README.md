
# 📄 Resume Screener AI

An AI-powered resume classification app built using **Streamlit**, **Scikit-learn**, and **TF-IDF** to intelligently classify resumes into job roles like *Backend Developer*, *Data Scientist*, *Frontend Developer*, etc.

Upload your resume (PDF) and get:
- 🔍 Predicted job role
- 📊 Confidence score
- 🛠️ Detected tech skills
- 🧠 Resume text preview

---

## 🚀 Demo

**Live App**: _[Coming soon — Deploy to Hugging Face or Render]_  
**Preview Screenshot**:

![Resume Screener UI](preview.png) <!-- Optional image -->

---

## 🧠 Tech Stack

| Component      | Technology                |
|----------------|---------------------------|
| Frontend       | Streamlit                 |
| ML Model       | Logistic Regression + TF-IDF |
| Text Extraction| PyMuPDF (fitz)            |
| Skills Parsing | Custom NLP + Keyword Match |
| Backend-ready  | Optional FastAPI Upgrade  |

---

## 📂 Project Structure

```

resume-screener/
├── prompt/                      # Resume prompts or templates (if any)
├── config.json                  # Config for roles, labels, keywords
├── app.py                       # Main Streamlit application
├── tfidf\_vectorizer.pkl         # Saved TF-IDF vectorizer
├── resume\_model.pkl             # Trained Logistic Regression model
├── requirements.txt             # Project dependencies
└── README.md

````

---

## 🛠️ How to Run Locally

```bash
# Step 1: Clone this repo
git clone https://github.com/simhadriuttareni/Resume-Screener.git
cd Resume-Screener

# Step 2: Install dependencies
pip install -r requirements.txt

# Step 3: Run the Streamlit app
streamlit run app.py
````

Then open [http://localhost:8501](http://localhost:8501) in your browser.

---

## 📊 Model Info

* Vectorizer: TF-IDF (3000 features)
* Classifier: Logistic Regression (sklearn)
* Precision: \~85% on synthetic data
* Skills extracted via keyword match (Java, Spring Boot, Docker, AWS, Python, etc.)

---

## 🔮 Future Enhancements

* ✅ Add resume improvement suggestions (LLM)
* ✅ Multi-label classification (fit for multiple roles)
* ✅ Integrate LinkedIn/GitHub parsing
* ✅ Store uploaded resumes in a database (MongoDB/PostgreSQL)
* ✅ Deploy to Hugging Face Spaces or Render

---

## 📄 License

MIT License — feel free to fork, use, and contribute!

---

## ✨ Author

**Simhadri Uttareni**
Java Backend Developer | ML & AI Enthusiast
🔗 [LinkedIn](https://www.linkedin.com/in/simhadri-uttareni) • [GitHub](https://github.com/simhadriuttareni)

