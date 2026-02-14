package repository

import (
	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/core/domain"
	"gorm.io/gorm"
)

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) *productRepository {
	return &productRepository{db: db}
}

func (r *productRepository) Save(product *domain.Product) error {
	return r.db.Save(product).Error
}

func (r *productRepository) GetById(id uint) (*domain.Product, error) {
	var product domain.Product
	err := r.db.First(&product, id).Error

	return &product, err
}
