package kz.iitu.productservice.Controllers;

import kz.iitu.productservice.Models.Product;
import kz.iitu.productservice.ProductServiceApplication;
import kz.iitu.productservice.Repository.ProductRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final Logger log = LoggerFactory.getLogger(ProductController.class);


    @Autowired
    public ProductRepos productRepos;

    @GetMapping("/list")
    Collection<Product> getProducts() {
        return productRepos.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
    @GetMapping("/{id}")
    ResponseEntity<?> getProduct(@PathVariable Long id) {
        Optional<Product> product = productRepos.findById(id);
        return product.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/createProduct")
    ResponseEntity<Product> createProduct(@ModelAttribute @Valid @RequestBody Product product) throws URISyntaxException {
        log.info("Request to create product: {}", product);
        Product result = productRepos.save(product);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PostMapping("/update/{id}")
    Product update(@ModelAttribute @Valid @RequestBody Product product, @PathVariable Long id) throws URISyntaxException {
        Product productToUpdate = productRepos.getOne(id);
        productToUpdate.setName(product.getName());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setCount(product.getCount());

        productRepos.save(productToUpdate);

        return productToUpdate;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepos.deleteById(id);
    }

}
