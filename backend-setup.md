# Setup Database untuk NusaKoko Backend

## Option 1: SQLite (Termudah untuk Development)

### 1. Update Backend Config
```python
# backend/config.py
import os

class Config:
    # Gunakan SQLite untuk development
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///nusakoko.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
```

### 2. Install Dependencies
```bash
cd backend
pip install flask flask-sqlalchemy flask-jwt-extended flask-cors python-dotenv
```

### 3. Create Database Tables
```python
# backend/create_tables.py
from app import app, db

with app.app_context():
    db.create_all()
    print("Database tables created!")
```

### 4. Run Backend
```bash
python create_tables.py
python app.py
```

## Option 2: PlanetScale (Gratis, Production-Ready)

### 1. Daftar PlanetScale
- Kunjungi https://planetscale.com
- Daftar dengan GitHub
- Buat database baru: "nusakoko"

### 2. Get Connection String
- Di dashboard PlanetScale
- Klik "Connect" 
- Pilih "General"
- Copy connection string

### 3. Update Environment
```bash
# backend/.env
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/nusakoko?ssl={"rejectUnauthorized":true}
SECRET_KEY=your-secret-key
```

### 4. Install MySQL Driver
```bash
pip install PyMySQL cryptography
```

### 5. Update Config
```python
# backend/config.py
import os
import pymysql
pymysql.install_as_MySQLdb()

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
```

## Option 3: MySQL Lokal

### 1. Install MySQL
```bash
# Windows: Download MySQL Installer
# macOS: brew install mysql
# Ubuntu: sudo apt install mysql-server
```

### 2. Create Database
```sql
CREATE DATABASE nusakoko_db;
CREATE USER 'nusakoko_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON nusakoko_db.* TO 'nusakoko_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update Config
```bash
# backend/.env
DATABASE_URL=mysql://nusakoko_user:password123@localhost/nusakoko_db
SECRET_KEY=your-secret-key
```

## Testing Connection

### Test Script
```python
# backend/test_db.py
from app import app, db

try:
    with app.app_context():
        db.create_all()
        print("✅ Database connection successful!")
        print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
```

```bash
python test_db.py
```

## Deployment

### Railway (Recommended)
1. Push code ke GitHub
2. Connect Railway ke GitHub repo
3. Set environment variables
4. Deploy otomatis

### Render
1. Connect GitHub repo
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `python app.py`
4. Set environment variables

## Environment Variables untuk Production
```
DATABASE_URL=your-production-database-url
SECRET_KEY=your-production-secret-key
JWT_SECRET_KEY=your-jwt-secret
FLASK_ENV=production
```