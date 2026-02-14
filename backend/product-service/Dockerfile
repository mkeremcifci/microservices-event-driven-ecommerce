# --- Stage 1: Builder (Derleme Aşaması) ---
# Resmi Go imajını kullanıyoruz (Alpine versiyonu daha hafiftir)
FROM golang:alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Önce dependency dosyalarını kopyala
# (Bunu ayrı yapıyoruz ki kod değişse bile kütüphaneleri tekrar indirmesin -> Cache mekanizması)
COPY go.mod go.sum ./

# Kütüphaneleri indir
RUN go mod download

# Şimdi kaynak kodun geri kalanını kopyala
COPY . .

# Uygulamayı derle
# CGO_ENABLED=0 -> C kütüphanelerine bağımlılığı kaldırır (Statik binary)
# GOOS=linux -> Linux için derle
# -o main -> Çıktı dosyasının adı 'main' olsun
RUN CGO_ENABLED=0 GOOS=linux go build -o main cmd/api/main.go

# --- Stage 2: Runner (Çalıştırma Aşaması) ---
# Çok hafif bir Linux dağıtımı olan Alpine'i kullanıyoruz
FROM alpine:latest

# SSL sertifikaları için gerekli (HTTPS istekleri için)
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# İlk aşamada (builder) oluşturduğumuz 'main' dosyasını buraya kopyala
COPY --from=builder /app/main .

# Portu dışarıya bildir (Bilgilendirme amaçlı)
EXPOSE 8080

# Uygulamayı başlat
CMD ["./main"]