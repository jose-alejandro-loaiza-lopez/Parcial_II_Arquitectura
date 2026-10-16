package uceva.products.domain.entity;

import java.util.List;

/**
 * Categorías válidas de producto (regla de dominio).
 */
public final class ProductCategories {

    public static final List<String> VALUES =
            List.of("Lacteos", "Carnes", "Frutas", "Verduras");

    private ProductCategories() {
    }
}
