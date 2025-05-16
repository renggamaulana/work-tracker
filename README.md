# 📦 Work Tracker Frontend – Next.js Application

**Work Tracker Frontend** adalah aplikasi web berbasis Next.js yang berfungsi sebagai antarmuka pengguna untuk mengelola pencatatan pekerjaan pegawai dan perhitungan remunerasi yang disediakan oleh backend Laravel.

---

## 🔧 Teknologi

- **Framework**: Next.js 13+ (React)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: Next.js Router (App Router atau Pages Router)
- **State Management**: React useState, useEffect (simple state)

---

## 🧩 Arsitektur Solusi

### 📌 Alur Data

```text
[User Interface (Next.js)]
          ↓ (Axios HTTP Requests)
[Laravel REST API Backend]
          ↓
[Database MySQL (Laravel)]
Pengguna memasukkan data pekerjaan dan kontribusi pegawai melalui form.

Frontend mengirim data via Axios ke endpoint Laravel.

Backend melakukan validasi, perhitungan remunerasi, dan penyimpanan.

Data hasil (termasuk daftar pekerjaan & contributors) dikirim balik ke frontend.

Frontend menampilkan data secara dinamis dan responsif.

🛠️ Setup & Deploy
1. Clone Repository
git clone https://github.com/yourusername/taskpay-frontend.git
cd taskpay-frontend

2. Install Dependencies
npm install
# atau
yarn install

3. Konfigurasi Environment
Buat file .env atau .env.local di root proyek dan isi:


NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
Sesuaikan URL jika backend berjalan di alamat lain.

4. Jalankan Development Server
npm run dev
# atau
yarn dev
Akses aplikasi di:
📍 http://localhost:3000

🔄 Fitur Utama
Menampilkan daftar pekerjaan dengan remunerasi secara realtime.

Form untuk tambah dan edit pekerjaan, termasuk multiple contributors.

Sort dan filter sederhana di tabel data.

Validasi input client-side sebelum submit.

Navigasi yang responsif dan mudah digunakan.

Contoh endpoint utama:

GET /work-logs

POST /work-logs

PUT /work-logs/{id}

DELETE /work-logs/{id}

⚠️ Tantangan & Solusi
Pengelolaan form dengan banyak kontributor
Solusi: Menggunakan React state dinamis untuk menambah/hapus input kontributor.

Handling error dari API
Solusi: Menampilkan pesan error dari backend menggunakan SweetAlert2 atau toast notification.

Responsivitas tabel data yang banyak kolom
Solusi: Membungkus tabel dalam container dengan overflow-x-auto untuk scroll horizontal.

Sinkronisasi data antar halaman (list, create, edit)
Solusi: Fetch ulang data setelah operasi sukses, atau menggunakan state management ringan.