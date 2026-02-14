package service

import (
	"errors"

	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/core/domain"
	"github.com/mkeremcifci/microservices-event-driven-ecommerce/product-service/internal/core/ports"
)

type productService struct {
	repo ports.ProductRepository
}

func NewProductService(repo ports.ProductRepository) ports.ProductService {
	return &productService{repo: repo}
}

func (s *productService) Create(product *domain.Product) error {
	if product.Price < 0 {
		return errors.New("price cannot be negative")
	}
	return s.repo.Save(product)
}

func (s *productService) Get(id uint) (*domain.Product, error) {
	return s.repo.GetById(id)
}
