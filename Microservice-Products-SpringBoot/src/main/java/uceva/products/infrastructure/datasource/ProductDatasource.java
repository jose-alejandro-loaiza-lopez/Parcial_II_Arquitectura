package uceva.products.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.products.domain.entity.Product;
import uceva.products.domain.entity.ProductCategories;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Fuente de datos simulada del microservicio de productos.
 */
public class ProductDatasource {

    private static final int FILTERED_COUNT = 5;

    private final Faker faker = new Faker();
    private final Random random = new Random();

    public List<Product> getAll(int countProducts) {
        List<Product> products = new ArrayList<>();
        for (int id = 1; id <= countProducts; id++) {
            products.add(generateProduct(id));
        }
        return products;
    }

    public Product getById(int id) {
        return generateProduct(id);
    }

    public List<Product> getByCategory(String category) {
        List<Product> products = new ArrayList<>();
        for (int id = 1; id <= FILTERED_COUNT; id++) {
            Product product = generateProduct(id);
            product.category = category;
            products.add(product);
        }
        return products;
    }

    private Product generateProduct(int id) {
        return new Product(
                id,
                faker.commerce().productName(),
                ProductCategories.VALUES.get(random.nextInt(ProductCategories.VALUES.size())),
                (float) faker.number().numberBetween(1000, 100000));
    }
}
