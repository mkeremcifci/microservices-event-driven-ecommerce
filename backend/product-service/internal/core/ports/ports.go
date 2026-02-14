package ports 

import "github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/core/domain"

type ProductService interface {
	Get(id uint) (*domain.Product, error)
	Create(product *domain.Product) error
}

type ProductRepository interface {
		GetById(id uint) (*domain.Product, error)
		Save(product *domain.Product) error
}