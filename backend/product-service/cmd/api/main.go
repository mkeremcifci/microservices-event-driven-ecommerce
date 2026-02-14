package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/adapter/handler"
	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/adapter/repository"
	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/core/domain"
	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=localhost user=admin password=password123 dbname=ecom_db port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	db.AutoMigrate(&domain.Product{})

	productRepo := repository.NewProductRepository(db)
	productSvc := service.NewProductService(productRepo)
	productHandler := handler.NewProductHandler(productSvc)

	r := gin.Default()

	api := r.Group("/api/")
	{
		api.POST("/products", productHandler.CreateProduct)
		api.GET("/products/:id", productHandler.GetProduct)
	}

	log.Println("Starting server on :8080")
	r.Run(":8080")
}
