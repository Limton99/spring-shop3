package kz.iitu.cartservice.Controllers;

import kz.iitu.cartservice.Models.Cart;
import kz.iitu.cartservice.Models.Product;
import kz.iitu.cartservice.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public Cart addToCart(@RequestParam("userId") Long userId, @RequestParam("productId") Long productId) {
        User user = restTemplate.getForObject("http://user-service/api/v1/users/" + userId, User.class);
        Product product = restTemplate.getForObject("http://product-service/api/v1/products/" + productId, Product.class);

        Cart cart = new Cart();

        cart.setId(1L);
        cart.setUser(user);
        cart.setProduct(product);

        return cart;

    }
}
