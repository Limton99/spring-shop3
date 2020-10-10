package kz.iitu.productservice.Repository;

import kz.iitu.productservice.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepos extends JpaRepository<Product, Long> {
}
