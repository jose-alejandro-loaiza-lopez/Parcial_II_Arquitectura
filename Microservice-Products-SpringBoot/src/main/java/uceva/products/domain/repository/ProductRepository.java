package uceva.products.domain.repository;

import uceva.products.domain.entity.Product;

import java.util.List;

public abstract class ProductRepository {

    public abstract List<Product> getAll(int countProducts);

    public abstract Product getById(int id);

    public abstract List<Product> getByCategory(String category);
}
