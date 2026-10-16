package uceva.products.application.usecase;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import uceva.products.domain.entity.Product;
import uceva.products.domain.repository.ProductRepository;

import java.util.List;

/**
 * Caso de uso: listar todos los productos.
 */
public class GetAllProductsUseCase {

    private final ProductRepository productRepository;

    public GetAllProductsUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> execute(int countProducts) {
        if (countProducts < 1 || countProducts > 100) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "countProducts must be an integer between 1 and 100");
        }
        return productRepository.getAll(countProducts);
    }
}
