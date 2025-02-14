# 🚀 **Stock Lens Backend (Express & MongoDB)**  

Bu proje, **finansal işlem takibi** için geliştirilmiş bir **RESTful API**'dir. **Kullanıcıların alış ve satış işlemlerini yönetmesine, yapay zeka destekli analizleri saklamasına ve detaylı filtrelemeler ile raporlamalar yapmasına olanak tanır.**  

## 📌 **Özellikler**  
✅ **JWT Kimlik Doğrulama** (Kullanıcı seviyesinde erişim kontrolü)  
✅ **MongoDB & Mongoose ile Veri Yönetimi**  
✅ **Bcrypt ile Şifre Hashleme** (Kullanıcı şifreleri güvenli bir şekilde saklanır)  
✅ **Filtreleme & Arama Desteği** (Tarih, fiyat, ürün ismi ve işlem türüne göre filtreleme)  
✅ **Dinamik API Yanıtları & Hata Yönetimi**  

---

## 🔧 **Kurulum & Çalıştırma**  

### **1️⃣ Gerekli Bağımlılıkları Yükle**  
```sh
npm install
```

### **2️⃣ Çevre Değişkenlerini (Environment Variables) Ayarla**  
📂 **.env** dosyasını oluştur ve şu içerikleri ekle:  
```ini
MONGO_URI=mongodb://127.0.0.1:27017/transaction_db
JWT_SECRET=your_secret_key
PORT=5000
```

### **3️⃣ MongoDB'yi Çalıştır & Sunucuyu Başlat**  
```sh
npm start
```

---

## 🛠 **Kullanılan Teknolojiler**  
| Teknoloji  | Açıklama |
|------------|-------------|
| **Node.js & Express.js** | Backend frameworkü |
| **MongoDB & Mongoose** | NoSQL veritabanı ve ORM |
| **JWT (jsonwebtoken)** | Kullanıcı kimlik doğrulama |
| **Bcrypt.js** | Şifre güvenliği için hashleme |
| **Multer** | Dosya yükleme işlemleri |
| **dotenv** | Çevresel değişken yönetimi |

---

## 🔥 **API Kullanımı**  

### 🎯 **1️⃣ Kullanıcı Kayıt**
```http
POST /v1/auth/register
```
#### 📌 **JSON İçeriği**  
```json
{
  "email": "testuser",  
  "password": "securepassword"
}
```
#### ✅ **Başarılı Yanıt**  
```json
{
    "done": true,
    "data": {
        "message": "User registered successfully"
    }
}
```

---

### 🎯 **2️⃣ Kullanıcı Girişi**
```http
POST /v1/auth/login
```
#### 📌 **JSON İçeriği**  
```json
{
  "email": "testuser",  
  "password": "securepassword"
}
```
#### ✅ **Başarılı Yanıt (JWT Token ile)**
```json
{
    "done": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhZmIxY2I0NzNjMjFjNmNkNWI0NjllIn0sInVzZXJJc0N1dGUiOiJJZiBzZWUgdGhpcywgeWVzIGl0IGlzIPCfpKoiLCJpYXQiOjE3Mzk1NjgxMjcsImV4cCI6MTczOTY1NDUyN30.Mrd7GKY0BwcX-c_zxSh-MXxJ_uYf831uBviIxSvugTU",
        "user": {
            "id": "67afb1cb473c21c6cd5b469e"
        }
    }
}
```
📌 **💡 Tüm diğer endpointlerde Authorization Header ile JWT Token göndermelisin.**  
```http
Authorization: your.jwt.token.here
```

---

### 🎯 **3️⃣ Yeni İşlem Oluştur (Create Transaction)**
```http
POST /v1/transaction/new
```
#### 📌 **JSON İçeriği**
```json
{
  "date": "2024-06-01T12:00:00Z",  
  "transactionType": "purchase",  
  "productName": "ZBJ",  
  "amount": 2,  
  "price": 1500.50  
}
```
#### ✅ **Başarılı Yanıt**
```json
{
    "done": true,
    "data": {
        "transaction": {
            "userId": "67afb1cb473c21c6cd5b469e",
            "transactionType": "PURCHASE",
            "productName": "UNKNOWN",
            "productShortenedName": "ZBJ",
            "amount": 3,
            "price": 15.456,
            "totalTransactionFee": 46.367999999999995,
            "documentAnalyzedByAI": false,
            "extraFee": 0,
            "_id": "67afc973ef35cd4f438e78ec"
        }
    }
}
```
---

### 🎯 **5️⃣ İşlemi ID’ye Göre Getirme**
```http
GET /v1/transaction/:id
```

---

## 🛡️ **Hata Dönüşleri & Validasyon Mesajları**
### 🚨 **1️⃣ Kullanıcı yanlış giriş yaptığında**
```json
{
    "done": false,
    "data": {
        "en": "Invalid Credentials",
        "tr": "Geçersiz Kimlik Bilgileri"
    }
}
```

### 🚨 **2️⃣ Olmayan bir işlem ID’si ile işlem yapmak istersen**
```json
{
    "done": false,
    "data": "Cast to ObjectId failed for value \"67afcae83f8310d971e1061s\" (type string) at path \"_id\" for model \"transactions\""
}
```

### 🚨 **3️⃣ Yetkisiz erişim (Başkasının işlemini silmeye çalışırsan)**
```json
{
    "done": false,
    "data": {
        "en": "Unauthorized Action",
        "tr": "Yetkisiz İşlem"
    }
}
```

---

## 🏗 **Proje Yapılandırması**
```
📂 backend  
 ┣ 📂 enums                  # 📌 Enum sabitleri (Hata ve işlem türleri gibi)  
 ┃ ┣ 📜 errorTypes.js        # Hata türlerini içeren dosya  
 ┃ ┗ 📜 transactionTypes.js  # İşlem türleri için enum dosyası  
 ┣ 📂 helpers                # 📌 Yardımcı fonksiyonlar  
 ┃ ┗ 📜 request.js           # API isteklerini yöneten yardımcı işlevler  
 ┣ 📂 mongoose               # 📌 Mongoose veritabanı yönetimi  
 ┃ ┗ 📂 models               # 📌 MongoDB modelleri  
 ┃   ┣ 📜 transaction.js     # İşlem (Transaction) modeli  
 ┃   ┣ 📜 user.js            # Kullanıcı (User) modeli  
 ┃   ┗ 📜 index.js           # Tüm modellerin merkezi import dosyası  
 ┣ 📂 routes/V1              # 📌 API Rotaları (Version 1 - V1)  
 ┃ ┣ 📜 auth.js              # Kimlik doğrulama rotaları  
 ┃ ┣ 📜 index.js             # Ana router  
 ┃ ┗ 📜 transaction.js       # İşlem (Transaction) ile ilgili rotalar  
 ┣ 📂 statics                # 📌 Sabit veriler & hata mesajları  
 ┃ ┗ 📜 errorMessage.js      # Hata mesajlarını yöneten dosya  
 ┣ 📜 .env                   # 🌍 Çevresel değişkenler (API anahtarları, DB bağlantıları vb.)  
 ┣ 📜 .gitignore             # 📌 Git tarafından izlenmemesi gereken dosyalar  
 ┣ 📜 config.js              # 📌 Yapılandırma ve ayar dosyası  
 ┣ 📜 index.js               # 📌 Sunucunun giriş noktası  
 ┣ 📜 package.json           # 📦 Proje bağımlılıkları ve yapılandırmalar  
 ┗ 📜 package-lock.json      # 📦 Bağımlılıkların sabitlenmiş sürümleri  

```
📌 **Tüm API talepleri için örnek istekleri Postman koleksiyonu olarak ekleyebilirsin.**  

---

## 👨‍💻 **Katkıda Bulunma**
Katkıda bulunmak istiyorsan:  
1️⃣ **Projeyi fork et**  
2️⃣ **Yeni bir feature branch oluştur (`feature/yeniozellik`)**  
3️⃣ **Commit yap (`git commit -m 'Yeni özellik eklendi'`)**  
4️⃣ **Pull request gönder**  

---
