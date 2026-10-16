package uceva.products.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.products.application.usecase.GetAllProductsUseCase;
import uceva.products.application.usecase.GetProductByIdUseCase;
import uceva.products.application.usecase.GetProductsByCategoryUseCase;
import uceva.products.domain.entity.Product;

import java.util.List;

@RestController
@RequestMapping("/products")
@Tag(name = "Products", description = "Operaciones relacionadas con los productos")
public class ProductController {

    private final GetAllProductsUseCase getAllProductsUseCase;
    private final GetProductByIdUseCase getProductByIdUseCase;
    private final GetProductsByCategoryUseCase getProductsByCategoryUseCase;

    public ProductController(
            GetAllProductsUseCase getAllProductsUseCase,
            GetProductByIdUseCase getProductByIdUseCase,
            GetProductsByCategoryUseCase getProductsByCategoryUseCase) {
        this.getAllProductsUseCase = getAllProductsUseCase;
        this.getProductByIdUseCase = getProductByIdUseCase;
        this.getProductsByCategoryUseCase = getProductsByCategoryUseCase;
    }

    @Operation(
            summary = "Obtener listado de productos",
            description = "Retorna hasta los primeros `countProducts` productos del conjunto de datos (1 a 100).")
    @ApiResponse(responseCode = "200", description = "Lista de productos del conjunto de datos")
    @ApiResponse(responseCode = "400", description = "Parámetro inválido")
    @GetMapping("/{countProducts}")
    public List<Product> getAll(
            @Parameter(description = "Cantidad de productos a listar (1 a 100)", example = "100")
            @PathVariable int countProducts) {
        return getAllProductsUseCase.execute(countProducts);
    }

    @Operation(
            summary = "Obtener un producto por id",
            description = "Retorna el producto del conjunto de datos con el identificador solicitado.")
    @ApiResponse(responseCode = "200", description = "Producto encontrado")
    @ApiResponse(responseCode = "400", description = "Parámetro inválido")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    @GetMapping("/id/{id}")
    public Product getById(
            @Parameter(description = "Identificador único del producto", example = "1")
            @PathVariable int id) {
        return getProductByIdUseCase.execute(id);
    }

    @Operation(
            summary = "Obtener productos por categoría",
            description = "Retorna los productos del conjunto de datos que pertenecen a la categoría solicitada.")
    @ApiResponse(responseCode = "200", description = "Lista de productos de la categoría")
    @ApiResponse(responseCode = "400", description = "Parámetro inválido")
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(
            @Parameter(description = "Categoría por la cual filtrar", example = "Lacteos")
            @PathVariable String category) {
        return getProductsByCategoryUseCase.execute(category);
    }
}
