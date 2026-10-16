package uceva.products.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Representa un producto del sistema")
public class Product {

    @Schema(description = "Identificador único del producto", example = "1")
    public Integer id;

    @Schema(description = "Nombre o descripción del producto", example = "Leche entera")
    public String name;

    @Schema(description = "Categoría del producto", example = "Lacteos",
            allowableValues = {"Lacteos", "Carnes", "Frutas", "Verduras"})
    public String category;

    @Schema(description = "Precio del producto en pesos", example = "4500")
    public Float price;

    public Product(Integer id, String name, String category, Float price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }
}
