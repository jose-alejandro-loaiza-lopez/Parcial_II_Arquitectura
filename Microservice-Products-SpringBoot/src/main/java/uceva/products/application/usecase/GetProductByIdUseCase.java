package uceva.products.application.usecase;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import uceva.products.domain.entity.Product;
import uceva.products.domain.repository.ProductRepository;

/**
 * Caso de uso: obtener un producto por su identificador.
 */
public class GetProductByIdUseCase {

    private final ProductRepository productRepository;

    public GetProductByIdUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product execute(int id) {
        if (id < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "id must be a positive integer");
        }
        return productRepository.getById(id);
    }
}
