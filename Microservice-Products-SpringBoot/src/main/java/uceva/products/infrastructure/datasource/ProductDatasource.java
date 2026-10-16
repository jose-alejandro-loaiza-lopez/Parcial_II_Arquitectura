package uceva.products.infrastructure.datasource;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import uceva.products.domain.entity.Product;

import java.util.List;

/**
 * Fuente de datos en memoria del microservicio de productos.
 *
 * <p>Expone un conjunto fijo de productos semilla para que todas las
 * consultas sean deterministas: listar, buscar por id y filtrar siempre
 * operan sobre los mismos datos.</p>
 */
public class ProductDatasource {

    /** Datos semilla del microservicio (16 productos, 4 por categoría). */
    private static final List<Product> SEED = List.of(
            new Product(1, "Leche entera 1L", "Lacteos", 4500f),
            new Product(2, "Yogur natural 900g", "Lacteos", 8200f),
            new Product(3, "Queso campesino 500g", "Lacteos", 12500f),
            new Product(4, "Mantequilla 250g", "Lacteos", 7800f),
            new Product(5, "Pechuga de pollo 1kg", "Carnes", 18500f),
            new Product(6, "Carne de res 1kg", "Carnes", 32000f),
            new Product(7, "Lomo de cerdo 1kg", "Carnes", 26500f),
            new Product(8, "Trucha fresca 1kg", "Carnes", 24000f),
            new Product(9, "Manzana roja 1kg", "Frutas", 6200f),
            new Product(10, "Banano criollo 1kg", "Frutas", 3800f),
            new Product(11, "Mango de azúcar 1kg", "Frutas", 5500f),
            new Product(12, "Naranja valencia 1kg", "Frutas", 4200f),
            new Product(13, "Papa criolla 1kg", "Verduras", 5800f),
            new Product(14, "Zanahoria 1kg", "Verduras", 3500f),
            new Product(15, "Tomate chonto 1kg", "Verduras", 4900f),
            new Product(16, "Cebolla cabezona 1kg", "Verduras", 4100f)
    );

    /** Lista hasta {@code countProducts} productos del conjunto de datos. */
    public List<Product> getAll(int countProducts) {
        return List.copyOf(SEED.subList(0, Math.min(countProducts, SEED.size())));
    }

    /** Retorna el producto con el id solicitado o un error 404. */
    public Product getById(int id) {
        return SEED.stream()
                .filter(product -> product.id != null && product.id == id)
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No existe un producto con el id " + id));
    }

    /** Lista los productos de la categoría solicitada. */
    public List<Product> getByCategory(String category) {
        return SEED.stream()
                .filter(product -> product.category.equals(category))
                .toList();
    }
}
