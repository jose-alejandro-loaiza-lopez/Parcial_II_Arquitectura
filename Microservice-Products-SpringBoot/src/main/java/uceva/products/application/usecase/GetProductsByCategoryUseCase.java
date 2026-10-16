package uceva.products.application.usecase;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import uceva.products.domain.entity.Product;
import uceva.products.domain.entity.ProductCategories;
import uceva.products.domain.repository.ProductRepository;

import java.util.List;

/**
 * Caso de uso: listar los productos de una categoría.
 */
public class GetProductsByCategoryUseCase {

    private final ProductRepository productRepository;

    public GetProductsByCategoryUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> execute(String category) {
        if (!ProductCategories.VALUES.contains(category)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "category must be one of: " + String.join(", ", ProductCategories.VALUES));
        }
        return productRepository.getByCategory(category);
    }
}
