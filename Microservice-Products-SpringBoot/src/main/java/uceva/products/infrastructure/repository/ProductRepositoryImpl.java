package uceva.products.infrastructure.repository;

import uceva.products.domain.entity.Product;
import uceva.products.domain.repository.ProductRepository;
import uceva.products.infrastructure.datasource.ProductDatasource;

import java.util.List;

public class ProductRepositoryImpl extends ProductRepository {

    private final ProductDatasource productDatasource;

    public ProductRepositoryImpl(ProductDatasource productDatasource) {
        this.productDatasource = productDatasource;
    }

    @Override
    public List<Product> getAll(int countProducts) {
        return productDatasource.getAll(countProducts);
    }

    @Override
    public Product getById(int id) {
        return productDatasource.getById(id);
    }

    @Override
    public List<Product> getByCategory(String category) {
        return productDatasource.getByCategory(category);
    }
}
